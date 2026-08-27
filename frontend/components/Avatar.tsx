import Image from "next/image";

// Stepped/pixel-cut frame instead of a plain circle — echoes the
// pixel-art portrait itself rather than fighting it with a smooth crop.
const PIXEL_CLIP =
  "polygon(20% 0%,80% 0%,80% 5%,90% 5%,90% 10%,95% 10%,95% 20%,100% 20%,100% 80%,95% 80%,95% 90%,90% 90%,90% 95%,80% 95%,80% 100%,20% 100%,20% 95%,10% 95%,10% 90%,5% 90%,5% 80%,0% 80%,0% 20%,5% 20%,5% 10%,10% 10%,10% 5%,20% 5%)";

export default function Avatar({
  size = 40,
  glow = false,
}: {
  size?: number;
  glow?: boolean;
}) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {glow && (
        <div
          className="absolute -inset-3 bg-accent/25 blur-2xl"
          style={{ clipPath: PIXEL_CLIP }}
          aria-hidden
        />
      )}
      <div
        className="relative h-full w-full overflow-hidden bg-card ring-1 ring-line/50"
        style={{ clipPath: PIXEL_CLIP }}
      >
        <Image
          src="/avatar.jpg"
          alt="Pixel-art portrait of Neha"
          fill
          sizes={`${size}px`}
          className="object-cover"
          priority={size > 60}
        />
      </div>
    </div>
  );
}
