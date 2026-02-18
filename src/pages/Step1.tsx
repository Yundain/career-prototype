import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StepIndicator from '../components/StepIndicator';
import InterestCard from '../components/InterestCard';
import { interestAreas } from '../data/interestAreas';

const MIN_SELECT = 2;
const MAX_SELECT = 4;

export default function Step1() {
  const navigate = useNavigate();
  const { selectedInterests, setSelectedInterests } = useApp();

  const count = selectedInterests.length;
  const canProceed = count >= MIN_SELECT;
  const progress = (count / MAX_SELECT) * 100;

  const handleToggle = (id: number) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== id));
    } else {
      if (count < MAX_SELECT) {
        setSelectedInterests([...selectedInterests, id]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      {/* 고정 헤더 */}
      <div className="bg-white border-b border-[#e5e7eb] px-8 py-6 sticky top-0 z-20">
        <div className="max-w-[1071px] mx-auto w-full flex flex-col gap-10">
          {/* 스텝 인디케이터 */}
          <StepIndicator currentStep={1} />

          {/* 타이틀 + 서브타이틀 (center) */}
          <div className="flex flex-col gap-4 items-center text-center w-full">
            <p className="font-semibold text-[24px] leading-6 tracking-[-0.24px] text-[#101828]">
              📝 관심있는 분야를 선택해주세요
            </p>
            <p className="text-[14px] leading-[22.75px] text-[#4a5565]">
              당신이 관심있는 진출 분야를 2-4개 선택해주세요. 솔직하게 선택할수록 더 정확한 추천을 받을 수 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="flex-1 pb-[113px]">
        <div className="max-w-[1071px] mx-auto px-8 pt-10">
          <div className="flex flex-wrap gap-4 content-start">
            {interestAreas.map((area) => (
              <InterestCard
                key={area.id}
                area={area}
                isSelected={selectedInterests.includes(area.id)}
                onClick={() => handleToggle(area.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 하단 고정 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] z-30">
        {/* 선택 현황 + 진행 바 */}
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

        {/* 버튼 */}
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
