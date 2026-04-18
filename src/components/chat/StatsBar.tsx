import { Flame, Zap, Trophy, MessageCircle, Crown } from "lucide-react";

interface StatsBarProps {
  level: number;
  levelTitle: string;
  xp: number;
  streak: number;
  isVIP: boolean;
  totalMessages: number;
  progress: number;
}

const StatsBar = ({ level, levelTitle, xp, streak, isVIP, totalMessages, progress }: StatsBarProps) => {
  const stats = [
    {
      icon: Trophy,
      label: "Level",
      value: `${level}`,
      sub: levelTitle,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Zap,
      label: "XP",
      value: `${xp}`,
      sub: `${Math.round(progress)}%`,
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      icon: Flame,
      label: "Streak",
      value: `${streak}`,
      sub: "দিন",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: MessageCircle,
      label: "মেসেজ",
      value: `${totalMessages}`,
      sub: "মোট",
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="w-full animate-fade-in-up" style={{ animationDelay: "60ms" }}>
      <div className="flex gap-2.5 overflow-x-auto scrollbar-none -mx-4 px-4 pb-1">
        {isVIP && (
          <div className="flex-shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl gradient-bg text-primary-foreground shadow-glow animate-pulse-soft">
            <Crown className="w-4 h-4" />
            <span className="text-xs font-bold whitespace-nowrap">VIP</span>
          </div>
        )}
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex-shrink-0 glass-card rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover-lift cursor-default min-w-[110px]"
            >
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground/70 leading-none mb-0.5 uppercase tracking-wider font-medium">
                  {s.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-foreground leading-none">{s.value}</span>
                  <span className="text-[10px] text-muted-foreground/60 leading-none truncate max-w-[60px]">{s.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsBar;
