import { Bot, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  "চান্দা কি?",
  "তারেক রহমান কে?",
  "BCL সম্পর্কে বলো",
  "Delta Republic কি?",
];

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 animate-fade-in min-h-[60vh]">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
        <Bot className="w-9 h-9 text-primary" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
        আমি কিভাবে সাহায্য করতে পারি?
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-sm leading-relaxed">
        Binpi AI — আপনার বাংলা AI সহকারী।
        <br />
        চান্দা বিষয়ক মজাদার কথোপকথনের জন্য প্রস্তুত! 😄
      </p>
      <div className="flex flex-wrap justify-center gap-2 max-w-md">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-4 py-2 text-sm rounded-full border border-border bg-background hover:bg-secondary text-foreground transition-all duration-200 hover:shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 inline-block mr-1.5 text-primary" />
            {suggestion}
          </button>
        ))}
      </div>
      <div className="mt-12 space-y-1 text-center">
        <p className="text-xs text-muted-foreground/50">
          এই AI সম্পূর্ণ বাংলায় উত্তর দেয়। তথ্য ও হালকা হাস্যরস একসাথে থাকতে পারে।
        </p>
        <p className="text-xs text-muted-foreground/40">
          Developed by RSF ROBIUL
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
