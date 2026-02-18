import { useEffect } from 'react';
import type { ScoredResult } from '../utils/scoring';
import { interestAreas } from '../data/interestAreas';
import { questions } from '../data/questions';

interface DetailModalProps {
  result: ScoredResult;
  selectedInterests: number[];
  answers: Record<number, number>;
  onClose: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

export default function DetailModal({
  result,
  selectedInterests,
  answers,
  onClose,
  isBookmarked,
  onBookmarkToggle,
}: DetailModalProps) {
  // 배경 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // ESC 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // 추천 이유 bullet list 생성
  // 1) 선택된 관심사 중 relatedClusters에 해당하는 것
  const matchedInterests = interestAreas.filter(
    (a) => selectedInterests.includes(a.id) && result.relatedClusters.includes(a.clusterId)
  );
  // 관심사가 없으면 선택된 것 중 첫 번째 표시
  const interestToShow =
    matchedInterests.length > 0
      ? matchedInterests.slice(0, 2)
      : interestAreas.filter((a) => selectedInterests.includes(a.id)).slice(0, 1);

  // 2) 높은 점수(4~5)로 응답한 질문 중 topWeightedComps에 포함된 것 (최대 2개)
  const matchedQuestions = questions.filter((q) => {
    const score = answers[q.id];
    return score && score >= 4 && result.topWeightedComps.some((c) => c.key === q.competencyKey);
  }).slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 overflow-y-auto flex items-start justify-center py-10 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-[24px] shadow-[0px_25px_120px_0px_rgba(0,0,0,0.25)] w-full max-w-[960px] flex flex-col overflow-hidden">

        {/* 헤더 */}
        <div className="bg-white px-10 pt-8 pb-px flex flex-col shrink-0">
          <div className="flex items-start justify-between h-[70px]">
            {/* 좌: 진출분야명 + 학과 */}
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex items-center h-[38px]">
                <h2 className="text-[24px] font-semibold tracking-[-0.48px] text-[#101828] leading-6">
                  {result.careerField}
                </h2>
              </div>
              <p className="text-[14px] leading-5 text-[#6a7282]">
                {result.department} ({result.college})
              </p>
            </div>

            {/* 우: 북마크 + 닫기 */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={onBookmarkToggle}
                className="w-9 h-9 rounded-[10px] flex items-start justify-start pt-2 px-2 hover:bg-gray-50"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v13l-6-3-6 3V4z"
                    stroke={isBookmarked ? '#9e1a21' : '#a1a1aa'}
                    strokeWidth="1.5"
                    fill={isBookmarked ? '#9e1a21' : 'none'}
                  />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-[10px] flex items-start justify-start pt-2 px-2 hover:bg-gray-50"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#a1a1aa" strokeWidth="1.5">
                  <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 스크롤 가능한 콘텐츠 */}
        <div className="overflow-y-auto flex flex-col gap-6 pt-8 px-8 pb-8">

          {/* 추천 이유 박스 */}
          <div className="bg-[#fff9e6] border border-[#fab712] rounded-[16px] px-[25px] py-6 flex flex-col gap-4">
            <p className="text-[18px] font-semibold tracking-[-0.18px] text-[#364153] leading-[22.75px]">
              이 추천은 당신의 관심사와 역량을 바탕으로 매칭되었어요
            </p>
            <ul className="list-disc text-[14px] text-[#364153] leading-[22.75px] flex flex-col gap-1 pl-5">
              {interestToShow.map((area) => (
                <li key={area.id}>'{area.title}'에 관심이 있다.</li>
              ))}
              {matchedQuestions.map((q) => (
                <li key={q.id}>{q.question}</li>
              ))}
              {interestToShow.length === 0 && matchedQuestions.length === 0 && (
                <li>선택한 관심 분야와 역량이 이 분야와 연관됩니다.</li>
              )}
            </ul>
          </div>

          {/* 커리어 분야 상세 박스 */}
          <div className="border border-[#e5e7eb] rounded-[16px] p-[33px] flex flex-col gap-6">
            {/* 섹션 타이틀 */}
            <div className="flex items-center gap-3 h-[27px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" strokeLinecap="round"/>
                <path d="M12 12h.01M8 12h.01M16 12h.01" strokeLinecap="round" strokeWidth="2"/>
              </svg>
              <h3 className="text-[18px] font-semibold text-[#101828] leading-[27px]">
                {result.careerField} 분야 상세
              </h3>
            </div>

            {/* 이 분야는요 */}
            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-[#364153] leading-5">이 분야는요</p>
              <p className="text-[16px] text-[#364153] leading-[26px]">{result.careerDescription}</p>
            </div>

            {/* 주요 수행직무 */}
            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-[#364153] leading-5">주요 수행직무</p>
              <p className="text-[16px] text-[#364153] leading-[26px]">{result.jobDutiesText}</p>
            </div>

            {/* 필요한 역량 */}
            <div className="flex flex-col gap-3">
              <p className="text-[14px] text-[#364153] leading-5">필요한 역량</p>
              <div className="flex flex-wrap gap-2">
                {result.modalCompetencyTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#f4f4f4] px-[13px] py-[9px] rounded-[10px] text-[14px] text-[#364153] leading-5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 진출 분야 */}
            <div className="flex flex-col gap-3">
              <p className="text-[14px] text-[#364153] leading-5">진출 분야</p>
              <div className="flex flex-wrap gap-2">
                {result.careerFieldGroups.map((group) => (
                  <span
                    key={group}
                    className="bg-[#f4f4f4] px-[13px] py-[9px] rounded-[10px] text-[14px] text-[#364153] leading-5"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 학과 상세 박스 */}
          <div className="border border-[#e5e7eb] rounded-[16px] p-[33px] flex flex-col gap-6">
            {/* 섹션 타이틀 */}
            <div className="flex items-center gap-3 h-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                <path d="M12 3L2 9l10 6 10-6-10-6z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 6 10-6M2 13l10 6 10-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="text-[18px] font-semibold text-[#101828] leading-6">
                {result.department} 상세
              </h3>
            </div>

            {/* 학과 소개 */}
            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-[#364153] leading-5">학과 소개</p>
              <p className="text-[16px] text-[#364153] leading-[26px]">{result.deptDescription}</p>
            </div>

            {/* 졸업 후 진로 */}
            <div className="flex flex-col gap-3">
              <p className="text-[14px] text-[#364153] leading-5">졸업 후 진로</p>
              <div className="flex flex-wrap gap-3">
                {result.afterGraduation.map((career) => (
                  <div
                    key={career}
                    className="bg-[#f4f4f4] h-[46px] rounded-[10px] flex items-center px-[17px]"
                    style={{ width: 'calc(50% - 6px)' }}
                  >
                    <p className="text-[14px] text-[#364153] leading-5">{career}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 고정 CTA */}
        <div className="bg-white border-t border-[#e5e7eb] px-10 py-8 flex flex-col gap-4 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0">
          {/* 관심 목록 추가 버튼 */}
          <button
            onClick={onBookmarkToggle}
            className={`w-full h-16 rounded-[14px] text-[16px] font-semibold text-white transition-colors ${
              isBookmarked ? 'bg-[#7f1419]' : 'bg-[#9e1a21] hover:bg-[#7f1419]'
            }`}
          >
            {isBookmarked ? '✓ 관심 목록에 추가됨' : '이 추천을 관심 목록에 추가'}
          </button>

          {/* 보조 버튼 2개 */}
          <div className="flex gap-4">
            <button
              disabled
              className="flex-1 h-14 rounded-[14px] border border-[rgba(161,161,170,0.7)] flex items-center justify-center gap-2 text-[14px] text-[#9e1a21] cursor-not-allowed opacity-70"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 1v7M5 5l3 3 3-3M1 11v2a1 1 0 001 1h12a1 1 0 001-1v-2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              학과 홈페이지
            </button>
            <button
              disabled
              className="flex-1 h-14 rounded-[14px] border border-[rgba(161,161,170,0.7)] flex items-center justify-center gap-2 text-[14px] text-[#9e1a21] cursor-not-allowed opacity-70"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 1v7M5 5l3 3 3-3M1 11v2a1 1 0 001 1h12a1 1 0 001-1v-2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              커리어 정보
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
