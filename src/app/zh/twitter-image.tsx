import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Xentra - 把复杂市场，做成可信系统";
export const size = socialImageSize;
export const contentType = "image/png";

export default function ChineseTwitterImage() {
  return createSocialImage("zh");
}
