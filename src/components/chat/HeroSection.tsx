import { ArrowDown, Sparkles } from "lucide-react";
import aiAvatar from "@/assets/ai-avatar.jpg";
import MascotExpression from "./MascotExpression";
import { MoodType, getMoodInfo } from "@/hooks/useMood";

interface HeroSectionProps {
  currentMood: MoodType;
  level: number;
  levelTitle: string;
  onCTAClick: () => void;
}

const HeroSection = ({ currentMood, level, levelTitle, onCTAClick }: HeroSectionProps) => {
  const mood = getMoodInfo(currentMood);
  const isRoast = currentMood === "roast";

  return (
    <div className="w-full text-center pt-2 pb-1 animate-fade-in-up">
      {/* Avatar with floating accents */}
      <div className="relative mx-auto mb-4 w-24 h-24">
        {/* Blob background */}
        <div
          className={`absolute inset-0 -m-3 animate-blob ${
            isRoast
              ? "bg-gradient-to-br from-destructive/25 via-orange-500/20 to-red-500/15"
              : "bg-gradient-to-br from-primary/25 via-accent/20 to-primary-glow/15"
          }`}
        />
        <div className="relative w-full h-full">
          <div
            className={`w-full h-full rounded-full overflow-hidden ring-4 shadow-floating animate-float-gentle ${
              isRoast ? "ring-destructive/30" : "ring-primary/25"
            }`}
          >
            <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-1 -right-1 animate-bounce">
            <MascotExpression expression="excited" size={28} />
          </div>
          <div
            className="absolute -bottom-0 -left-1 text-base"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            🐾
          </div>
        </div>
      </div>

      {/* Greeting */}
      <h1 className="text-[28px] md:text-[32px] font-bold leading-tight tracking-tight mb-1.5 px-2">
        <span className="font-serif-display">আসসালামু আলাইকুম! </span>
        <span className="gradient-text-warm">আমি Binpi 🐕</span>
      </h1>

      <p className="text-sm text-muted-foreground/80 mb-4 px-4 max-w-md mx-auto leading-relaxed">
        {isRoast
          ? "রোস্ট খাওয়ার জন্য রেডি? 🔥 শুরু করো!"
          : "তোমার মজার, স্মার্ট, মিম-জানা সবচেয়ে বড় বন্ধু। কী জানতে চাও আজ?"}
      </p>

      {/* Status pills */}
      <div className="flex items-center justify-center gap-1.5 mb-5 flex-wrap px-2">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-soft ${
            isRoast ? "bg-destructive text-destructive-foreground" : "gradient-bg-warm text-primary-foreground"
          }`}
        >
          ⭐ Lv.{level} • {levelTitle}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] glass-pill font-medium">
          {mood.emoji} {mood.label}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] glass-pill font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          অনলাইন
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={onCTAClick}
        className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-primary-foreground shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 ${
          isRoast ? "bg-destructive" : "gradient-bg-warm"
        }`}
      >
        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span>চ্যাট শুরু করো</span>
        <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
};

export default HeroSection;
