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

Then invalidate CloudFront. HTML and the RSC payload must not be served stale,
and `_next/` assets are content-hashed so they do not need it, but a full
invalidation is cheap at this size and avoids reasoning about which paths
changed:

```bash
aws cloudfront create-invalidation \
  --distribution-id E35YERO8DMUUWV --paths '/*' --profile delve
```

Invalidations take a few minutes. Check one with:

```bash
aws cloudfront get-invalidation \
  --distribution-id E35YERO8DMUUWV --id <InvalidationId> --profile delve \
  --query 'Invalidation.Status'
```

## Verify the live site

Not the local dev server — the real one, after the invalidation completes.

- <https://unopenedworlds.com> loads and the headline is legible immediately.
- The collection wall renders all 32 frames with no gaps.
- Every photographed game shows its own photograph rather than an archival
  stand-in, and each one is upright.
- Open one photographed exhibit: front and back both load, the toggle works,
  and no box edge is clipped.
- The archive drawer's links open.

## Permissions

Deploy commands mutate a public website, so an agent running them may be
blocked by a permission prompt or an auto-approval classifier. That is working
as intended. Either approve the specific commands, or hand the four commands
above to Michael to run. Do not route around a denial by reaching for a
different tool to perform the same write.

## Rollback

The bucket is not versioned, so there is no one-command undo. To roll back,
check out the last good commit, rebuild, and deploy that:

```bash
git checkout <last-good-sha> && rm -rf dist && pnpm build
# then the dry run, sync, and invalidation above
```

Because rollback means a full rebuild, deploy from a commit that is already
pushed to `main`. Deploying uncommitted work leaves nothing to go back to.
