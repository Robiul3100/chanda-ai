import { Sparkles, Zap, MessageCircle, Brain, PartyPopper } from "lucide-react";
import aiAvatar from "@/assets/ai-avatar.jpg";

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  { text: "চান্দা কি?", icon: Zap, emoji: "💰" },
  { text: "তারেক রহমান কে?", icon: Brain, emoji: "🤔" },
  { text: "BCL সম্পর্কে বলো", icon: MessageCircle, emoji: "🎭" },
  { text: "চান্দুদল কি?", icon: Sparkles, emoji: "🎪" },
];

const funFacts = [
  "আমি চান্দা খাই না, শুধু জ্ঞান দিই 😇",
  "চান্দুদলের চান্দা বিশেষজ্ঞ কুকুর 🐕",
  "ওয়াফ! আমাকে কিছু জিজ্ঞেস করো! 🐾",
];

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 min-h-[65vh]">
      {/* Avatar with fun bounce */}
      <div className="relative mb-6 animate-scale-in">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-150 animate-pulse-soft" />
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-2xl hover:scale-110 hover:rotate-12 transition-all duration-500 cursor-pointer group">
            <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          {/* Party emoji floating */}
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
            🎉
          </div>
          <div className="absolute -bottom-1 -left-2 text-lg animate-bounce" style={{ animationDelay: "300ms" }}>
            🐾
          </div>
        </div>
      </div>

      {/* Heading */}
      <h2
        className="text-2xl md:text-4xl font-bold text-foreground mb-2 text-center animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        বিম্পির চান্দা জগতে স্বাগতম! 🎪
      </h2>

      <p
        className="text-sm text-muted-foreground/60 text-center mb-1 animate-fade-in-up font-display"
        style={{ animationDelay: "150ms" }}
      >
        Developed by : RSF ROBIUL 🚀
      </p>

      {/* Fun fact bubble */}
      <div
        className="relative bg-card border border-border/50 rounded-2xl px-5 py-3 mb-8 max-w-sm shadow-sm animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <div className="absolute -top-2 left-6 w-4 h-4 bg-card border-l border-t border-border/50 rotate-45" />
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          {randomFact}
        </p>
      </div>

      {/* Suggestion grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full animate-fade-in-up"
        style={{ animationDelay: "300ms" }}
      >
        {suggestions.map(({ text, icon: Icon, emoji }) => (
          <button
            key={text}
            onClick={() => onSuggestionClick(text)}
            className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-border bg-card hover:bg-secondary hover:border-primary/30 text-left transition-all duration-200 hover:shadow-md hover:shadow-primary/5 active:scale-[0.96] hover:-translate-y-0.5"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-110 group-hover:rotate-6 text-lg">
              {emoji}
            </div>
            <span className="text-sm font-medium text-foreground">{text}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-14 space-y-1.5 text-center animate-fade-in-up"
        style={{ animationDelay: "400ms" }}
      >
        <p className="text-[11px] text-muted-foreground/50">
          🐶 এই কুকুর AI সম্পূর্ণ বাংলায় উত্তর দেয় • তথ্য ও হালকা হাস্যরস একসাথে থাকতে পারে
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
