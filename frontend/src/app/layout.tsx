import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "옷똑 | 오늘 뭐 입지?",
  description: "내 옷장과 오늘 날씨로 완성하는 AI 코디 추천",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
