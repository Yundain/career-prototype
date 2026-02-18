import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StepIndicator from '../components/StepIndicator';
import QuestionCard from '../components/QuestionCard';
import { questions } from '../data/questions';
import { careerResults } from '../data/results';

export default function Step2() {
  const navigate = useNavigate();
  const { answers, setAnswers, selectedInterests } = useApp();

  // 선택한 관심분야 클러스터에 속하는 진출분야들의 역량만 필터링
  const filteredQuestions = useMemo(() => {
    const relevantCareers = careerResults.filter((c) =>
      c.relatedClusters.some((cid) => selectedInterests.includes(cid))
    );
    const relevantKeys = new Set<string>();
    relevantCareers.forEach((c) =>
      c.topWeightedComps.forEach((comp) => relevantKeys.add(comp.key))
    );
    const filtered = questions.filter((q) => relevantKeys.has(q.competencyKey));

    console.group('[Step2] 관심분야 → 역량문항 필터링');
    console.log('선택된 클러스터 ID:', selectedInterests);
    console.log('매칭된 진출분야 수:', relevantCareers.length);
    console.log('필요 역량 키:', [...relevantKeys]);
    console.log(`노출 문항: ${filtered.length}개`, filtered.map((q) => `#${q.id} ${q.competencyKey}`));
    console.groupEnd();

    return filtered;
  }, [selectedInterests]);

  const totalQ = filteredQuestions.length;
  const answeredCount = filteredQuestions.filter((q) => answers[q.id] !== undefined).length;
  const allAnswered = totalQ > 0 && answeredCount === totalQ;
  const progress = totalQ > 0 ? (answeredCount / totalQ) * 100 : 0;

  // 포커스된 카드 인덱스 (0-based)
  const [focusedIndex, setFocusedIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 포커스 카드로 스크롤
  const scrollToCard = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  useEffect(() => {
    scrollToCard(focusedIndex);
  }, [focusedIndex]);

  const handleAnswer = (questionId: number, score: number, cardIndex: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);

    // 다음 미응답 카드로 포커스 이동
    const nextUnanswered = filteredQuestions.findIndex(
      (q, i) => i > cardIndex && newAnswers[q.id] === undefined
    );
    if (nextUnanswered !== -1) {
      setTimeout(() => setFocusedIndex(nextUnanswered), 300);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      {/* 고정 헤더 */}
      <div className="bg-white border-b border-[#e5e7eb] px-8 py-6 sticky top-0 z-20 flex flex-col gap-3">
        <div className="max-w-[1071px] mx-auto w-full flex flex-col gap-3">
          {/* 스텝 인디케이터 */}
          <StepIndicator currentStep={2} />

          {/* 진행 현황 텍스트 */}
          <div className="flex items-center justify-between h-5">
            <span className="text-[14px] text-[#4a5565] leading-5">
              질문 {focusedIndex + 1} / {totalQ}
            </span>
            <span className="text-[14px] text-[#101828] leading-5">
              {answeredCount}개 응답 완료
            </span>
          </div>

          {/* 진행 바 (12px 높이) */}
          <div className="bg-[#e5e7eb] rounded-full h-3 w-full overflow-hidden">
            <div
              className="bg-[#9e1a21] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 카드 영역 */}
      <div className="flex-1 bg-[#f9fafb] py-[200px] flex flex-col items-center gap-6 overflow-y-auto">
        {filteredQuestions.map((q, index) => (
          <div
            key={q.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            className="w-full max-w-[832px] px-4"
          >
            <QuestionCard
              question={q}
              questionNumber={index + 1}
              answer={answers[q.id]}
              onAnswer={(score) => handleAnswer(q.id, score, index)}
              isFocused={focusedIndex === index}
              onClick={() => setFocusedIndex(index)}
            />
          </div>
        ))}

        {/* 모두 응답 완료 시 버튼 */}
        {allAnswered && (
          <div className="w-full max-w-[832px] px-4">
            <button
              onClick={() => navigate('/step3')}
              className="w-full h-14 rounded-[14px] bg-[#9e1a21] text-white text-[15px] font-bold hover:bg-[#7f1419] shadow-md transition-all"
            >
              결과 확인하기 →
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
