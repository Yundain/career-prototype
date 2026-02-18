import type { CompetencyQuestion } from '../data/questions';

interface QuestionCardProps {
  question: CompetencyQuestion;
  questionNumber: number;
  answer: number | undefined;
  onAnswer: (score: number) => void;
  isFocused: boolean;
  onClick: () => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  answer,
  onAnswer,
  isFocused,
  onClick,
}: QuestionCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] transition-opacity duration-300 cursor-pointer shrink-0 ${
        isFocused ? 'opacity-100' : 'opacity-40'
      }`}
    >
      <div className="flex flex-col gap-6 items-start p-[41px]">
        {/* Q번호 + 질문 텍스트 */}
        <div className="flex flex-col gap-4 items-start">
          <p className="text-[32px] font-semibold tracking-[-0.32px] text-[#9e1a21]">
            Q{questionNumber}.
          </p>
          <p className="text-[20px] font-semibold tracking-[-0.2px] text-[#101828]">
            {question.question}
          </p>
        </div>

        {/* 5점 척도 */}
        <div className="flex flex-col gap-3 items-start w-full">
          {/* 척도 버튼 영역 */}
          <div className="relative h-[88px] w-full">
            {/* 연결선 (원 중심에 위치: 20px 숫자 + 12px gap + 28px 원반지름 = 60px, 버튼 top=0 기준) */}
            <div className="absolute bg-[#e5e7eb] h-[2px] left-0 top-[58px] right-0" />

            {/* 버튼들 */}
            <div className="absolute flex items-center justify-between left-0 top-0 w-full h-[88px]">
              {[1, 2, 3, 4, 5].map((score) => {
                const isSelected = answer === score;
                return (
                  <button
                    key={score}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAnswer(score);
                    }}
                    className="flex flex-col items-center w-[56px] h-[88px] relative z-10"
                    style={{ gap: isSelected ? '9.2px' : '12px' }}
                  >
                    {/* 숫자 레이블 */}
                    <span
                      className="text-[14px] leading-5 text-center"
                      style={{ color: isSelected ? '#9e1a21' : '#6a7282' }}
                    >
                      {score}
                    </span>

                    {/* 원형 버튼 */}
                    {isSelected ? (
                      <div
                        className="rounded-full bg-[#9e1a21] border-4 border-[#9e1a21] flex items-center justify-center shrink-0"
                        style={{ width: '61.6px', height: '61.6px', marginTop: '-2.8px' }}
                      >
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                          <path
                            d="M5 13L10 18.5L21 8"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="rounded-full bg-white border-4 border-[#d1d5dc] flex-1 w-[56px]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 레이블 */}
          <div className="flex items-center justify-between px-2 w-full">
            <span className="text-[14px] text-[#4a5565] text-center">전혀 못함</span>
            <span className="text-[14px] text-[#99a1af] text-center">보통</span>
            <span className="text-[14px] text-[#4a5565] text-center">매우 잘함</span>
          </div>
        </div>
      </div>
    </div>
  );
}
