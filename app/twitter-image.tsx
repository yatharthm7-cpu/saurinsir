import { renderShareImage, alt, size, contentType } from "@/lib/og-image";

export { alt, size, contentType };

export default async function Image() {
  return renderShareImage();
}
