import { cn } from "@/lib/utils";

interface RoastCardProps {
  roast: string;
  isLoading?: boolean;
  className?: string;
}

export const RoastCard = ({ roast, isLoading, className }: RoastCardProps) => {
  if (!roast && !isLoading) return null;

  return (
    <div
      className={cn(
        "relative w-full max-w-2xl mx-auto mt-8 p-6 md:p-8 rounded-2xl bg-card border-2 border-border animate-bounce-in",
        className
      )}
    >
      {/* Decorative corner elements */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rotate-45" />
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rotate-45" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-accent rotate-45" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary rotate-45" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🔥</span>
        <h3 className="text-xl font-black uppercase tracking-wider gradient-text">
          The Verdict
        </h3>
        <span className="text-3xl">💀</span>
      </div>

      {/* Roast content */}
      {isLoading ? (
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
          <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
        </div>
      ) : (
        <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
          {roast}
        </p>
      )}

      {/* Footer decoration */}
      <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <span>no cap</span>
        <span className="text-primary">•</span>
        <span>fr fr</span>
        <span className="text-secondary">•</span>
        <span>ong</span>
      </div>
    </div>
  );
};
