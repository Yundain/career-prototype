import { careerResults, type CareerResult } from '../data/results';

export interface ScoredResult extends CareerResult {
  score: number;
  rank: number;
}

export function calculateRecommendations(
  answers: Record<number, number>,
  questionKeyMap: Record<number, string>
): ScoredResult[] {
  // 사용자 응답을 competencyKey → score 맵으로 변환
  const userScores: Record<string, number> = {};
  Object.entries(answers).forEach(([qId, score]) => {
    const key = questionKeyMap[Number(qId)];
    if (key) userScores[key] = score;
  });

  console.group('[Step3] 역량 점수 계산');
  console.log('응답한 역량 점수:', userScores);

  // 각 진출분야별 점수 계산
  const scored = careerResults.map((career) => {
    const breakdown = career.topWeightedComps.map((comp) => {
      const userScore = userScores[comp.key] ?? 3;
      return { key: comp.key, userScore, weight: comp.weight, contribution: userScore * comp.weight };
    });
    const score = breakdown.reduce((t, b) => t + b.contribution, 0);
    return { ...career, score, _breakdown: breakdown };
  });

  // 점수 기준 내림차순 정렬 후 rank 부여
  const sorted = scored
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  console.log('TOP 5 결과:');
  sorted.slice(0, 5).forEach((r) => {
    console.group(`  ${r.rank}위 [${r.score.toFixed(1)}점] ${r.careerField} (${r.department})`);
    r._breakdown.forEach((b) => {
      const flag = userScores[b.key] !== undefined ? '' : ' ← 기본값3점';
      console.log(`  ${b.key}: ${b.userScore}점 × ${b.weight} = ${b.contribution}${flag}`);
    });
    console.groupEnd();
  });
  console.groupEnd();

  return sorted.slice(0, 3).map(({ _breakdown: _b, ...rest }) => rest) as ScoredResult[];
}
