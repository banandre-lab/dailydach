import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "DailyDach - Stories with Daily Duck Energy"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#f8f1cc",
          color: "#1a1734",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-70px",
            left: "-120px",
            width: "540px",
            height: "260px",
            background: "#f0cf23",
            border: "6px solid #1a1734",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-110px",
            right: "-100px",
            width: "500px",
            height: "320px",
            background: "#e1b30f",
            border: "6px solid #1a1734",
            transform: "rotate(14deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "90px",
            right: "90px",
            width: "180px",
            height: "180px",
            background: "#4cb6d8",
            border: "6px solid #1a1734",
            transform: "rotate(9deg)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "46px 58px",
            border: "6px solid #1a1734",
            background: "#fff7dc",
            boxShadow: "12px 12px 0 #1a1734",
            maxWidth: "920px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Daily Duck Energy
          </div>
          <h1
            style={{
              fontSize: "102px",
              lineHeight: "0.86",
              letterSpacing: "0.02em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            DailyDach
          </h1>
          <p
            style={{
              fontSize: "34px",
              fontWeight: 700,
              marginTop: "18px",
              marginBottom: 0,
            }}
          >
            Stories with bold cultural pulse
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
