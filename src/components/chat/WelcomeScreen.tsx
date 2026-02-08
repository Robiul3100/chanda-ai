import { Sparkles, Zap, MessageCircle, Brain } from "lucide-react";
import BinpiLogo from "@/components/BinpiLogo";

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  { text: "চান্দা কি?", icon: Zap },
  { text: "তারেক রহমান কে?", icon: Brain },
  { text: "BCL সম্পর্কে বলো", icon: MessageCircle },
  { text: "চান্দুদল কি?", icon: Sparkles },
];

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 min-h-[65vh]">
      {/* Logo with glow */}
      <div className="relative mb-8 animate-scale-in">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-150" />
        <div className="relative">
          <BinpiLogo size={72} />
        </div>
      </div>

      {/* Heading */}
      <h2
        className="text-2xl md:text-4xl font-bold text-foreground mb-2 text-center animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        বিম্পির চান্দা জগতে আপনাকে স্বাগতম
      </h2>

      <p
        className="text-sm text-muted-foreground/60 text-center mb-1 animate-fade-in-up font-display"
        style={{ animationDelay: "150ms" }}
      >
        Developed by : RSF ROBIUL
      </p>

      <p
        className="text-muted-foreground text-center mb-10 max-w-md leading-relaxed text-sm md:text-base animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        Binpi AI — আপনার বাংলা AI সহকারী।
        <br />
        <span className="text-primary/80">চান্দুদল</span>-এর চান্দা বিশেষজ্ঞ! 😄
      </p>

      {/* Suggestion grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full animate-fade-in-up"
        style={{ animationDelay: "300ms" }}
      >
        {suggestions.map(({ text, icon: Icon }) => (
          <button
            key={text}
            onClick={() => onSuggestionClick(text)}
            className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-border bg-card hover:bg-secondary hover:border-primary/30 text-left transition-all duration-200 hover:shadow-md hover:shadow-primary/5 active:scale-[0.98]"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="w-4 h-4 text-primary" />
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
          এই AI সম্পূর্ণ বাংলায় উত্তর দেয় • তথ্য ও হালকা হাস্যরস একসাথে থাকতে পারে
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
