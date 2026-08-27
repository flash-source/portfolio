// A small hand-placed pixel grid forming a blocky 8-bit cloud silhouette —
// same "grid of squares" technique as the Avatar/Nav pixel monogram used
// to use, just repurposed here for a dino-runner-style sky.
const CLOUD_GRID: number[][] = [
  [0, 0, 1, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
];

export default function PixelCloud({
  size = 6,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(8, ${size}px)`,
        gridTemplateRows: `repeat(4, ${size}px)`,
        ...style,
      }}
      aria-hidden
    >
      {CLOUD_GRID.flatMap((row, r) =>
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
