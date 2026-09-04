# Collection Photography Runbook

This is the repeatable process for replacing an archival stand-in on the
collector's wall with photographs of Michael's actual sealed copy. Seastalker is
the reference implementation.

## Current scope

For now, each game needs two source photographs:

1. Front
2. Back

Side, top, and bottom photography is a later phase. Do not expand the viewer for
those angles until that design has been reviewed using Seastalker.

## What Michael provides

- The game title.
- The original front and back photographs, usually from `Downloads`.
- HEIC or high-quality JPEG is acceptable.

Identify front and back from the visible packaging, not from upload order or
filename numbering. Never move, rename, or overwrite Michael's originals.

## Files added to the site

Use the game's existing slug from `app/games.ts`:

```text
public/collection/<slug>-front.jpg
public/collection/<slug>-back.jpg
public/collection/<slug>-thumbnail.jpg
```

The front and back files are the high-resolution exhibit photographs. The
thumbnail is a smaller derivative used only on the 4 x 8 wall.

## Documentary-image rules

These photographs document physical artifacts. Fidelity is more important than
cosmetic perfection.

- Preserve the complete box, including every corner and shrink-wrap edge.
- Preserve store stickers, fading, dents, tears, glare, seams, and other evidence
  of the individual copy.
- Never repair, rewrite, sharpen, or regenerate packaging artwork or typography.
- Reject any image-editing result that changes text, logos, colors, labels, or
  physical details.
- Cropping, orientation correction, and proportional resizing are allowed.
- Never stretch the image to force an aspect ratio.

## Full-size front and back treatment

1. Convert HEIC sources to high-quality JPEG while preserving orientation and
   useful resolution.
2. Inspect both images before integrating them.
3. Frame the box tightly but retain a small, intentional white margin on every
   visible edge.
4. Remove unrelated surroundings from the visible crop: paper towels, bottles,
   hands, knees, floor, and excessive tabletop.
5. Center the box optically within the remaining white field.
6. Tune front and back independently when their source framing differs. A shared
   crop must not force one side against an edge.
7. Check the complete box at desktop and narrow viewport widths.

Seastalker's back uses a slightly looser vertical crop than its front so the top
white margin remains visible.

## Wall thumbnail treatment

The wall already supplies a wooden frame and dark mat. The thumbnail must
therefore be cropped directly to the physical box edges.

- Use the front photograph.
- Include no tabletop or secondary white border.
- Keep all four box edges visible.
- Preserve the box's natural proportions.
- Resize the long edge to roughly 960 pixels and save as a high-quality JPEG.
- Confirm that the thumbnail fills the inner mat without looking enlarged,
  clipped, or off-center.

## Site integration

Add one entry to `collectionPhotography` in `app/page.tsx`. Supply:

- edition label;
- front, back, and thumbnail paths;
- attributed archive, feelies, map, and manual links; and
- the game-specific exhibit note.

That single entry activates the collection-photo badge, wall thumbnail,
front/back controls, photographic exhibit, and archive drawer. Do not copy the
Seastalker component or add another game-specific dialog branch.

Archival scans and manuals remain on their original preservation sites unless
their licenses explicitly permit redistribution. Link and attribute them; do not
mirror them into this repository or the site's S3 bucket merely because they are
downloadable.

## Verification checklist

- The correct game and edition are identified.
- Front and back are not reversed.
- No box edge is clipped.
- The box is centered in the full-size white field.
- No paper towel, body part, bottle, or irrelevant background remains visible.
- The wall thumbnail contains zero surrounding white tabletop.
- Packaging text and artwork match the source photograph.
- Front/back controls work with keyboard and pointer input.
- The exhibit remains usable on desktop and mobile.
- The production build succeeds.
- Only the intended game photography and integration changes are included.

## Publication

After visual verification and a successful build:

1. Commit the new photographs, thumbnail, configuration entry, and any narrowly
   required crop styles.
2. Push the commit to `main` on the existing GitHub repository.
3. Deploy the static export to the existing S3 website bucket only when Michael
   explicitly requests deployment.
4. Invalidate the CloudFront paths needed to expose the new build.
5. Verify the public site's collection wall and the new game's front/back viewer.

Never treat a GitHub push as an instruction to deploy AWS. Deployment requires
an explicit request.
