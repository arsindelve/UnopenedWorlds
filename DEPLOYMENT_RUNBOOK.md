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
`404.html`, `favicon.svg`, and the `_next/`, `archive/`, `collection/`, and
`kept-boxes/` directories.

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

For scale, a deploy of the whole site is about 100 objects and 36 MiB, and
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

Check the bytes the CDN is actually serving, not the ones on disk. Pulling an
image back down catches a stale cache and confirms the metadata rules held:

```bash
curl -s -o /tmp/live.jpg https://unopenedworlds.com/collection/seastalker-front.jpg && python3 -c "from PIL import Image; ex=Image.open('/tmp/live.jpg').getexif(); print('exif tags:', len(ex), '| gps tags:', len(ex.get_ifd(0x8825)))"
```

Both counts must be zero. Published photographs carry no location data.

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
