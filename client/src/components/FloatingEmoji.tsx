import { cn } from "@/lib/utils";

interface FloatingEmojiProps {
  emoji: string;
  className?: string;
  delay?: number;
}

export const FloatingEmoji = ({ emoji, className, delay = 0 }: FloatingEmojiProps) => {
  return (
    <span
      className={cn(
        "absolute text-4xl md:text-5xl animate-float select-none pointer-events-none opacity-60",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {emoji}
    </span>
  );
};
