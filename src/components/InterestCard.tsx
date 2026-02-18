import type { InterestArea } from '../data/interestAreas';

interface InterestCardProps {
  area: InterestArea;
  isSelected: boolean;
  onClick: () => void;
}

export default function InterestCard({ area, isSelected, onClick }: InterestCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-[325px] p-[22px] rounded-[14px] border-2 text-left transition-all duration-200 flex items-center
        ${isSelected
          ? 'border-[#9e1a21] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] bg-white'
          : 'border-[#e5e7eb] bg-white hover:border-[#9e1a21]'
        }`}
    >
      <div className="flex flex-col gap-3 items-start w-full">
        {/* 타이틀 행: 텍스트 + 체크 아이콘 */}
        <div className="flex items-end justify-between w-full">
          <p className="font-bold text-[14px] leading-5 text-[#364153] pr-2">
            {area.title}
          </p>
          {/* 체크 아이콘 - 선택 시 visible, 미선택 시 opacity-0 */}
          <div
            className={`bg-[#9e1a21] flex items-center justify-center rounded-full shrink-0 w-6 h-6 transition-opacity ${
              isSelected ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8L6.5 11.5L13 4.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* 설명 */}
        <p className="text-[12px] leading-5 text-[#364153] w-full whitespace-pre-wrap">
          {area.description}
        </p>
      </div>
    </button>
  );
}
