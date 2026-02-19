import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StepIndicator from '../components/StepIndicator';
import InterestCard from '../components/InterestCard';
import { interestAreas } from '../data/interestAreas';

const MIN_SELECT = 2;
const MAX_SELECT = 4;

// 각 interestArea의 키워드를 독립적인 항목으로 평탄화
// id 형식: `${areaId}_${kwIdx}`
const keywordItems = interestAreas.flatMap((area) =>
  area.title.split(',').map((kw, i) => ({
    id: `${area.id}_${i}`,
    keyword: kw.trim(),
    areaId: area.id,
    description: area.description,
  }))
);

export default function Step1() {
  const navigate = useNavigate();
  const { setSelectedInterests } = useApp();

  // 선택된 키워드 id 집합
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<typeof keywordItems[number] | null>(null);

  const count = selectedIds.size;
  const canProceed = count >= MIN_SELECT;
  const canSelectMore = count < MAX_SELECT;
  const progress = (count / MAX_SELECT) * 100;

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < MAX_SELECT) {
        next.add(id);
      }
      // 선택된 areaId 집합을 AppContext에 동기화 (DetailModal 추천 이유용)
      const areaIds = [...new Set([...next].map((k) => Number(k.split('_')[0])))];
      setSelectedInterests(areaIds);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      {/* 고정 헤더 */}
      <div className="bg-white border-b border-[#e5e7eb] px-8 py-6 sticky top-0 z-20">
        <div className="max-w-[1071px] mx-auto w-full flex flex-col gap-10">
          <StepIndicator currentStep={1} />
          <div className="flex flex-col gap-4 items-center text-center w-full">
            <p className="font-semibold text-[24px] leading-6 tracking-[-0.24px] text-[#101828]">
              📝 관심있는 분야를 선택해주세요
            </p>
            <p className="text-[14px] leading-[22.75px] text-[#4a5565]">
              관심있는 키워드를 2~4개 선택해주세요. 각 키워드 위에 마우스를 올리면 설명을 볼 수 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* 키워드 그리드 */}
      <div className="flex-1 pb-[240px]">
        <div className="max-w-[1071px] mx-auto px-8 pt-10">
          <div className="flex flex-wrap gap-3 content-start">
            {keywordItems.map((item) => (
              <InterestCard
                key={item.id}
                keyword={item.keyword}
                isSelected={selectedIds.has(item.id)}
                disabled={!canSelectMore && !selectedIds.has(item.id)}
                onClick={() => handleToggle(item.id)}
                onHover={() => setHoveredItem(item)}
                onHoverEnd={() => setHoveredItem(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 분야 설명 패널 (hover 시 고정 바 위에 표시) */}
      <div
        className={`fixed bottom-[185px] left-0 right-0 z-20 px-8 transition-all duration-200 ${
          hoveredItem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="max-w-[1071px] mx-auto">
          <div className="bg-white border border-[#e5e7eb] rounded-[12px] px-5 py-4 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
            <p className="text-[13px] font-semibold text-[#9e1a21] mb-1">
              {hoveredItem?.keyword}
            </p>
            <p className="text-[13px] leading-[1.6] text-[#4a5565]">
              {hoveredItem?.description}
            </p>
          </div>
        </div>
      </div>

      {/* 하단 고정 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] z-30">
        <div className="max-w-[1071px] mx-auto px-8 pt-5 flex flex-col gap-3 h-[85px]">
          <div className="flex items-center justify-between h-5">
            <span className="text-[14px] text-[#4a5565] leading-5">선택 현황</span>
            <span className="text-[14px] text-[#101828] leading-5">{count} / 4개</span>
          </div>
          <div className="bg-[#e5e7eb] rounded-full h-3 w-full overflow-hidden">
            <div
              className="bg-[#9e1a21] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="max-w-[1071px] mx-auto px-8 pb-6">
          <button
            onClick={() => navigate('/step2')}
            disabled={!canProceed}
            className={`w-full h-16 rounded-[14px] flex items-center justify-center gap-2 text-[16px] font-semibold transition-all ${
              canProceed
                ? 'bg-[#9e1a21] text-white hover:bg-[#7f1419] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]'
                : 'bg-[#e5e7eb] text-[#99a1af] cursor-not-allowed'
            }`}
          >
            <span>다음 단계로</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10h12M11 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
