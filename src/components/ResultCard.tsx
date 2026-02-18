import type { ScoredResult } from '../utils/scoring';

interface ResultCardProps {
  result: ScoredResult;
  onDetailClick: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const rankBg: Record<number, string> = {
  1: '#aea17d',
  2: '#b2b3b7',
  3: '#e1e2e3',
};
const rankTextColor: Record<number, string> = {
  1: '#ffffff',
  2: '#ffffff',
  3: '#71717a',
};

export default function ResultCard({ result, onDetailClick, isBookmarked, onBookmarkToggle }: ResultCardProps) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[16px] flex flex-col w-full">
      {/* 상단 영역: 순위 원 + 진출분야명 + 북마크 */}
      <div className="pt-6 px-6 flex items-start justify-between">
        <div className="flex flex-col gap-4">
          {/* 순위 원 */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: rankBg[result.rank] }}
          >
            <span className="text-[20px] leading-7" style={{ color: rankTextColor[result.rank] }}>
              {result.rank}
            </span>
          </div>
          {/* 진출분야명 */}
          <h3 className="text-[24px] font-semibold tracking-[-0.24px] text-[#09090b] leading-8">
            {result.careerField}
          </h3>
        </div>

        {/* 북마크 버튼 */}
        <button
          onClick={onBookmarkToggle}
          className="w-10 h-10 rounded-[10px] flex items-start justify-start pt-2 px-2 shrink-0"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              stroke={isBookmarked ? '#9e1a21' : '#a1a1aa'}
              strokeWidth="1.5"
              fill={isBookmarked ? '#9e1a21' : 'none'}
            />
          </svg>
        </button>
      </div>

      {/* 하단 콘텐츠 */}
      <div className="pl-6 py-6 flex flex-col gap-6 pr-6">
        {/* 설명 + 역량 태그 (구분선 있음) */}
        <div className="border-b border-[#e5e7eb] pb-[25px] flex flex-col gap-4">
          <p className="text-[14px] leading-[22.75px] text-[#4a5565]">
            {result.careerDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {result.requiredCompetencies.map((comp) => (
              <span
                key={comp}
                className="bg-[#f3f4f6] px-3 py-1.5 rounded-[10px] text-[12px] leading-4 text-[#364153]"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>

        {/* 추천 학과 */}
        <div className="flex flex-col gap-4">
          {/* 추천 학과 배지 */}
          <div className="bg-[#fff9e6] border border-[#f5dd91] px-[13px] py-[7px] rounded-[10px] self-start">
            <span className="text-[12px] leading-4 text-[#594400]">추천 학과</span>
          </div>

          {/* 학과명 + 대학명 */}
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-semibold tracking-[-0.18px] text-[#101828] leading-7">
              {result.department}
            </p>
            <p className="text-[14px] leading-5 text-[#6a7282]">{result.college}</p>
          </div>

          {/* 학과 소개 (3줄 고정 높이) */}
          <div className="overflow-hidden" style={{ height: '68.25px' }}>
            <p className="text-[14px] leading-[22.75px] text-[#4a5565]">
              {result.deptDescription}
            </p>
          </div>
        </div>

        {/* 자세히 보기 버튼 */}
        <button
          onClick={onDetailClick}
          className="border border-[rgba(161,161,170,0.7)] h-14 rounded-[14px] w-full text-[16px] font-semibold text-[#b20710] hover:bg-[#fef2f2] transition-colors"
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
}
