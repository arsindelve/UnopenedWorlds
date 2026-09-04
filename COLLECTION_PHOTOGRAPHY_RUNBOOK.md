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

## Preparing the source files

Work on copies in a scratch directory.

Normalise EXIF orientation before judging anything. iPhone HEIC files are stored
landscape with an orientation tag, and tools honour that tag inconsistently —
`sips` bakes it in differently than Pillow reads it, which can make an upright
box look like it needs a 90-degree rotation when it does not. Normalise first,
then look:

```python
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open(src))   # 4032x3024 -> 3024x4032
```

Strip metadata from every file that ships. The originals carry GPS coordinates
of the room they were photographed in, and a published JPEG must not. Pillow
writes no EXIF unless asked, so saving through it is enough — but confirm it:

```python
len(Image.open(out).getexif())    # must be 0
```

Strip metadata only after the rotation is in the pixels. An orientation tag is
an instruction to the browser, so removing it from a file whose pixels are
still sideways silently turns that image on its side on the live site. Files
prepared through `exif_transpose` above are already upright and safe.

ImageMagick is not installed on this machine. Use Pillow, with `sips` only for
the HEIC-to-JPEG conversion, and `jpegtran -copy none` when metadata has to
come off a finished file without re-encoding it.

## Finding the box edges

Every crop depends on knowing exactly where the physical box ends, and
brightness thresholding does not find it. The back of a grey box is pale cream
against a pale tabletop, and the drop shadow beneath the box reads as
"not tabletop", which drags the detected bottom edge down to the frame edge.

What works is the thin dark line where box meets table. Take a median luminance
profile across a band of rows or columns and find the narrow dip:

```python
row = np.median(gray[1800:2200, :], axis=0)   # table ~205 ... 184 ... 82
```

Sanity-check before cropping: an Infocom grey box is about 0.82 wide for every
1.00 tall. A detected rectangle at 0.60 or 1.00 is wrong, and cropping to it
will slice off part of the box or leave a band of tabletop inside the thumbnail.

Measure tilt from the top edge at several x positions, discarding outliers where
cover artwork imitates an edge. Straighten only above roughly half a degree;
below that, resampling the whole image costs more detail than it recovers.

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

The exhibit frame is `aspect-ratio: 5 / 6`. Crop to exactly 5:6 around the box
and resize to 2500 x 3000. Because the crop already matches the frame, nothing
is stretched and the browser crops nothing away.

1. Convert HEIC sources to high-quality JPEG, then normalise orientation.
2. Inspect both images before integrating them.
3. Frame the box tightly but retain a small, intentional white margin on every
   visible edge. Build the crop outward from the box centre with about 70px of
   tabletop above and below at full resolution, and let the horizontal margin
   fall out of the 5:6 ratio. That lands near 2.5% of the box width per side,
   which matches Moonmist.
4. Remove unrelated surroundings from the visible crop: paper towels, bottles,
   hands, knees, floor, and excessive tabletop.
5. Center the box optically within the remaining white field.
6. Tune front and back independently when their source framing differs. A shared
   crop must not force one side against an edge.
7. Save at quality 85 with 4:4:4 chroma. Subsampling is not optional: the back
   cover is dense small type and 4:2:0 smears it. Expect roughly 1.7 MB. These
   files load only when someone opens the exhibit, so that is not page weight.
8. Check the complete box at desktop and narrow viewport widths.

Seastalker's back uses a slightly looser vertical crop than its front so the top
white margin remains visible.

## Wall thumbnail treatment

The wall already supplies a wooden frame and dark mat. The thumbnail must
therefore be cropped directly to the physical box edges.

- Use the front photograph.
- Include no tabletop or secondary white border.
- Keep all four box edges visible.
- Preserve the box's natural proportions.
- Resize the long edge to roughly 960 pixels.
- Save at quality 82 with 4:4:4 chroma; expect roughly 250 KB. This file is on
  the wall and is paid by everyone who scrolls to it, so keep it honest.
- Confirm that the thumbnail fills the inner mat without looking enlarged,
  clipped, or off-center.

## Site integration

Add one entry to `collectionPhotography` in `app/page.tsx`. Supply:

- edition label;
- front, back, and thumbnail paths;
- attributed archive, feelies, and manual links, plus `map` when the game
  actually shipped one; and
- the game-specific exhibit note.

Not every grey box had a map. Hollywood Hijinx shipped TinselWorld, Aunt
Hildegarde's will, an autographed photo, and a swizzle stick, and no map at all,
so `map` is optional and the Map link renders only when present. Never fill the
slot with an unrelated document to keep the row of links even.

Then add the game's class to the crop rule in `app/globals.css`:

```css
.collection-photo--moonmist, .collection-photo--lurking-horror,
.collection-photo--hollywood-hijinx { object-position: center; transform: none; }
```

`.collection-photo` defaults to `transform: scale(1.2)`, which zooms past the
box and clips the corners these photographs exist to preserve. Every image
cropped to 5:6 belongs in that rule, and it is the only styling a new game
should need.

Verify every link with a real request before committing it. Guessed URLs are
usually wrong: mocagh's slug for Hollywood Hijinx is `hhijinx`, not
`hollywoodhijinx`, and the real filenames are only discoverable from
`https://www.mocagh.org/loadpage.php?getgame=<slug>`.

```bash
curl -s -o /dev/null -w '%{http_code}' -L "<url>"
```

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
- Orientation came from the EXIF tag, not from a guess about which way is up.
- The detected box ratio is close to 0.82.
- No box edge is clipped, in the file or in the browser.
- The exhibit images are exactly 2500 x 3000, and the game's class is in the
  `transform: none` crop rule.
- The box is centered in the full-size white field.
- No paper towel, body part, bottle, or irrelevant background remains visible.
- The wall thumbnail contains zero surrounding white tabletop.
- Packaging text and artwork match the source photograph.
- Every shipped file reports zero EXIF tags, and therefore no GPS.
- Every archive link returns 200.
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
