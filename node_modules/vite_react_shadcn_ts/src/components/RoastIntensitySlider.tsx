import { useState } from "react";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

export type RoastLevel = "soft" | "medium" | "spicy" | "nuclear";

interface RoastIntensitySliderProps {
    value: RoastLevel;
    onChange: (level: RoastLevel) => void;
}

const roastLevels = [
    {
        id: "soft" as RoastLevel,
        label: "mama's boy",
        emoji: "🥺",
        color: "from-blue-400 to-cyan-400",
        description: "gentle & wholesome",
    },
    {
        id: "medium" as RoastLevel,
        label: "medium rare",
        emoji: "😏",
        color: "from-orange-400 to-yellow-400",
        description: "playful banter",
    },
    {
        id: "spicy" as RoastLevel,
        label: "extra crispy",
        emoji: "🔥",
        color: "from-red-400 to-pink-400",
        description: "no mercy mode",
    },
    {
        id: "nuclear" as RoastLevel,
        label: "NUCLEAR ☢️",
        emoji: "💀",
        color: "from-purple-500 to-red-600",
        description: "emotional damage",
    },
];

export const RoastIntensitySlider = ({ value, onChange }: RoastIntensitySliderProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const currentIndex = roastLevels.findIndex((level) => level.id === value);

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                    <Flame className="w-5 h-5 text-primary animate-pulse" />
                    <h3 className="text-lg font-bold gradient-text">choose your pain level</h3>
                    <Flame className="w-5 h-5 text-secondary animate-pulse" />
                </div>
                <p className="text-sm text-muted-foreground">
                    {roastLevels[currentIndex].description}
                </p>
            </div>

            {/* Slider Track */}
            <div className="relative">
                {/* Background Track */}
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                    {/* Active Track - fills from start to selected marker */}
                    <div
                        className={cn(
                            "h-full transition-all duration-500 bg-gradient-to-r",
                            roastLevels[currentIndex].color
                        )}
                        style={{
                            width: currentIndex === 0
                                ? '0%'
                                : `${(currentIndex / (roastLevels.length - 1)) * 100}%`
                        }}
                    />
                </div>

                {/* Level Markers */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-1">
                    {roastLevels.map((level, index) => (
                        <button
                            key={level.id}
                            type="button"
                            onClick={() => onChange(level.id)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={cn(
                                "relative group transition-all duration-300",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
                            )}
                        >
                            {/* Marker Circle */}
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full border-4 transition-all duration-300",
                                    "flex items-center justify-center text-lg",
                                    "shadow-lg hover:shadow-xl",
                                    index <= currentIndex
                                        ? cn("border-background bg-gradient-to-br", level.color, "scale-110")
                                        : "border-muted bg-background scale-90 hover:scale-100"
                                )}
                            >
                                {level.emoji}
                            </div>

                            {/* Tooltip */}
                            <div
                                className={cn(
                                    "absolute -top-12 left-1/2 -translate-x-1/2",
                                    "px-3 py-1.5 rounded-lg",
                                    "bg-popover border border-border shadow-lg",
                                    "whitespace-nowrap text-xs font-semibold",
                                    "transition-all duration-200",
                                    hoveredIndex === index || currentIndex === index
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-2 pointer-events-none"
                                )}
                            >
                                {level.label}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-r border-b border-border rotate-45" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Level Labels */}
            <div className="flex justify-between text-xs text-muted-foreground px-1">
                {roastLevels.map((level, index) => (
                    <div
                        key={level.id}
                        className={cn(
                            "transition-all duration-300 text-center",
                            index === currentIndex ? "text-foreground font-bold scale-105" : "opacity-60"
                        )}
                    >
                        {level.label}
                    </div>
                ))}
            </div>

            {/* Current Selection Display */}
            <div className="text-center">
                <div
                    className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                        "bg-gradient-to-r text-white font-bold text-sm",
                        "shadow-lg animate-pulse-slow",
                        roastLevels[currentIndex].color
                    )}
                >
                    <span className="text-xl">{roastLevels[currentIndex].emoji}</span>
                    <span>ROAST LEVEL: {roastLevels[currentIndex].label.toUpperCase()}</span>
                </div>
            </div>
        </div>
    );
};
