import PixelCactus from "./PixelCactus";

// A repeating SVG pattern tiles infinitely at any width, unlike a fixed
// set of JS-rendered blades — the dino-runner "ground line" effect.
const TILE_WIDTH = 20;

export default function PixelGrassDivider({ height = 34 }: { height?: number }) {
  return (
    <div className="relative w-full text-accent" style={{ height }} aria-hidden>
      <svg
        width="100%"
        height={height}
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id="pixelGrass"
            width={TILE_WIDTH}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {/* ground base */}
            <rect x="0" y={height - 8} width={TILE_WIDTH} height="8" fill="currentColor" />
            {/* blades, varying height for a jagged silhouette */}
            <rect x="1" y={height - 16} width="2" height="8" fill="currentColor" />
            <rect x="4" y={height - 12} width="2" height="4" fill="currentColor" />
            <rect x="9" y={height - 22} width="2" height="14" fill="currentColor" />
            <rect x="12" y={height - 14} width="2" height="6" fill="currentColor" />
            <rect x="16" y={height - 18} width="2" height="10" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pixelGrass)" />
      </svg>

      {/* a couple of cacti riding the ground line -- the unmistakable dino-game tell */}
      <div
        className="absolute text-accent/80"
        style={{ left: "14%", bottom: 8 }}
      >
        <PixelCactus size={4} />
      </div>
      <div
        className="absolute text-accent/80"
        style={{ left: "78%", bottom: 8 }}
      >
        <PixelCactus size={3} />
      </div>
    </div>
  );
}
