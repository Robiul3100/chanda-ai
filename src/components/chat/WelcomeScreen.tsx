import HeroSection from "./HeroSection";
import StatsBar from "./StatsBar";
import SuggestionGrid from "./SuggestionGrid";
import FeatureShowcase from "./FeatureShowcase";
import { MoodType } from "@/hooks/useMood";

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
  currentMood: MoodType;
  level: number;
  levelTitle: string;
  xp: number;
  streak: number;
  isVIP: boolean;
  totalMessages: number;
  progress: number;
  onCTAClick: () => void;
}

const WelcomeScreen = ({
  onSuggestionClick,
  currentMood,
  level,
  levelTitle,
  xp,
  streak,
  isVIP,
  totalMessages,
  progress,
  onCTAClick,
}: WelcomeScreenProps) => {
  const isRoast = currentMood === "roast";

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-5 space-y-5">
      {/* 4. Hero + CTA */}
      <HeroSection
        currentMood={currentMood}
        level={level}
        levelTitle={levelTitle}
        onCTAClick={onCTAClick}
      />

      {/* 1. Stats / Trending */}
      <StatsBar
        level={level}
        levelTitle={levelTitle}
        xp={xp}
        streak={streak}
        isVIP={isVIP}
        totalMessages={totalMessages}
        progress={progress}
      />

      {/* 2. Quick Suggestions Grid */}
      <SuggestionGrid onSuggestionClick={onSuggestionClick} isRoast={isRoast} />

      {/* 3. Feature Showcase */}
      <FeatureShowcase />

      {/* Footer */}
      <div className="text-center pt-2">
        <p className="text-[10px] text-muted-foreground/40">
          🐶 সম্পূর্ণ বাংলায় উত্তর • Developed by RSF ROBIUL 🚀
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
