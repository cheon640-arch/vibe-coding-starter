import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY가 설정되지 않았어. frontend/.env.local에 키를 추가해줘." },
        { status: 503 },
      );
    }

    const incoming = await request.formData();
    const top = incoming.get("top");
    const bottom = incoming.get("bottom");

    if (!(top instanceof File) || !(bottom instanceof File)) {
      return NextResponse.json({ error: "상의와 하의 이미지가 모두 필요해." }, { status: 400 });
    }

    const avatarPath = path.join(process.cwd(), "public", "images", "fitme-avatar-y2k.png");
    const avatar = await readFile(avatarPath);
    const form = new FormData();

  form.append("model", "gpt-image-1.5");
  form.append("image[]", new Blob([avatar], { type: "image/png" }), "avatar.png");
  form.append("image[]", top, "top.png");
  form.append("image[]", bottom, "bottom.png");
  form.append("quality", "medium");
  form.append("size", "1024x1536");
  form.append("output_format", "png");
  form.append("input_fidelity", "high");
  form.append(
    "prompt",
    [
      "Create a polished full-body Y2K browser dress-up game character.",
      "Image 1 is the character reference. Preserve her face, hairstyle, body proportions, front-facing pose, hands, legs, and warm cream background exactly.",
      "Image 2 is the top garment reference and Image 3 is the bottom garment reference.",
      "Redraw both garments in the same clean 2D illustration style as the character and tailor them naturally to her exact body.",
      "Preserve each garment's color, material, pattern, collar, pockets, seams, and distinctive details.",
      "The top must sit correctly on shoulders, chest, sleeves, and waist. The bottom must sit correctly on waist, hips, crotch, and legs.",
      "Show one character only, fully visible from head to feet. No extra clothing, no text, no UI, no hangers, no paper tabs, no border, and no watermark.",
    ].join(" "),
  );

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });

    const result = await response.json();
    if (!response.ok) {
      const message = result?.error?.message ?? "AI 피팅 생성에 실패했어.";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const image = result?.data?.[0]?.b64_json;
    if (!image) {
      return NextResponse.json({ error: "생성된 이미지가 비어 있어." }, { status: 502 });
    }

    return NextResponse.json({ image: `data:image/png;base64,${image}` });
  } catch (error) {
    console.error("AI try-on failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "AI 피팅 서버 오류가 발생했어." },
      { status: 500 },
    );
  }
}
