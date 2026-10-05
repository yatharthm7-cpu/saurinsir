import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";

/**
 * Social-share card: navy/ivory/gold identity with the existing textbook
 * artwork. Deliberately free of ratings, results, qualifications or
 * institutional claims — only what is confirmed on the site.
 */

export const alt = "Saurin Sir's Tuition — commerce tuition for Classes 11–12, BCom, MCom, BBA, MBA and CA & ICMA Foundation in Naranpura, Ahmedabad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const coverData = await readFile(join(process.cwd(), "public/commerce-textbook-cover.png")).then(
  (buffer) => `data:image/png;base64,${buffer.toString("base64")}`,
);

const SUBJECTS = [
  "Accountancy",
  "Legal Studies",
  "Finance",
  "Statistics",
  "Taxation",
  "Cost & Management Accounting",
];

export function renderShareImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0a0e17",
          color: "#f4efe2",
          padding: "64px 72px",
          alignItems: "center",
          gap: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: "#cbb888",
                color: "#0a0e17",
                fontSize: "34px",
                fontWeight: 700,
                fontFamily: "Georgia, serif",
              }}
            >
              S
            </span>
            <span
              style={{
                fontSize: "22px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#cbb888",
              }}
            >
              Commerce Tuition
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span
              style={{
                fontSize: "74px",
                fontWeight: 600,
                fontFamily: "Georgia, serif",
                lineHeight: 1.02,
              }}
            >
              Saurin Sir&rsquo;s Tuition
            </span>
            <span style={{ fontSize: "30px", color: "#e8dfc8", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
              Where learning finally makes sense.
            </span>
          </div>
          <div style={{ display: "flex", width: "120px", height: "3px", background: "#cbb888" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px", maxWidth: "640px" }}>
            {SUBJECTS.map((subject) => (
              <span
                key={subject}
                style={{
                  fontSize: "20px",
                  color: "#b9ad93",
                  border: "1px solid #cbb88855",
                  borderRadius: "999px",
                  padding: "8px 18px",
                }}
              >
                {subject}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "21px", color: "#8d93a5" }}>
            Naranpura, Ahmedabad · Classes 11–12 · BCom · MCom · BBA · MBA · CA &amp; ICMA Foundation
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src={coverData}
            alt=""
            width={300}
            height={450}
            style={{
              borderRadius: "4px",
              border: "1px solid #cbb88866",
              boxShadow: "24px 30px 40px #00000088",
            }}
          />
          <span style={{ fontSize: "20px", color: "#cbb888", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
            The Commerce Notebook
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
