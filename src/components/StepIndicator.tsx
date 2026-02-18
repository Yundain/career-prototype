interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { num: 1, label: '관심 분야' },
  { num: 2, label: '역량진단' },
  { num: 3, label: '결과' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 h-10 w-full">
      {steps.map((step, index) => {
        const isActive = step.num === currentStep;
        const isCompleted = step.num < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.num} className="flex items-center gap-4">
            {/* Step group: circle + label */}
            <div className="flex items-center gap-3 shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-base transition-all ${
                  isActive || isCompleted
                    ? 'bg-[#9e1a21] text-white'
                    : 'bg-[#e5e7eb] text-[#99a1af]'
                }`}
              >
                {isCompleted ? (
                  <span className="text-base">✓</span>
                ) : (
                  <span className="font-normal text-base">{step.num}</span>
                )}
              </div>
              <span
                className={`text-[14px] font-normal leading-5 ${
                  isActive || isCompleted ? 'text-[#9e1a21]' : 'text-[#99a1af]'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={`h-px w-12 shrink-0 ${
                  isCompleted ? 'bg-[#9e1a21]' : 'bg-[#d1d5dc]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
