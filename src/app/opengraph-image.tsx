import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Xentra - Decision infrastructure for trust-heavy markets";
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage();
}
