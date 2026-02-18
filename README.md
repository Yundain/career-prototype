# 서울여자대학교 진로설계 전공탐색 지원시스템 프로토타입

서울여자대학교 자유전공학부 1학년 학생을 대상으로 한 AI 기반 진로설계 시스템의 **UI/UX 검증용 프로토타입**입니다.
학생데이터워킹그룹(S-DWG)이 개발업체 이관 전 추천 로직과 흐름을 시각적으로 검증하기 위해 제작했습니다.

**[→ 프로토타입 바로가기](https://yundain.github.io/career-prototype/)**

---

## 주요 기능

### 3단계 진단 플로우

**Step 1 — 관심 분야 선택**
- 11개 클러스터 카드 중 2~4개 선택
- 선택 현황 진행 바 실시간 반영

**Step 2 — 역량 진단**
- 선택한 관심 분야에 연관된 역량 문항만 필터링하여 노출
- NCS 기반 34개 직업기초능력 문항 (DDIT 수정본)
- 5점 척도 응답, 응답 완료 시 결과 확인 버튼 활성화

**Step 3 — 추천 결과**
- 역량 응답 × 가중치(4 / 3.5 / 3 / 2.5 / 2) 기반 점수 계산
- 상위 3개 진출분야 카드 노출
- 상세 모달: 커리어 분야 상세, 학과 소개, 졸업 후 진로

---

## 기술 스택

- **Vite + React + TypeScript**
- **Tailwind CSS v3**
- **React Router DOM**
- **React Context API** (전역 상태 관리)

---

## 데이터 구조

| 파일 | 내용 | 출처 |
|---|---|---|
| `src/data/interestAreas.ts` | 11개 관심 분야 클러스터 | S-DWG 기획 |
| `src/data/questions.ts` | 34개 역량 진단 문항 | `역량_문항_수정_DDIT_260202.xlsx` |
| `src/data/results.ts` | 137개 진출분야 + 추천 학과 | `Main_Data.csv` |

### 추천 로직

```
점수 = Σ (사용자 응답점수 × 역량 가중치)
```

- 각 진출분야별 TOP 5 역량에 가중치 매핑
- 전체 진출분야 정렬 후 상위 3개 반환
- 미응답 역량은 기본값 3점 처리

---

## 로컬 실행

```bash
npm install
npm run dev
```

---

## 데이터 업데이트 방법

`Main_Data.csv` 또는 역량 문항 xlsx를 수정한 경우, 아래 스크립트로 TypeScript 파일을 재생성합니다.

```bash
# results.ts 재생성
python3 scripts/generate_results.py

# questions.ts 재생성
python3 scripts/generate_questions.py
```

---

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 GitHub Pages에 배포합니다.

```bash
git add .
git commit -m "커밋 메시지"
git push
```

---

## 제작

서울여자대학교 학생데이터워킹그룹 (S-DWG)
