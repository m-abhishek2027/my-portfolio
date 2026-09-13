/**
 * Shared TypeScript types for the JSON files still living in the top-level
 * `/data` folder (content that isn't owned by any one component).
 *
 * Every section component (Navbar, HeroBanner, About, Skills, Projects,
 * Experience, Contact, Footer) owns its data as a co-located `*.json` file
 * plus local types declared right in the component's own `.tsx` file —
 * see that folder instead of here.
 */

/** A single image reference — usually a Cloudinary URL + alt text. */
export interface ImageAsset {
  url: string;
  alt: string;
}

/** A gallery image, tagged with a category (see `data/images.json`). */
export interface GalleryImage extends ImageAsset {
  id: string;
  category: string;
}

/** Site-wide images that aren't tied to a specific component (see `data/images.json`). */
export interface ImagesData {
  gallery: GalleryImage[];
}
