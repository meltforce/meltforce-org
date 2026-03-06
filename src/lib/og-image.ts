import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const fontsDir = join(process.cwd(), "src/assets/fonts");
const fontRegular = readFileSync(join(fontsDir, "JetBrainsMono-Regular.ttf"));
const fontBold = readFileSync(join(fontsDir, "JetBrainsMono-Bold.ttf"));

interface OgImageParams {
  title: string;
  date: string;
  tags: string[];
}

export async function generateOgImage({
  title,
  date,
  tags,
}: OgImageParams): Promise<Buffer> {
  const titleSize = title.length > 90 ? 34 : title.length > 60 ? 40 : 48;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "40px",
          backgroundColor: "#09090b",
        },
        children: {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              padding: "48px",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "8px",
            },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    fontSize: "24px",
                    color: "#a1a1aa",
                  },
                  children: "meltforce",
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    fontSize: `${titleSize}px`,
                    fontWeight: 700,
                    color: "#fafafa",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                  },
                  children: title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    fontSize: "20px",
                    color: "#14b8a6",
                  },
                  children: [
                    { type: "span", props: { children: date } },
                    ...tags.map((tag) => ({
                      type: "span",
                      props: { children: `#${tag}` },
                    })),
                  ],
                },
              },
            ],
          },
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "JetBrains Mono", data: fontRegular, weight: 400 as const },
        { name: "JetBrains Mono", data: fontBold, weight: 700 as const },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });

  return resvg.render().asPng();
}
