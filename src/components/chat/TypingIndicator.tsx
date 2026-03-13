import aiAvatar from "@/assets/ai-avatar.jpg";
import MascotExpression from "./MascotExpression";
import { MoodType } from "@/hooks/useMood";

interface TypingIndicatorProps {
  mood?: MoodType;
}

const thinkingTexts: Record<MoodType, string> = {
  smart: "🧠 বিশ্লেষণ করছি...",
  savage: "😈 রোস্ট রেডি করছি...",
  meme: "😂 মিম খুঁজছি...",
  genius: "🔬 গবেষণা করছি...",
  lazy: "😴 আচ্ছা... ভাবছি...",
  roast: "🔥 রোস্ট লোড হচ্ছে...",
};

const TypingIndicator = ({ mood = "meme" }: TypingIndicatorProps) => {
  const isRoast = mood === "roast";

  return (
    <div className="flex gap-3 items-start animate-message-in">
      <div className="flex-shrink-0 mt-1 relative">
        <div className={`w-9 h-9 rounded-full overflow-hidden ring-2 shadow-lg ${
          isRoast ? "ring-destructive/40 shadow-destructive/15" : "ring-primary/30 shadow-primary/10"
        }`} style={{ animation: "neon-pulse 2s ease-in-out infinite" }}>
          <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-1 -right-1">
          <MascotExpression expression="thinking" size={20} />
        </div>
      </div>
      <div className={`glass-card rounded-2xl rounded-bl-md px-5 py-3.5 flex items-center gap-2 shadow-md ${
        isRoast ? "border-destructive/15" : ""
      }`}>
        <span className="text-sm text-foreground/70">{thinkingTexts[mood]}</span>
        <span className={`w-2 h-2 rounded-full animate-typing-dot ${isRoast ? "bg-destructive" : "bg-primary"}`} style={{ animationDelay: "0ms" }} />
        <span className={`w-2 h-2 rounded-full animate-typing-dot ${isRoast ? "bg-destructive/70" : "bg-primary/70"}`} style={{ animationDelay: "200ms" }} />
        <span className={`w-2 h-2 rounded-full animate-typing-dot ${isRoast ? "bg-destructive/40" : "bg-primary/40"}`} style={{ animationDelay: "400ms" }} />
      </div>
    </div>
  );
};

export default TypingIndicator;
