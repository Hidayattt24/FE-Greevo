export interface SlideData {
  image: string;
  title: string;
  description: string;
}

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export interface MobileLayoutProps {
  children: React.ReactNode;
}
