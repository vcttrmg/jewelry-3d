# Aurelia Jewelry 3D

A polished front-end concept for a high-jewelry visualization studio dedicated to **natural 24K / 999.9 gold and natural, earth-mined diamonds only**.

## Material policy

The creative brief controls support natural 24K gold forms and finishes including high polish, satin, brushed, hammered, matte, granulated, wirework, textured, and leaf-like surfaces. Diamond varieties include colorless, champagne, cognac, fancy yellow, fancy pink, fancy blue, fancy green, and black natural diamonds, with multiple cuts.

Lab-grown, synthetic, simulated, plated, and alloyed 14K/18K/22K, white-gold, and rose-gold references are blocked in the brief validation. The interface is a design specification tool; finished jewelry must still be verified through supplier documentation and independent certification.

## Run locally

This is a static site and needs no build step. Open `index.html` directly, or serve it with any static server:

```bash
npx serve .
```

## Included MVP interactions

- High-jewelry dashboard and editorial asset vault
- Text-to-image, image-to-3D, and 4D motion briefs
- Material controls for 24K gold forms, finishes, diamond varieties, and cuts
- Natural-material policy in generated download manifests
- Local jewelry image/video file selection

The generation controls are front-end placeholders. Connect the form submit handler to production image, 3D, storage, and video-generation APIs, and require provenance/certification metadata before publishing a finished asset.
