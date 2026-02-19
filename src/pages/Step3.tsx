import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StepIndicator from '../components/StepIndicator';
import ResultCard from '../components/ResultCard';
import DetailModal from '../components/DetailModal';
import { calculateRecommendations, type ScoredResult } from '../utils/scoring';
import { questions } from '../data/questions';
import { encodeStateToParams, decodeStateFromParams } from '../utils/urlState';

const questionKeyMap = Object.fromEntries(questions.map((q) => [q.id, q.competencyKey]));

export default function Step3() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { answers, selectedInterests, setAnswers, setSelectedInterests, resetAll } = useApp();
  const [selectedResult, setSelectedResult] = useState<ScoredResult | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // URL 파라미터에서 상태 복원 (직접 링크 접근 시)
  const urlState = useMemo(
    () => decodeStateFromParams(searchParams.toString()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // 마운트 시 한 번만 파싱
  );

  // URL에서 복원된 경우 컨텍스트에 반영 (DetailModal 등 하위 컴포넌트를 위해)
  useEffect(() => {
    if (urlState) {
      setSelectedInterests(urlState.selectedInterests);
      setAnswers(urlState.answers);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 정상 플로우로 진입한 경우 URL에 상태 인코딩
  useEffect(() => {
    if (!urlState && selectedInterests.length > 0 && Object.keys(answers).length > 0) {
      const query = encodeStateToParams(selectedInterests, answers);
      window.history.replaceState(null, '', `${window.location.pathname}?${query}`);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 점수 계산에 사용할 실제 값 (URL 파라미터 우선)
  const activeAnswers = urlState?.answers ?? answers;
  const activeInterests = urlState?.selectedInterests ?? selectedInterests;

  const recommendations = useMemo(
    () => calculateRecommendations(activeAnswers, questionKeyMap),
    [activeAnswers]
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

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      {/* 헤더 */}
      <div className="bg-white border-b border-[#e5e7eb] px-8 pt-6 pb-8">
        <div className="max-w-[1071px] mx-auto w-full flex flex-col gap-10">
          <StepIndicator currentStep={3} />
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

      {/* 만족도 평가 */}
      <div className="max-w-[1071px] mx-auto px-8 pb-8 w-full">
        <div className="bg-white border border-[#e5e7eb] rounded-[16px] px-8 py-6 flex flex-col items-center gap-4">
          <p className="text-[15px] font-semibold text-[#364153]">이 추천 결과가 도움이 됐나요?</p>

          {/* 별점 */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => { setRating(star); setFeedbackSubmitted(false); }}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
                className="text-[32px] leading-none transition-transform hover:scale-110"
              >
                <span className={(hoveredRating ?? 0) >= star || (rating ?? 0) >= star ? 'text-[#fab712]' : 'text-[#d1d5dc]'}>
                  ★
                </span>
              </button>
            ))}
          </div>

          {/* 별점 선택 후: 서술형 입력 or 완료 메시지 */}
          {rating !== null && (
            feedbackSubmitted ? (
              <p className="text-[13px] text-[#6a7282]">소중한 피드백 감사해요!</p>
            ) : (
              <div className="w-full flex flex-col gap-3">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="더 하고 싶은 말이 있다면 남겨주세요. (선택)"
                  rows={3}
                  className="w-full border border-[#e5e7eb] rounded-[10px] px-4 py-3 text-[14px] text-[#364153] placeholder-[#99a1af] resize-none focus:outline-none focus:border-[#9e1a21] transition-colors"
                />
                <button
                  onClick={() => setFeedbackSubmitted(true)}
                  className="self-end px-5 h-10 rounded-[10px] bg-[#9e1a21] text-white text-[14px] font-semibold hover:bg-[#7f1419] transition-colors"
                >
                  제출하기
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* 하단 액션 바 */}
      <div className="bg-[#f9fafb] border-t border-[#e5e7eb] px-8 py-6 flex flex-col gap-4">
        <div className="max-w-[1071px] mx-auto w-full flex flex-col gap-4">
          {/* 결과 링크 복사 + PDF 저장 */}
          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className="flex-1 h-[68px] rounded-[14px] bg-white border border-[#9e1a21] flex items-center justify-center gap-3 text-[16px] text-[#9e1a21] hover:bg-[#fef2f2] transition-colors"
            >
              {copied ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#9e1a21" strokeWidth="1.5">
                    <path d="M4 10l5 5 7-8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  링크 복사됨!
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 5H5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3M13 3h4m0 0v4m0-4L9 11" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  결과 링크 복사
                </>
              )}
            </button>
            <button
              disabled
              className="flex-1 h-[68px] rounded-[14px] bg-white border border-[rgba(161,161,170,0.7)] flex items-center justify-center gap-3 text-[16px] text-[#364153] cursor-not-allowed opacity-60"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 2v10M6 8l4 4 4-4M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              PDF 저장
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
          selectedInterests={activeInterests}
          answers={activeAnswers}
          onClose={() => setSelectedResult(null)}
          isBookmarked={bookmarks.has(selectedResult.id)}
          onBookmarkToggle={() => handleBookmarkToggle(selectedResult.id)}
        />
      )}
    </div>
  );
}
