import Database from "better-sqlite3";
import path from "node:path";

export type Profile = {
  id: number;
  name: string;
  team: string;
  position: string;
  uniform_number: string;
  tagline: string;
  introduction: string;
  image_path: string;
};

export type Highlight = {
  id: number;
  label: string;
};

const dbPath = path.join(process.cwd(), "local.db");

const defaultProfile: Profile = {
  id: 1,
  name: "천지원",
  team: "산업공학과",
  position: "대학생",
  uniform_number: "데이터마이닝",
  tagline: "데이터를 분석하고, 그 안에 숨은 패턴과 의미를 발견하는 데 관심이 있습니다.",
  introduction:
    "안녕하세요. 산업공학을 전공하고 있는 천지원입니다. 긍정적인 태도로 수업과 활동에 적극적으로 참여하며, 데이터마이닝 수업에서 프로젝트를 수행한 경험이 있습니다. 데이터를 분석해 의미 있는 패턴을 찾고, 그 결과를 문제 해결에 연결하는 과정에 관심이 많습니다.",
  image_path: "/images/ohtani.jpeg",
};

const defaultHighlights: Highlight[] = [
  { id: 1, label: "긍정적인 태도" },
  { id: 2, label: "적극적인 참여" },
  { id: 3, label: "데이터마이닝 프로젝트 경험" },
];

function getDb() {
  const db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      team TEXT NOT NULL,
      position TEXT NOT NULL,
      uniform_number TEXT NOT NULL,
      tagline TEXT NOT NULL,
      introduction TEXT NOT NULL,
      image_path TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL
    );
  `);

  return db;
}

export function getProfile() {
  try {
    const profile = getDb()
      .prepare(
        "SELECT id, name, team, position, uniform_number, tagline, introduction, image_path FROM profile ORDER BY id LIMIT 1",
      )
      .get() as Profile | undefined;

    return profile ?? defaultProfile;
  } catch (error) {
    console.error(error);
    return defaultProfile;
  }
}

export function getHighlights() {
  try {
    const highlights = getDb().prepare("SELECT id, label FROM highlights ORDER BY id").all() as Highlight[];

    return highlights.length > 0 ? highlights : defaultHighlights;
  } catch (error) {
    console.error(error);
    return defaultHighlights;
  }
}
