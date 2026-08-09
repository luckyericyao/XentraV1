import { ImageResponse } from "next/og";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

type SocialImageLocale = "en" | "zh";

const socialImageCopy: Record<
  SocialImageLocale,
  {
    eyebrow: string;
    title: string[];
    tags: string;
  }
> = {
  en: {
    eyebrow: "AI-Native Operating Group",
    title: ["Decision infrastructure", "for trust-heavy markets."],
    tags: "AI Capability    /    Local Access    /    Scientific Sourcing",
  },
  zh: {
    eyebrow: "AI 原生运营集团",
    title: ["把复杂市场，", "做成可信系统。"],
    tags: "企业 AI 落地    /    可信本地旅行    /    生命科学供应",
  },
};

export function createSocialImage(locale: SocialImageLocale = "en") {
  const copy = socialImageCopy[locale];

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "radial-gradient(circle at 18% 10%, rgba(198,161,91,0.16), transparent 38%), #070809",
          color: "#F2EFE8",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px 72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,239,232,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(242,239,232,0.03) 1px, transparent 1px)",
            backgroundSize: "96px 96px",
            display: "flex",
            inset: 0,
            opacity: 0.55,
            position: "absolute",
          }}
        />
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            XENTRA
          </div>
          <div
            style={{
              border: "1px solid rgba(198,161,91,0.38)",
              borderRadius: 999,
              color: "#C6A15B",
              display: "flex",
              fontSize: 14,
              letterSpacing: "0.12em",
              padding: "12px 18px",
              textTransform: locale === "en" ? "uppercase" : "none",
            }}
          >
            {copy.eyebrow}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 980,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "serif",
              fontSize: 78,
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
            }}
          >
            {copy.title.map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>
          <div
            style={{
              color: "#A6A39A",
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.08em",
              marginTop: 42,
              textTransform: "uppercase",
            }}
          >
            {copy.tags}
          </div>
        </div>
        <div
          style={{
            background: "linear-gradient(90deg, #C6A15B, rgba(198,161,91,0))",
            display: "flex",
            height: 1,
            position: "relative",
            width: "100%",
          }}
        />
      </div>
    ),
    socialImageSize,
  );
}
