import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#EDE9E0", // --bg (light mode)
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#8A5C04", 
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8A5C04",
            }}
          >
            Full-Stack Developer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 100,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#0A0A0A", // --ink
          }}
        >
          Neha Goyal
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            lineHeight: 1.4,
            maxWidth: 880,
            color: "#4B4A4A",
          }}
        >
          I build full-stack products from the ground up.
        </div>

        <div style={{ display: "flex", marginTop: 60 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid #8A5C04",
              color: "#8A5C04",
              fontSize: 24,
            }}
          >
            github.com/flash-source
          </div>
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}