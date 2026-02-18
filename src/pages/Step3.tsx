import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StepIndicator from '../components/StepIndicator';
import ResultCard from '../components/ResultCard';
import DetailModal from '../components/DetailModal';
import { calculateRecommendations, type ScoredResult } from '../utils/scoring';
import { questions } from '../data/questions';

const questionKeyMap = Object.fromEntries(questions.map((q) => [q.id, q.competencyKey]));

export default function Step3() {
  const navigate = useNavigate();
  const { answers, selectedInterests, resetAll } = useApp();
  const [selectedResult, setSelectedResult] = useState<ScoredResult | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  const recommendations = useMemo(
    () => calculateRecommendations(answers, questionKeyMap),
    [answers]
  );

  const handleBookmarkToggle = (id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRestart = () => {
    resetAll();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      {/* 고정 헤더 */}
      <div className="bg-white border-b border-[#e5e7eb] px-8 pt-6 pb-8">
        <div className="max-w-[1071px] mx-auto w-full flex flex-col gap-10">
          {/* 스텝 인디케이터 (모두 완료) */}
          <StepIndicator currentStep={3} />

          {/* 타이틀 + 서브타이틀 */}
          <div className="flex flex-col gap-4 items-center text-center w-full">
            <p className="font-semibold text-[24px] tracking-[-0.48px] text-[#101828]">
              🎉 진단 완료! 맞춤 추천 결과를 확인하세요
            </p>
            <div className="text-[14px] leading-[22.75px] text-[#4a5565]">
              <p>당신의 관심사와 역량을 바탕으로 진출분야와 학과를 매칭했어요.</p>
              <p>각 카드를 눌러 자세한 정보를 확인하고, 관심있는 항목은 저장해 두세요.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 결과 카드 영역 */}
      <div className="flex-1 pb-8">
        <div className="max-w-[1071px] mx-auto px-8 pt-8">
          <div className="flex gap-[25px] items-start">
            {recommendations.map((result) => (
              <div key={result.id} className="flex-1 min-w-0">
                <ResultCard
                  result={result}
                  onDetailClick={() => setSelectedResult(result)}
                  isBookmarked={bookmarks.has(result.id)}
                  onBookmarkToggle={() => handleBookmarkToggle(result.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 고정 액션 바 */}
      <div className="bg-[#f9fafb] border-t border-[#e5e7eb] px-8 py-6 flex flex-col gap-4">
        <div className="max-w-[1071px] mx-auto w-full flex flex-col gap-4">
          {/* PDF 저장 + 이메일 전송 */}
          <div className="flex gap-3">
            <button
              disabled
              className="flex-1 h-[68px] rounded-[14px] bg-white border border-[rgba(161,161,170,0.7)] flex items-center justify-center gap-3 text-[16px] text-[#364153] cursor-not-allowed opacity-60"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 2v10M6 8l4 4 4-4M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              PDF 저장
            </button>
            <button
              disabled
              className="flex-1 h-[68px] rounded-[14px] bg-white border border-[rgba(161,161,170,0.7)] flex items-center justify-center gap-3 text-[16px] text-[#364153] cursor-not-allowed opacity-60"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 4a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM2 4l8 7 8-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              이메일 전송
            </button>
          </div>

          {/* 다시 진단하기 */}
          <button
            onClick={handleRestart}
            className="w-full h-[68px] rounded-[14px] bg-white border border-[#9e1a21] flex items-center justify-center gap-3 text-[16px] text-[#9e1a21] hover:bg-[#fef2f2] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4v5h5M16 16v-5h-5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 9a8 8 0 0114 3M16 11a8 8 0 01-14-3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            다시 진단하기
          </button>
        </div>
      </div>

      {/* 상세 모달 */}
      {selectedResult && (
        <DetailModal
          result={selectedResult}
          selectedInterests={selectedInterests}
          answers={answers}
          onClose={() => setSelectedResult(null)}
          isBookmarked={bookmarks.has(selectedResult.id)}
          onBookmarkToggle={() => handleBookmarkToggle(selectedResult.id)}
        />
      )}
    </div>
  );
}
