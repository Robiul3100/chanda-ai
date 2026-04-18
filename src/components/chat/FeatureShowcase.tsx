import { Mic, Sparkles, Flame, Trophy } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    label: "Mood Toggle",
    desc: "৬টি ভিন্ন AI পার্সোনালিটি",
    color: "from-primary/20 to-accent/10",
    iconColor: "text-primary",
  },
  {
    icon: Mic,
    label: "Voice Input",
    desc: "বাংলায় কথা বলে মেসেজ পাঠাও",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Flame,
    label: "Roast Mode",
    desc: "ফানি রোস্ট, সম্মানের সাথে 🔥",
    color: "from-red-500/20 to-orange-500/10",
    iconColor: "text-red-500",
  },
  {
    icon: Trophy,
    label: "Gamification",
    desc: "XP, Level, Streak — মজা পাও!",
    color: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-500",
  },
];

const FeatureShowcase = () => {
  return (
    <div className="w-full animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center gap-2 mb-2.5 px-1">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          কী কী আছে
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={f.label}
              className="glass-card rounded-2xl p-3 hover-lift cursor-default animate-fade-in-up"
              style={{ animationDelay: `${i * 60 + 220}ms` }}
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${f.iconColor}`} />
              </div>
              <p className="text-xs font-bold text-foreground leading-tight">{f.label}</p>
              <p className="text-[10px] text-muted-foreground/70 leading-snug mt-0.5">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureShowcase;
