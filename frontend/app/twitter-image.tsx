import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const alt = "Neha Goyal — Full-Stack Developer";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage();
}