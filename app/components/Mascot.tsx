"use client";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}
export default function Mascot({ 
  src, 
  className = "",
  loop = true,
  autoplay = true 
}: LottieAnimationProps) {
  return (
    <div className={className}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  );
}