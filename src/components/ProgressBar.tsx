import { ProgressBarProps } from "@/types";

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  return (
    <div className="flex space-x-2 justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-1 rounded-full transition-all duration-300 ${
            index <= currentStep ? "bg-white w-8" : "bg-white/30 w-8"
          }`}
        />
      ))}
    </div>
  );
}
