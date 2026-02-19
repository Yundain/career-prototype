interface InterestCardProps {
  keyword: string;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
  onHover: () => void;
  onHoverEnd: () => void;
}

export default function InterestCard({
  keyword,
  isSelected,
  disabled,
  onClick,
  onHover,
  onHoverEnd,
}: InterestCardProps) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      disabled={disabled && !isSelected}
      className={`px-5 py-4 rounded-[14px] border-2 text-left transition-all duration-150 flex items-center gap-3 ${
        isSelected
          ? 'border-[#9e1a21] bg-[#fef2f2] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]'
          : disabled
          ? 'border-[#e5e7eb] bg-white opacity-40 cursor-not-allowed'
          : 'border-[#e5e7eb] bg-white hover:border-[#9e1a21] hover:bg-[#fef9f9]'
      }`}
    >
      <span
        className={`text-[14px] font-semibold leading-5 transition-colors ${
          isSelected ? 'text-[#9e1a21]' : 'text-[#364153]'
        }`}
      >
        {keyword}
      </span>

      {/* 체크 아이콘 — 선택 시에만 공간 차지 */}
      {isSelected && (
        <div className="bg-[#9e1a21] flex items-center justify-center rounded-full shrink-0 w-5 h-5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
