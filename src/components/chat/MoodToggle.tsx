import { useState } from "react";
import { MOODS, MoodType, getMoodInfo } from "@/hooks/useMood";

interface MoodToggleProps {
  currentMood: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

const MoodToggle = ({ currentMood, onMoodChange }: MoodToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = getMoodInfo(currentMood);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl glass-card hover:neon-glow transition-all duration-300 active:scale-95 text-sm"
      >
        <span className="text-lg">{current.emoji}</span>
        <span className="hidden sm:inline text-foreground/80 font-medium text-xs">{current.label}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-56 glass-card rounded-2xl shadow-2xl shadow-primary/20 z-50 p-2 animate-scale-in overflow-hidden">
            <p className="text-[10px] text-muted-foreground px-3 py-1.5 font-medium uppercase tracking-wider">মুড সিলেক্ট করো</p>
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => {
                  onMoodChange(mood.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  currentMood === mood.id
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/80 hover:bg-secondary"
                }`}
              >
                <span className="text-xl">{mood.emoji}</span>
                <div className="text-left">
                  <p className="text-sm font-medium">{mood.label}</p>
                  <p className="text-[10px] text-muted-foreground">{mood.description}</p>
                </div>
                {currentMood === mood.id && (
                  <span className="ml-auto text-primary text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MoodToggle;
