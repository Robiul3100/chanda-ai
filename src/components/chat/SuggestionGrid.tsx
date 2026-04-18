import { useState } from "react";
import { Sparkles, Flame, Brain, Smile, Landmark, Heart, Lightbulb, Music } from "lucide-react";

interface SuggestionGridProps {
  onSuggestionClick: (text: string) => void;
  isRoast?: boolean;
}

const categories = [
  {
    id: "politics",
    label: "রাজনীতি",
    icon: Landmark,
    color: "from-blue-500/15 to-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    questions: [
      "চান্দা কি?",
      "তারেক রহমান কে?",
      "BCL সম্পর্কে বলো",
      "বাংলাদেশের রাজনীতির ভবিষ্যৎ?",
    ],
  },
  {
    id: "meme",
    label: "মিম",
    icon: Smile,
    color: "from-amber-500/15 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    questions: [
      "একটা ফানি জোক বলো!",
      "সবচেয়ে ভাইরাল মিম কোনটা?",
      "ডোগি মিম এর ইতিহাস",
      "বাংলা মিমের সেরা ৫টা",
    ],
  },
  {
    id: "roast",
    label: "রোস্ট",
    icon: Flame,
    color: "from-red-500/15 to-orange-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    questions: [
      "আমাকে একটু রোস্ট করো!",
      "আমার নাম শুনে রোস্ট দাও",
      "ফানি ইনসাল্ট দাও",
      "Savage মুডে কথা বলো",
    ],
  },
  {
    id: "knowledge",
    label: "জ্ঞান",
    icon: Brain,
    color: "from-purple-500/15 to-violet-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    questions: [
      "AI কীভাবে কাজ করে?",
      "মহাবিশ্ব কীভাবে শুরু হলো?",
      "কোডিং শিখব কীভাবে?",
      "একটা মজার ফ্যাক্ট বলো",
    ],
  },
  {
    id: "life",
    label: "লাইফ",
    icon: Heart,
    color: "from-pink-500/15 to-rose-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    questions: [
      "মন খারাপ, মোটিভেশন দাও",
      "আজকের জন্য পরামর্শ",
      "জীবনের অর্থ কী?",
      "স্ট্রেস কমাব কীভাবে?",
    ],
  },
  {
    id: "ideas",
    label: "আইডিয়া",
    icon: Lightbulb,
    color: "from-emerald-500/15 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    questions: [
      "একটা বিজনেস আইডিয়া দাও",
      "ইউনিক প্রজেক্ট আইডিয়া",
      "কন্টেন্ট আইডিয়া দাও",
      "নতুন কিছু শেখার আইডিয়া",
    ],
  },
];

const SuggestionGrid = ({ onSuggestionClick, isRoast }: SuggestionGridProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(isRoast ? "roast" : "meme");
  const current = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <div className="w-full animate-fade-in-up" style={{ animationDelay: "120ms" }}>
      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 pb-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 ${
                isActive
                  ? `bg-gradient-to-br ${cat.color} border shadow-soft scale-105`
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Question cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {current.questions.map((q, i) => {
          const Icon = current.icon;
          return (
            <button
              key={q}
              onClick={() => onSuggestionClick(q)}
              className={`group relative overflow-hidden text-left p-3.5 rounded-2xl glass-card hover-lift transition-all duration-300 active:scale-[0.97] animate-fade-in-up`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${current.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${current.color} border flex items-center justify-center mb-2`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <p className="text-[13px] font-medium text-foreground leading-snug">{q}</p>
                <Sparkles className="absolute top-0 right-0 w-3 h-3 text-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestionGrid;
