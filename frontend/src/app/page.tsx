"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type Kind = "top" | "bottom";
type Clothing = { id: string; name: string; type: Kind; color: string; accent: string; image?: string };
type Outfit = { name: string; mood: string; top: string; bottom: string; reason: string };

const starterClothes: Clothing[] = [
  { id: "sweatshirt", name: "크림 맨투맨", type: "top", color: "#e8e2d5", accent: "#aaa18f", image: "/images/clothes/cream-sweatshirt-final.png" },
  { id: "trench", name: "베이지 트렌치코트", type: "top", color: "#aa9a77", accent: "#77694e", image: "/images/clothes/beige-trench-coat-cutout.png" },
  { id: "puffer", name: "블랙 패딩", type: "top", color: "#202020", accent: "#050505", image: "/images/clothes/black-puffer-cutout.png" },
  { id: "shirt", name: "라이트 블루 셔츠", type: "top", color: "#ced8e8", accent: "#8799b2", image: "/images/clothes/blue-shirt-cutout.png" },
  { id: "vest", name: "그린 니트 조끼", type: "top", color: "#294a32", accent: "#142a1b", image: "/images/clothes/green-knit-vest-cutout.png" },
  { id: "wide-pants", name: "네이비 와이드 팬츠", type: "bottom", color: "#151b2c", accent: "#090c15", image: "/images/clothes/navy-wide-pants-cutout.png" },
  { id: "floral-skirt", name: "플라워 롱스커트", type: "bottom", color: "#e7dec9", accent: "#9f8269", image: "/images/clothes/floral-skirt-cutout.png" },
  { id: "navy-slacks", name: "네이비 슬랙스", type: "bottom", color: "#171b29", accent: "#090b12", image: "/images/clothes/navy-slacks-cutout.png" },
  { id: "blue-jeans", name: "워싱 와이드 데님", type: "bottom", color: "#758ba2", accent: "#40566d", image: "/images/clothes/blue-jeans-cutout.png" },
];

const outfits: Outfit[] = [
  { name: "포근한 데일리 룩", mood: "COZY TODAY", top: "sweatshirt", bottom: "blue-jeans", reason: "크림 맨투맨과 워싱 데님으로 편안하게 입어봐." },
  { name: "단정한 출근 룩", mood: "SOFT OFFICE", top: "shirt", bottom: "navy-slacks", reason: "라이트 블루 셔츠와 슬랙스로 깔끔하게 맞췄어." },
  { name: "빈티지 피크닉 룩", mood: "PICNIC DAY", top: "vest", bottom: "floral-skirt", reason: "니트 조끼와 플라워 스커트가 부드럽게 어울려." },
  { name: "쌀쌀한 날 외출 룩", mood: "COLD WEATHER", top: "puffer", bottom: "wide-pants", reason: "두꺼운 패딩과 긴 팬츠로 찬 바람을 막아줘." },
  { name: "비 오는 날 클래식 룩", mood: "RAINY CLASSIC", top: "trench", bottom: "navy-slacks", reason: "트렌치코트와 슬랙스로 차분하게 마무리했어." },
];

function Garment({ item }: { item: Clothing }) {
  if (item.image) {
    return <Image src={item.image} alt={item.name} width={160} height={160} unoptimized className="h-full w-full object-cover" />;
  }
  return (
    <div
      className={`garment ${item.type === "top" ? "garment-top" : "garment-bottom"}`}
      style={{ "--cloth": item.color, "--accent": item.accent } as React.CSSProperties}
    >
      <span />
    </div>
  );
}

function Avatar({
  top,
  bottom,
  onDress,
  aiImage,
}: {
  top: Clothing;
  bottom: Clothing;
  onDress: (id: string) => void;
  aiImage: string | null;
}) {
  const [topPose, setTopPose] = useState({ x: 72, y: 142, width: 156 });
  const [bottomPose, setBottomPose] = useState({ x: 92, y: 250, width: 116 });
  const drag = useRef<{ kind: Kind; x: number; y: number; startX: number; startY: number } | null>(null);

  useEffect(() => {
    setTopPose({ x: top.id === "trench" ? 62 : 72, y: 142, width: top.id === "trench" ? 176 : 156 });
  }, [top.id]);

  useEffect(() => {
    setBottomPose({ x: bottom.id === "floral-skirt" ? 78 : 92, y: 250, width: bottom.id === "floral-skirt" ? 145 : 116 });
  }, [bottom.id]);

  const moveLayer = (event: React.PointerEvent<HTMLImageElement>, kind: Kind) => {
    const active = drag.current;
    if (!active || active.kind !== kind) return;
    const next = { x: active.x + event.clientX - active.startX, y: active.y + event.clientY - active.startY };
    if (kind === "top") setTopPose((pose) => ({ ...pose, ...next }));
    else setBottomPose((pose) => ({ ...pose, ...next }));
  };

  const startMove = (event: React.PointerEvent<HTMLImageElement>, kind: Kind) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const pose = kind === "top" ? topPose : bottomPose;
    drag.current = { kind, x: pose.x, y: pose.y, startX: event.clientX, startY: event.clientY };
  };

  const resize = (kind: Kind, amount: number) => {
    if (kind === "top") setTopPose((pose) => ({ ...pose, width: Math.max(60, pose.width + amount) }));
    else setBottomPose((pose) => ({ ...pose, width: Math.max(60, pose.width + amount) }));
  };

  return (
    <div
      className="avatar-stage relative mx-auto h-[500px] w-[260px] sm:h-[580px] sm:w-[300px]"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onDress(event.dataTransfer.getData("text/clothing-id"));
      }}
    >
      <Image
        src={aiImage ?? "/images/fitme-avatar-y2k.png"}
        alt={aiImage ? "AI가 옷을 맞춰 입힌 캐릭터" : "나의 코디 캐릭터"}
        fill
        priority
        unoptimized={Boolean(aiImage)}
        sizes="300px"
        className="object-contain"
      />
      {!aiImage && top.image && (
        <Image
          src={top.image}
          alt={top.name}
          width={400}
          height={400}
          unoptimized
          draggable={false}
          className="free-clothing free-clothing-top"
          style={{ left: topPose.x, top: topPose.y, width: topPose.width }}
          onPointerDown={(event) => startMove(event, "top")}
          onPointerMove={(event) => moveLayer(event, "top")}
          onPointerUp={() => (drag.current = null)}
        />
      )}
      {!aiImage && bottom.image && (
        <Image
          src={bottom.image}
          alt={bottom.name}
          width={400}
          height={400}
          unoptimized
          draggable={false}
          className="free-clothing free-clothing-bottom"
          style={{ left: bottomPose.x, top: bottomPose.y, width: bottomPose.width }}
          onPointerDown={(event) => startMove(event, "bottom")}
          onPointerMove={(event) => moveLayer(event, "bottom")}
          onPointerUp={() => (drag.current = null)}
        />
      )}
      {!aiImage && <div className="fit-controls">
        <span>상의</span><button onClick={() => resize("top", -10)}>−</button><button onClick={() => resize("top", 10)}>＋</button>
        <span>하의</span><button onClick={() => resize("bottom", -10)}>−</button><button onClick={() => resize("bottom", 10)}>＋</button>
      </div>}
      <div className="drop-hint">옷을 여기로 끌어다 놔</div>
    </div>
  );
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [clothes, setClothes] = useState(starterClothes);
  const [index, setIndex] = useState(0);
  const [topId, setTopId] = useState(outfits[0].top);
  const [bottomId, setBottomId] = useState(outfits[0].bottom);
  const [tab, setTab] = useState<Kind>("top");
  const [weather, setWeather] = useState({ place: "서울", temp: 22, label: "맑음", icon: "☀️" });
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [isFitting, setIsFitting] = useState(false);
  const [fitError, setFitError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!started || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const result = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code&timezone=auto`);
        const data = await result.json();
        const code = Number(data.current.weather_code);
        const rainy = code >= 51;
        const cloudy = code >= 2 && code <= 48;
        setWeather({
          place: "현재 위치",
          temp: Math.round(data.current.temperature_2m),
          label: rainy ? "비" : cloudy ? "구름 많음" : "맑음",
          icon: rainy ? "🌧️" : cloudy ? "⛅" : "☀️",
        });
      } catch {
        // 위치 접근이 안 되면 서울의 시연용 기본값을 유지한다.
      }
    });
  }, [started]);

  const top = clothes.find((item) => item.id === topId) ?? clothes[0];
  const bottom = clothes.find((item) => item.id === bottomId) ?? clothes.find((item) => item.type === "bottom")!;

  const showOutfit = (nextIndex: number) => {
    const next = (nextIndex + outfits.length) % outfits.length;
    setIndex(next);
    setTopId(outfits[next].top);
    setBottomId(outfits[next].bottom);
    setAiImage(null);
  };

  const dress = (id: string) => {
    const item = clothes.find((cloth) => cloth.id === id);
    if (!item) return;
    item.type === "top" ? setTopId(id) : setBottomId(id);
    setAiImage(null);
  };

  const generateAiFit = async () => {
    if (!top.image || !bottom.image) return;
    setIsFitting(true);
    setFitError("");

    try {
      const [topFile, bottomFile] = await Promise.all([
        fetch(top.image).then((response) => response.blob()),
        fetch(bottom.image).then((response) => response.blob()),
      ]);
      const form = new FormData();
      form.append("top", topFile, "top.png");
      form.append("bottom", bottomFile, "bottom.png");

      const response = await fetch("/api/try-on", { method: "POST", body: form });
      const responseText = await response.text();
      let result: { image?: string; error?: string };
      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          response.ok
            ? "AI 서버 응답을 읽지 못했어."
            : `AI 서버 오류 (${response.status}): ${responseText.slice(0, 120)}`,
        );
      }
      if (!response.ok) throw new Error(result.error ?? "AI 피팅 생성에 실패했어.");
      if (!result.image) throw new Error("생성된 이미지가 비어 있어.");
      setAiImage(result.image);
    } catch (error) {
      setFitError(error instanceof Error ? error.message : "AI 피팅 생성에 실패했어.");
    } finally {
      setIsFitting(false);
    }
  };

  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const id = `upload-${Date.now()}`;
    const item: Clothing = {
      id,
      name: file.name.replace(/\.[^.]+$/, ""),
      type: tab,
      color: tab === "top" ? "#d7b7f0" : "#b4cce5",
      accent: "#8f6aad",
      image: URL.createObjectURL(file),
    };
    setClothes((current) => [...current, item]);
    tab === "top" ? setTopId(id) : setBottomId(id);
    setAiImage(null);
    event.target.value = "";
  };

  if (!started) {
    return (
      <main className="landing">
        <div className="landing-blob blob-one" />
        <div className="landing-blob blob-two" />
        <p className="brand">옷똑</p>
        <section className="relative z-10 flex flex-col items-center text-center">
          <span className="mb-6 rounded-full bg-white/70 px-5 py-2 text-sm font-bold text-[#8f5b4d]">날씨와 내 옷장으로 완성하는 오늘의 코디</span>
          <h1 className="break-keep text-[clamp(3.5rem,10vw,7.5rem)] font-black leading-[.98] tracking-[-.08em]">오늘,<br />뭐 입지?</h1>
          <p className="mt-7 text-lg font-semibold leading-8 text-[#775f59]">고민은 우리가 할게.<br />넌 마음에 드는 옷만 골라!</p>
          <button className="start-button" onClick={() => setStarted(true)}>내 코디 추천받기 <span>→</span></button>
          <p className="mt-4 text-xs font-semibold text-[#a58880]">약 1분이면 충분해</p>
        </section>
        <div className="landing-card card-left">🧥</div>
        <div className="landing-card card-right">👖</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf4] text-[#3d2925]">
      <header className="sticky top-0 z-30 border-b border-[#eaded4] bg-[#fffaf4]/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button className="text-2xl font-black tracking-[-.08em]" onClick={() => setStarted(false)}>옷똑</button>
          <div className="weather-pill"><span className="text-xl">{weather.icon}</span><span><b>{weather.temp}°</b> {weather.place} · {weather.label}</span></div>
          <button className="camera-button" onClick={() => fileRef.current?.click()} aria-label="옷 사진 추가"><span>＋</span> 📷</button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-sm font-bold text-[#ef7f6d]">TODAY&apos;S PICK</p><h1 className="mt-1 text-3xl font-black tracking-[-.05em] sm:text-4xl">오늘은 이렇게 입어봐!</h1></div>
          <p className="rounded-full bg-[#fff0db] px-4 py-2 text-sm font-bold text-[#8e6751]">{weather.temp}° · 얇은 면, 가벼운 겉옷 추천</p>
        </div>

        <section className="styling-grid">
          <aside className="closet-panel">
            <div className="wardrobe-crown"><span>MY CLOSET</span></div>
            <div className="mb-4 flex items-center justify-between">
              <div><p className="eyebrow">DRAG &amp; DRESS</p><h2 className="text-xl font-black">옷장에서 꺼내 입혀봐</h2></div>
              <button className="mini-add" onClick={() => fileRef.current?.click()}>사진 추가</button>
            </div>
            <div className="mb-4 flex rounded-xl bg-[#f4ebe4] p-1 text-sm font-bold">
              {(["top", "bottom"] as Kind[]).map((kind) => <button key={kind} className={`flex-1 rounded-lg py-2 ${tab === kind ? "bg-white shadow-sm" : ""}`} onClick={() => setTab(kind)}>{kind === "top" ? "상의" : "하의"}</button>)}
            </div>
            <div className="closet-interior">
              <div className="hanger-rail" />
              <div className="closet-items">
              {clothes.filter((item) => item.type === tab).map((item) => {
                const selected = item.id === (item.type === "top" ? topId : bottomId);
                return (
                  <button
                    key={item.id}
                    draggable
                    className={`closet-item ${selected ? "selected" : ""}`}
                    onDragStart={(event) => {
                      event.dataTransfer.setData("text/clothing-id", item.id);
                      event.dataTransfer.effectAllowed = "copy";
                    }}
                    onClick={() => dress(item.id)}
                  >
                    <span className="hanger">⌒</span>
                    <div className="h-36 overflow-hidden p-2"><Garment item={item} /></div>
                    <span>{item.name}</span>
                  </button>
                );
              })}
              </div>
              <div className="wardrobe-drawers"><span /><span /><span /></div>
            </div>
            <button className="upload-empty" onClick={() => fileRef.current?.click()}>📷　내 옷 사진 추가하기</button>
          </aside>

          <section className="avatar-panel">
            <div className="recommend-badge">AI 추천 {index + 1} / {outfits.length}</div>
            <button className="arrow left-4" onClick={() => showOutfit(index - 1)} aria-label="이전 코디">‹</button>
            <Avatar top={top} bottom={bottom} onDress={dress} aiImage={aiImage} />
            <button className="arrow right-4" onClick={() => showOutfit(index + 1)} aria-label="다음 코디">›</button>
            <div className="text-center">
              <p className="text-xs font-black tracking-[.18em] text-[#ef7f6d]">{outfits[index].mood}</p>
              <h2 className="mt-1 text-2xl font-black">{outfits[index].name}</h2>
              <p className="mx-auto mt-2 max-w-sm break-keep text-sm font-semibold leading-6 text-[#876e68]">{outfits[index].reason}</p>
            </div>
            <div className="mt-5 flex gap-2">{outfits.map((outfit, i) => <button key={outfit.name} aria-label={`${i + 1}번 코디`} onClick={() => showOutfit(i)} className={`h-2.5 rounded-full transition-all ${index === i ? "w-8 bg-[#ef7f6d]" : "w-2.5 bg-[#decfc4]"}`} />)}</div>
          </section>

          <aside className="choice-panel">
            <div><p className="eyebrow">CHANGE ITEMS</p><h2 className="text-xl font-black">마음대로 바꿔 입기</h2></div>
            {[[top, "상의"], [bottom, "하의"]].map(([item, label]) => {
              const cloth = item as Clothing;
              return <div className="choice-card" key={label as string}><div className="choice-preview"><Garment item={cloth} /></div><div className="min-w-0"><span>{label as string}</span><b>{cloth.name}</b></div></div>;
            })}
            <div className="weather-note"><span>{weather.icon}</span><div><b>오늘의 코디 팁</b><p>햇빛은 따뜻하지만 저녁엔 선선해. 얇은 겉옷을 챙기면 좋아!</p></div></div>
            <button className="ai-fit-button" onClick={generateAiFit} disabled={isFitting}>
              {isFitting ? "AI가 옷을 맞추는 중..." : "✨ AI로 몸에 딱 맞게 입히기"}
            </button>
            {fitError && <p className="fit-error">{fitError}</p>}
            <button className="save-button">이 코디로 결정할래 ♡</button>
          </aside>
        </section>
      </div>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={upload} />
    </main>
  );
}
