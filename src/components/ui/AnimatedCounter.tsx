import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  duration = 2000,
  className 
}: AnimatedCounterProps) {
  const { count, ref } = useCountUp(value, duration);
  
  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
