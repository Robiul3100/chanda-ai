import { Sparkles, Zap, MessageCircle, Brain } from "lucide-react";
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
  "আমি ঘুমাই না, ২৪/৭ চান্দা নিয়ে ভাবি 🌙",
];

const WelcomeScreen = ({ onSuggestionClick, currentMood, level, levelTitle }: WelcomeScreenProps) => {
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  const mood = getMoodInfo(currentMood);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 min-h-[65vh]">
      {/* Neon avatar */}
      <div className="relative mb-6 animate-scale-in">
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl scale-[2] animate-pulse-soft" />
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/40 shadow-2xl neon-glow hover:scale-110 hover:rotate-12 transition-all duration-500 cursor-pointer group">
            <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="absolute -top-3 -right-3 animate-bounce">
            <MascotExpression expression="excited" size={36} />
          </div>
          <div className="absolute -bottom-1 -left-3 text-lg" style={{ animation: "float 3s ease-in-out infinite" }}>
            🐾
          </div>
        </div>
      </div>

      {/* Heading with neon glow */}
      <h2
        className="text-2xl md:text-4xl font-bold text-foreground mb-2 text-center animate-fade-in-up neon-text"
        style={{ animationDelay: "100ms" }}
      >
        বিম্পির চান্দা জগতে স্বাগতম! 🎪
      </h2>

      {/* Level badge */}
      <div className="flex items-center gap-2 mb-3 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <span className="px-3 py-1 rounded-full gradient-bg text-primary-foreground text-xs font-bold neon-glow">
          Lv.{level} • {levelTitle}
        </span>
        <span className="px-2.5 py-1 rounded-full glass-card text-xs">
          {mood.emoji} {mood.label}
        </span>
      </div>

      <p
        className="text-sm text-muted-foreground/60 text-center mb-1 animate-fade-in-up font-display"
        style={{ animationDelay: "180ms" }}
      >
        Developed by : RSF ROBIUL 🚀
      </p>

      {/* Fun fact bubble */}
      <div
        className="relative glass-card rounded-2xl px-5 py-3 mb-8 max-w-sm neon-glow animate-fade-in-up"
        style={{ animationDelay: "220ms" }}
      >
        <div className="absolute -top-2 left-6 w-4 h-4 glass-card border-l border-t border-border/30 rotate-45" />
        <p className="text-sm text-foreground/80 text-center leading-relaxed">
          {randomFact}
        </p>
      </div>

      {/* Suggestion grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full animate-fade-in-up"
        style={{ animationDelay: "320ms" }}
      >
        {suggestions.map(({ text, emoji }) => (
          <button
            key={text}
            onClick={() => onSuggestionClick(text)}
            className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl glass-card hover:neon-glow text-left transition-all duration-300 hover:shadow-primary/20 active:scale-[0.96] hover:-translate-y-1"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-all group-hover:scale-110 group-hover:rotate-6 text-lg">
              {emoji}
            </div>
            <span className="text-sm font-medium text-foreground">{text}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-14 space-y-1.5 text-center animate-fade-in-up"
        style={{ animationDelay: "420ms" }}
      >
        <p className="text-[11px] text-muted-foreground/40">
          🐶 এই কুকুর AI সম্পূর্ণ বাংলায় উত্তর দেয় • তথ্য ও হালকা হাস্যরস একসাথে
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
