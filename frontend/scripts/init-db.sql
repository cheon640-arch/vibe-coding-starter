DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS highlights;

CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  position TEXT NOT NULL,
  uniform_number TEXT NOT NULL,
  tagline TEXT NOT NULL,
  introduction TEXT NOT NULL,
  image_path TEXT NOT NULL
);

CREATE TABLE highlights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL
);

INSERT INTO profile (
  name,
  team,
  position,
  uniform_number,
  tagline,
  introduction,
  image_path
) VALUES (
  '천지원',
  '산업공학과',
  '대학생',
  '데이터마이닝',
  '데이터를 분석하고, 그 안에 숨은 패턴과 의미를 발견하는 데 관심이 있습니다.',
  '안녕하세요. 산업공학을 전공하고 있는 천지원입니다. 긍정적인 태도로 수업과 활동에 적극적으로 참여하며, 데이터마이닝 수업에서 프로젝트를 수행한 경험이 있습니다. 데이터를 분석해 의미 있는 패턴을 찾고, 그 결과를 문제 해결에 연결하는 과정에 관심이 많습니다.',
  '/images/ohtani.jpeg'
);

INSERT INTO highlights (label) VALUES
  ('긍정적인 태도'),
  ('적극적인 참여'),
  ('데이터마이닝 프로젝트 경험');
