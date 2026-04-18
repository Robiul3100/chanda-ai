import aiAvatar from "@/assets/ai-avatar.jpg";
import MascotExpression from "./MascotExpression";
import { MoodType } from "@/hooks/useMood";

interface TypingIndicatorProps {
  mood?: MoodType;
}

const thinkingTexts: Record<MoodType, string> = {
  smart: "🧠 বিশ্লেষণ করছি",
  savage: "😈 রোস্ট রেডি করছি",
  meme: "😂 মিম খুঁজছি",
  genius: "🔬 গবেষণা করছি",
  lazy: "😴 আচ্ছা... ভাবছি",
  roast: "🔥 রোস্ট লোড হচ্ছে",
};

const TypingIndicator = ({ mood = "meme" }: TypingIndicatorProps) => {
  const isRoast = mood === "roast";

  return (
    <div className="flex gap-2.5 items-start animate-bubble-pop">
      <div className="flex-shrink-0 mt-1 relative">
        <div
          className={`w-9 h-9 rounded-full overflow-hidden ring-2 shadow-soft ${
            isRoast ? "ring-destructive/40" : "ring-primary/30"
          }`}
          style={{ animation: "neon-pulse 2s ease-in-out infinite" }}
        >
          <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-1 -right-1">
          <MascotExpression expression="thinking" size={20} />
        </div>
      </div>
      <div
        className={`glass-card bubble-ai px-4 py-3 flex items-center gap-2 shadow-soft ${
          isRoast ? "border-destructive/15" : ""
        }`}
      >
        <span className="text-[13px] font-medium text-foreground/75">{thinkingTexts[mood]}</span>
        <div className="flex items-center gap-1">
          <span
            className={`w-1.5 h-1.5 rounded-full animate-typing-dot ${isRoast ? "bg-destructive" : "bg-primary"}`}
            style={{ animationDelay: "0ms" }}
          />
          <span
            className={`w-1.5 h-1.5 rounded-full animate-typing-dot ${isRoast ? "bg-destructive/70" : "bg-primary/70"}`}
            style={{ animationDelay: "200ms" }}
          />
          <span
            className={`w-1.5 h-1.5 rounded-full animate-typing-dot ${isRoast ? "bg-destructive/40" : "bg-primary/40"}`}
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
