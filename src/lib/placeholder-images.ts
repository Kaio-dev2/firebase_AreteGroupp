import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

/**
 * Resolves the image URL for a project/case study that may either:
 * - reference a placeholder image by id (`image`), or
 * - provide a direct image URL (`imageUrl`).
 * Falls back to a generic placeholder if neither resolves.
 */
export function resolveProjectImage(item: { image?: string; imageUrl?: string }): { url: string; hint: string } {
  if (item.imageUrl) {
    return { url: item.imageUrl, hint: 'project screenshot' };
  }
  const placeholder = item.image ? PlaceHolderImages.find((img) => img.id === item.image) : undefined;
  if (placeholder) {
    return { url: placeholder.imageUrl, hint: placeholder.imageHint };
  }
  return { url: 'https://placehold.co/600x400/0f172a/2563eb?text=Arete+Groupp', hint: 'placeholder' };
}
