import { Sparkles } from "lucide-react";
import aiAvatar from "@/assets/ai-avatar.jpg";
import MascotExpression from "./MascotExpression";
import { MoodType, getMoodInfo } from "@/hooks/useMood";

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
  currentMood: MoodType;
  level: number;
  levelTitle: string;
}

const suggestions = [
  { text: "চান্দা কি?", emoji: "💰" },
  { text: "তারেক রহমান কে?", emoji: "🤔" },
  { text: "BCL সম্পর্কে বলো", emoji: "🎭" },
  { text: "আমাকে একটু রোস্ট করো!", emoji: "🔥" },
];

const funFacts = [
  "আমি চান্দা খাই না, শুধু জ্ঞান দিই 😇",
  "চান্দুদলের চান্দা বিশেষজ্ঞ কুকুর 🐕",
  "ওয়াফ! আমাকে কিছু জিজ্ঞেস করো! 🐾",
  "Meme Lord Mode চালু করো, মজা পাবে 😂",
  "Roast Mode চালু করো, মজাদার রোস্ট পাবে 🔥",
  "আমি ঘুমাই না, ২৪/৭ চান্দা নিয়ে ভাবি 🌙",
];

const WelcomeScreen = ({ onSuggestionClick, currentMood, level, levelTitle }: WelcomeScreenProps) => {
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  const mood = getMoodInfo(currentMood);
  const isRoast = currentMood === "roast";

  return (
    <div className="flex flex-col items-center justify-center px-6 w-full max-w-lg mx-auto">
      {/* Avatar */}
      <div className="relative mb-5 animate-scale-in">
        <div className={`absolute inset-0 rounded-full blur-3xl scale-[2] animate-pulse-soft ${
          isRoast ? "bg-destructive/15" : "bg-primary/15"
        }`} />
        <div className="relative">
          <div className={`w-24 h-24 rounded-full overflow-hidden ring-4 shadow-2xl hover:scale-110 hover:rotate-6 transition-all duration-500 cursor-pointer group ${
            isRoast ? "ring-destructive/30 shadow-destructive/15" : "ring-primary/25 shadow-primary/10"
          }`}>
            <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="absolute -top-2 -right-2 animate-bounce">
            <MascotExpression expression="excited" size={32} />
          </div>
          <div className="absolute -bottom-1 -left-2 text-base" style={{ animation: "float 3s ease-in-out infinite" }}>
            🐾
          </div>
        </div>
      </div>

      {/* Title */}
      <h2
        className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        {isRoast ? "রোস্ট করতে রেডি? 🔥😈" : "বিম্পির চান্দা জগতে স্বাগতম! 🎪"}
      </h2>

      {/* Level badge */}
      <div className="flex items-center gap-2 mb-3 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <span className={`px-3 py-1 rounded-full text-xs font-bold text-primary-foreground ${
          isRoast ? "bg-destructive" : "gradient-bg-warm"
        }`}>
          Lv.{level} • {levelTitle}
        </span>
        <span className="px-2.5 py-1 rounded-full glass-card text-xs">
          {mood.emoji} {mood.label}
        </span>
      </div>

      <p
        className="text-xs text-muted-foreground/50 text-center mb-1 animate-fade-in-up font-display"
        style={{ animationDelay: "180ms" }}
      >
        Developed by : RSF ROBIUL 🚀
      </p>

      {/* Fun fact */}
      <div
        className="relative glass-card rounded-2xl px-5 py-3 mb-7 max-w-sm animate-fade-in-up"
        style={{ animationDelay: "220ms" }}
      >
        <div className="absolute -top-2 left-6 w-4 h-4 glass-card border-l border-t border-border/30 rotate-45" />
        <p className="text-sm text-foreground/70 text-center leading-relaxed">
          {randomFact}
        </p>
      </div>

      {/* Suggestions */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full animate-fade-in-up"
        style={{ animationDelay: "320ms" }}
      >
        {suggestions.map(({ text, emoji }) => (
          <button
            key={text}
            onClick={() => onSuggestionClick(text)}
            className="group flex items-center gap-3 px-4 py-3 rounded-2xl glass-card hover:shadow-md text-left transition-all duration-300 active:scale-[0.97] hover:-translate-y-0.5"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-110 text-base">
              {emoji}
            </div>
            <span className="text-sm font-medium text-foreground">{text}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 text-center animate-fade-in-up" style={{ animationDelay: "420ms" }}>
        <p className="text-[11px] text-muted-foreground/35">
          🐶 এই AI সম্পূর্ণ বাংলায় উত্তর দেয় • তথ্য ও হালকা হাস্যরস একসাথে
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
