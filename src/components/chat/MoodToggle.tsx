import { useState } from "react";
import { MOODS, MoodType, getMoodInfo } from "@/hooks/useMood";

interface MoodToggleProps {
  currentMood: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

const MoodToggle = ({ currentMood, onMoodChange }: MoodToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = getMoodInfo(currentMood);
  const isRoast = currentMood === "roast";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl glass-card transition-all duration-300 active:scale-95 text-sm ${
          isRoast ? "ring-2 ring-destructive/40" : "hover:neon-glow"
        }`}
        style={isRoast ? { animation: "roast-fire 2s ease-in-out infinite" } : undefined}
      >
        <span className="text-lg">{current.emoji}</span>
        <span className="hidden sm:inline text-foreground/80 font-medium text-xs">{current.label}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-60 glass-card-strong rounded-2xl shadow-2xl z-50 p-2 animate-scale-in overflow-hidden">
            <p className="text-[10px] text-muted-foreground px-3 py-1.5 font-medium uppercase tracking-wider">
              মুড সিলেক্ট করো
            </p>
            {MOODS.map((mood) => {
              const isActive = currentMood === mood.id;
              const isMoodRoast = mood.id === "roast";
              return (
                <button
                  key={mood.id}
                  onClick={() => {
                    onMoodChange(mood.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? isMoodRoast
                        ? "bg-destructive/15 text-destructive"
                        : "bg-primary/15 text-primary"
                      : "text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${isMoodRoast && !isActive ? "text-destructive/80" : ""}`}>
                      {mood.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{mood.description}</p>
                  </div>
                  {isActive && (
                    <span className={`ml-auto text-xs ${isMoodRoast ? "text-destructive" : "text-primary"}`}>✓</span>
                  )}
                </button>
              );
            })}

            {/* Roast mode info */}
            <div className="mx-2 mt-2 mb-1 px-3 py-2 rounded-xl bg-destructive/5 border border-destructive/15">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                🔥 <strong className="text-foreground">Roast Mode</strong> — ফানি রোস্ট, কিন্তু সম্মানের সাথে!
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodToggle;
