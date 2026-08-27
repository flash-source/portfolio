// A small saguaro-style pixel cactus — the one unmistakably "dino game"
// element, sitting on top of the grass strip rather than in it so it
// doesn't repeat with every tile of the pattern.
const CACTUS_GRID: number[][] = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
];

export default function PixelCactus({
  size = 4,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(3, ${size}px)`,
        gridTemplateRows: `repeat(5, ${size}px)`,
      }}
      aria-hidden
    >
      {CACTUS_GRID.flatMap((row, r) =>
        row.map((cell, c) => (
          <span
            key={`${r}-${c}`}
            style={{
              width: size,
              height: size,
              backgroundColor: cell ? "currentColor" : "transparent",
            }}
          />
        ))
      )}
    </div>
  );
}
