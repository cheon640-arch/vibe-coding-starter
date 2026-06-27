import Image from "next/image";
import { getHighlights, getProfile } from "@/lib/db";

const infoCards = [
  { label: "이름", key: "name", color: "bg-[#fef3c8]" },
  { label: "소속", key: "team", color: "bg-[#d2fae5]" },
  { label: "역할", key: "position", color: "bg-[#fae9ff]" },
  { label: "관심 분야", key: "uniform_number", color: "bg-[#f5d1fe]" },
] as const;

export default function Home() {
  const profile = getProfile();
  const highlights = getHighlights();

  return (
    <main className="min-h-screen overflow-hidden bg-white font-sans font-bold text-black">
      <section className="relative overflow-hidden bg-[#dff8ff] px-6 pb-32 pt-6">
        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between rounded-[100px] border border-black bg-white px-5 py-3 shadow-[2px_2px_0_#0a0a0d]">
          <span className="text-xl font-bold tracking-tight">● My Profile</span>
          <span className="rounded-[100px] border border-black bg-[#a3e635] px-4 py-2 text-base font-bold shadow-[2px_2px_0_#0a0a0d]">
            About Me
          </span>
        </nav>

        <div className="relative z-10 mx-auto mt-12 grid max-w-6xl items-center gap-8 pb-8 md:grid-cols-[320px_1fr]">
          <Image
            src="/images/profile-character.png"
            alt="천지원 캐릭터 프로필"
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 768px) 260px, 320px"
            className="mx-auto h-auto w-full max-w-[260px] drop-shadow-[4px_4px_0_rgba(0,0,0,0.18)] md:max-w-[320px]"
          />
          <div className="text-center">
            <span className="inline-flex rounded-[100px] border border-black bg-white px-4 py-2 text-base font-bold">
              ✦ Industrial Engineering Student
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              안녕하세요,
              <br />
              {profile.name}입니다.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl break-keep text-xl font-bold leading-8">{profile.tagline}</p>
          </div>
        </div>

        <svg className="cloud-drift absolute left-[7%] top-32 w-32" viewBox="0 0 140 60" aria-hidden="true">
          <path
            d="M28 50h82c15 0 24-8 24-19s-10-19-23-19c-5 0-9 1-13 4C92 7 82 2 70 2 54 2 42 11 39 24c-3-2-7-3-11-3C15 21 6 28 6 36s9 14 22 14Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="2"
          />
        </svg>
        <svg className="cloud-drift-reverse absolute right-[8%] top-44 w-24" viewBox="0 0 140 60" aria-hidden="true">
          <path
            d="M28 50h82c15 0 24-8 24-19s-10-19-23-19c-5 0-9 1-13 4C92 7 82 2 70 2 54 2 42 11 39 24c-3-2-7-3-11-3C15 21 6 28 6 36s9 14 22 14Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="2"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 h-16 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 38C240 82 480 0 720 38s480 44 720 0v42H0Z" fill="#b7eaf6" />
        </svg>
      </section>

      <section className="bg-[#b7eaf6] px-6 py-20">
        <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex rounded-[100px] border border-black bg-white px-4 py-2 text-base font-bold">
            기본 정보
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em]">한눈에 보는 프로필</h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card) => (
            <article
              key={card.key}
              className={`${card.color} rounded-xl border border-black p-6 shadow-[2px_2px_0_#0a0a0d]`}
            >
              <p className="text-base font-bold">{card.label}</p>
              <p className="mt-3 text-2xl font-bold">{profile[card.key]}</p>
            </article>
          ))}
        </div>

        <article className="relative mt-10 overflow-hidden rounded-2xl border border-black bg-[#b7eaf6] p-7 shadow-[4px_4px_0_#171717] sm:p-9">
          <div className="relative z-10">
            <div>
              <p className="text-base font-bold">UPCOMING PROJECT</p>
              <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                고모텍 자동화 마케팅 프로젝트 참여 예정
              </h3>
              <p className="mt-3 max-w-3xl break-keep text-lg font-bold leading-7">
                데이터 분석 경험과 적극적인 태도를 바탕으로 프로젝트에 열심히 참여할 예정입니다.
              </p>
            </div>
          </div>
          <span className="absolute -bottom-8 -right-4 rotate-12 text-8xl font-bold text-black/10">PROJECT</span>
        </article>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#67c7d9] px-6 py-24">
        <svg
          className="absolute left-0 top-0 h-12 w-full -translate-y-[1px]"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0h1440v10c-240 38-480-10-720 12S240 48 0 12Z" fill="#b7eaf6" />
        </svg>

        <svg className="fish-swim-slow absolute bottom-8 right-[5%] w-20" viewBox="0 0 120 60" aria-hidden="true">
          <path d="M25 30C42 8 76 8 94 30 76 52 42 52 25 30Z" fill="#fef3c8" stroke="#000" strokeWidth="2" />
          <path d="m25 30-18-15v30Z" fill="#fef3c8" stroke="#000" strokeWidth="2" />
          <circle cx="79" cy="25" r="2.5" fill="#000" />
        </svg>

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <span className="inline-flex rounded-[100px] border border-black bg-white px-4 py-2 text-base font-bold">
              나를 소개합니다
            </span>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">자기소개</h2>
          </div>
          <div className="-rotate-1 rounded-2xl border border-black bg-white p-7 shadow-[4px_4px_0_#171717]">
            <p className="text-xl font-bold leading-8">{profile.introduction}</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#3366e0] px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-flex rounded-[100px] border border-black bg-white px-4 py-2 text-base font-bold">
            ✦ Highlights
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">나를 보여주는 특징</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {highlights.map((highlight, index) => (
              <article
                key={highlight.id}
                className={`rounded-2xl border border-black bg-white p-7 text-2xl font-bold shadow-[4px_4px_0_#171717] ${
                  index % 2 === 0 ? "-rotate-1" : "rotate-1"
                }`}
              >
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black bg-[#a3e635]">
                  {index + 1}
                </span>
                <p>{highlight.label}</p>
              </article>
            ))}
          </div>
        </div>
        <svg className="fish-swim absolute bottom-8 left-[4%] w-24" viewBox="0 0 120 60" aria-hidden="true">
          <path d="M25 30C42 8 76 8 94 30 76 52 42 52 25 30Z" fill="#a3e635" stroke="#000" strokeWidth="2" />
          <path d="m25 30-18-15v30Z" fill="#a3e635" stroke="#000" strokeWidth="2" />
          <circle cx="79" cy="25" r="2.5" fill="#000" />
        </svg>
        <svg className="fish-swim-slow absolute bottom-12 right-[5%] w-20" viewBox="0 0 120 60" aria-hidden="true">
          <path d="M25 30C42 8 76 8 94 30 76 52 42 52 25 30Z" fill="#f5d1fe" stroke="#000" strokeWidth="2" />
          <path d="m25 30-18-15v30Z" fill="#f5d1fe" stroke="#000" strokeWidth="2" />
          <circle cx="79" cy="25" r="2.5" fill="#000" />
        </svg>
      </section>

      <section className="relative overflow-hidden bg-[#f5d1fe] px-6 pb-24 pt-32 text-center text-black">
        <svg
          className="absolute left-0 top-0 h-14 w-full"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0h1440v18c-240 42-480-12-720 14S240 56 0 20Z" fill="#3366e0" />
        </svg>
        <span className="inline-flex rounded-[100px] border border-black bg-white px-4 py-2 text-base font-bold text-black shadow-[2px_2px_0_#0a0a0d]">
          MY PROMISE
        </span>
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-6xl">
          긍정적인 태도로,
          <br />
          열심히 참여하겠습니다.
        </h2>
        <span className="absolute left-[8%] top-24 -rotate-6 text-5xl text-[#3366e0]">✦</span>
        <span className="absolute bottom-10 right-[9%] rotate-6 text-4xl text-[#3366e0]">✦</span>
      </section>

      <footer className="border-t border-black bg-[#f5f5f5] px-6 py-6 text-center text-base font-bold">
        Industrial Engineering · Data Mining · Marketing Automation
      </footer>
    </main>
  );
}
