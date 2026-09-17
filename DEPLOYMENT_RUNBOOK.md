# Deployment Runbook

This is the repeatable process for publishing Unopened Worlds to the live site
at [unopenedworlds.com](https://unopenedworlds.com).

## Deployment is never implied

Deploying requires an explicit request from Michael. A push to `main` is not
one, a green build is not one, and finishing a game's photography is not one.
If nobody said "deploy", the work stops at the push.

## The target

None of this is recorded in the code, so it is recorded here.

| | |
|---|---|
| AWS account | `576431164672` |
| AWS CLI profile | `delve` — **not** `default`, which is an unrelated account |
| S3 bucket | `unopenedworlds-site-576431164672` |
| CloudFront distribution | `E35YERO8DMUUWV` |
| CloudFront function | `unopenedworlds-html-rewrite` (viewer-request) |
| Aliases | `unopenedworlds.com`, `www.unopenedworlds.com` |
| Region | `us-east-1` |

The `default` profile on this machine points at a completely separate
production account. Every command below passes `--profile delve` explicitly.
Never let a deploy command inherit the default profile.

Confirm you are in the right account before touching anything:

```bash
aws sts get-caller-identity --profile delve
```

It must return account `576431164672`.

## Build

Node 22 or later is required, and the machine's default `node` may be older
than that. Check `node -v` first and select a 22+ install if it is not.

```bash
rm -rf dist && pnpm build
```

The static export lands in `dist/client`. It should contain `index.html`,
`404.html`, `favicon.svg`, `og-image.jpg`, `robots.txt`, `sitemap.xml`, one
`<slug>.html` and `<slug>.rsc` per game, and the `_next/`, `archive/`,
`collection/`, and `kept-boxes/` directories. A healthy build prerenders 34
routes: the wall, 404, and the thirty-two games.

`pnpm build` is two steps — the export, then `scripts/generate-sitemap.mjs`,
which reads the prerendered HTML and writes `sitemap.xml` from it. It prints
`Sitemap written: 33 canonical URLs.` (the wall and the thirty-two games; 404
is excluded). A different count means the export is wrong, so read it as a
second check on the route count above rather than skipping past it.

## The URL rewrite and the canonical redirect

Every game prerenders to a flat file, `planetfall.html`, but its URL is
`/planetfall`. The S3 REST origin has no index-document or extension fallback,
and the distribution answers a miss with `/index.html` and a 200, so without a
rewrite every game URL silently serves the wall and gets indexed that way.

`unopenedworlds-html-rewrite` (source in `infra/cloudfront-rewrite.js`) runs on
viewer-request. It appends `.html` to extensionless paths, leaving the root and
anything with an extension alone, and before that it 301s anything that is not
already the canonical spelling of the URL:

| Requested | Redirects to |
|---|---|
| `www.unopenedworlds.com/anything` | `unopenedworlds.com/anything` |
| `/planetfall.html` | `/planetfall` |
| `/planetfall/` | `/planetfall` |
| `/index.html` | `/` |

Both hosts are aliases on the one distribution, and the rewrite means three
spellings of every game URL answer 200, so before this the same page was
reachable at six addresses and Search Console reported it: game pages as
"Alternative page with proper canonical tag", the wall as "Duplicate without
user-selected canonical". The canonical tags in the HTML say the same thing,
but a canonical tag is a hint and a 301 is not.

The redirect is why the source changed, so this time the function does need
attention. Do it in the same session as the deploy that carries the new
`sitemap.xml`: the sitemap names the canonical URLs and the function is what
makes every other spelling arrive there.

Three steps, in this order. Uploading the source is its own step — publishing
alone republishes whatever code is already there, so a `publish-function` on
its own looks like it worked and changes nothing. Re-read the ETag before each
call; every one of them changes it. The config is read back from the live
function rather than retyped, so the runtime and comment cannot drift:

```bash
aws cloudfront update-function --name unopenedworlds-html-rewrite \
  --if-match "$(aws cloudfront describe-function --name unopenedworlds-html-rewrite --profile delve --query ETag --output text)" \
  --function-code fileb://infra/cloudfront-rewrite.js \
  --function-config "$(aws cloudfront describe-function --name unopenedworlds-html-rewrite --profile delve --query 'FunctionSummary.FunctionConfig' --output json)" \
  --profile delve
```

Then test the DEVELOPMENT stage, which is what `update-function` just wrote.
The event object must be complete: a payload missing `version`, `context` or
`viewer` fails with `ServiceUnavailable` and an internal-error message, which
reads exactly like an AWS outage and is not one. Run it twice, once for a game
URL on the apex and once on `www`, because the two paths through the function
are the interesting ones:

```bash
printf '{"version":"1.0","context":{"eventType":"viewer-request"},"viewer":{"ip":"1.2.3.4"},"request":{"method":"GET","uri":"/planetfall","querystring":{},"headers":{"host":{"value":"unopenedworlds.com"}},"cookies":{}}}' > /tmp/ev.json && aws cloudfront test-function --name unopenedworlds-html-rewrite --if-match "$(aws cloudfront describe-function --name unopenedworlds-html-rewrite --profile delve --query ETag --output text)" --stage DEVELOPMENT --event-object fileb:///tmp/ev.json --profile delve
```

The apex case must come back with `uri` rewritten to `/planetfall.html` and no
response object. Swapping the host to `www.unopenedworlds.com` must come back
with a `301` and a `location` of `https://unopenedworlds.com/planetfall`. Only
then publish:

```bash
aws cloudfront publish-function --name unopenedworlds-html-rewrite --if-match "$(aws cloudfront describe-function --name unopenedworlds-html-rewrite --profile delve --query ETag --output text)" --profile delve
```

## Dry run first, every time

The sync uses `--delete`, so it removes anything in the bucket that is not in
the build. Look at what that would do before doing it:

```bash
aws s3 sync dist/client s3://unopenedworlds-site-576431164672/ \
  --profile delve --delete --dryrun
```

Read the deletes. They should only ever be stale content-hashed build
artifacts — old `_next/static/chunks/*.js`, old `_next/static/css/*.css`, old
font hashes, old build manifests. A new build legitimately orphans a dozen or
so of these.

**Stop and investigate if a delete touches `collection/`, `archive/`,
`kept-boxes/`, or `favicon.svg`.** Those are content, not build output, and
nothing in a normal build should remove them. A delete there means the build
is incomplete, and syncing it would take photographs off the live site.

## Deploy

```bash
aws s3 sync dist/client s3://unopenedworlds-site-576431164672/ \
  --profile delve --delete
```

For scale, a deploy of the whole site is about 190 objects and 41 MiB, and
finishes in well under a minute. If the object count is far off that, the
build is wrong—stop rather than letting `--delete` act on it.

Then invalidate CloudFront. HTML and the RSC payload must not be served stale,
and `_next/` assets are content-hashed so they do not need it, but a full
invalidation is cheap at this size and avoids reasoning about which paths
changed. It usually completes in well under a minute. This creates one and
waits on it — run it instead of a bare `create-invalidation`, not as well as,
or you will fire two:

```bash
ID=$(aws cloudfront create-invalidation --distribution-id E35YERO8DMUUWV --paths '/*' --profile delve --query 'Invalidation.Id' --output text); until [ "$(aws cloudfront get-invalidation --distribution-id E35YERO8DMUUWV --id "$ID" --profile delve --query 'Invalidation.Status' --output text)" = Completed ]; do sleep 20; done; echo "$ID Completed"
```

Do not verify the site until this reports `Completed`. Before that you are
reading the old build and will conclude the deploy failed when it did not.

## Verify the live site

Not the local dev server — the real one, after the invalidation completes.

- <https://unopenedworlds.com> loads and the headline is legible immediately.
- The collection wall renders all 32 frames with no gaps.
- Every photographed game shows its own photograph rather than an archival
  stand-in, and each one is upright.
- Open one photographed exhibit: front and back both load, the toggle works,
  and no box edge is clipped.
- The archive drawer's links open.
- Every game URL serves that game rather than the wall. The rewrite failing
  looks like success from a browser, because the wall renders and returns 200,
  so check the titles rather than the status codes:

```bash
for slug in planetfall zork-i trinity amfv; do curl -s "https://unopenedworlds.com/$slug" | grep -oE '<title>[^<]*' | sed 's/<title>/  /'; done
```

- The canonical URLs are the only ones that answer 200. Every other spelling
  must 301 to the apex, extensionless form:

```bash
for u in https://www.unopenedworlds.com/planetfall https://unopenedworlds.com/planetfall.html https://unopenedworlds.com/planetfall/ https://unopenedworlds.com/index.html; do echo "$(curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}' "$u")  ($u)"; done
```

  All four must print `301` and a `https://unopenedworlds.com/...` target, and
  `https://unopenedworlds.com/planetfall` itself must still print `200`. A
  `200` on any of the four means the function did not publish.

- `robots.txt` and `sitemap.xml` are real files rather than the wall. Both used
  to fall through the 404 rule and answer with the homepage and a 200, which is
  what the check below catches:

```bash
curl -s https://unopenedworlds.com/robots.txt | head -1 && curl -s https://unopenedworlds.com/sitemap.xml | grep -c '<loc>'
```

  The first must be a robots.txt line, not `<!DOCTYPE html>`, and the second
  must print `33`.

Check the bytes the CDN is actually serving, not the ones on disk. Pulling an
image back down catches a stale cache and confirms the metadata rules held:

```bash
curl -s -o /tmp/live.jpg https://unopenedworlds.com/collection/seastalker-front.jpg && python3 -c "from PIL import Image; ex=Image.open('/tmp/live.jpg').getexif(); print('exif tags:', len(ex), '| gps tags:', len(ex.get_ifd(0x8825)))"
```

Both counts must be zero. Published photographs carry no location data.

## The 404 rule is still a soft 404

One piece of this is distribution configuration rather than code, so it is not
carried by a deploy and is written down here instead of being quietly assumed.

The distribution answers an origin miss with `/index.html` and a **200**. That
is what makes the rewrite necessary, and it also means every nonexistent URL —
a typo, a stale inbound link, a path some crawler invented — serves the
collection wall and reports success. Google sees an unbounded set of distinct
URLs with identical content, which is the third reason it named: "Duplicate
without user-selected canonical".

The wall now carries `<link rel="canonical" href="https://unopenedworlds.com">`,
so those URLs at least consolidate onto the homepage instead of competing with
it. The real fix is for the miss to answer `/404.html` with a 404, which needs
the distribution's custom error response changed (403 and 404 both, since an S3
REST origin returns 403 for a missing object when the bucket does not grant
`s3:ListBucket`). That is a change to a live distribution, so it is Michael's
to make or approve, not something to fold into a routine deploy.

## Permissions

Deploy commands mutate a public website, so an agent running them may be
blocked by a permission prompt or an auto-approval classifier. That is working
as intended.

This blocked once already, and the failure is easy to misread: credentials,
profile, and permissions were all correct, and the dry run had already
succeeded. Only the write was refused. So do not respond by switching profiles,
re-checking `sts get-caller-identity`, or reaching for a different AWS client to
perform the same write—none of that is the problem, and the last one is
circumventing the denial rather than resolving it. Say plainly what was blocked,
and let Michael either approve it or run the commands himself.

## Rollback

The bucket is not versioned, so there is no one-command undo. To roll back,
check out the last good commit, rebuild, and deploy that:

```bash
git checkout <last-good-sha> && rm -rf dist && pnpm build
# then the dry run, sync, and invalidation above
```

Because rollback means a full rebuild, deploy from a commit that is already
pushed to `main`. Deploying uncommitted work leaves nothing to go back to.
