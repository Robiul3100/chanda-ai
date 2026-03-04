import { useState } from "react";

interface GameStatsProps {
  xp: number;
  level: number;
  streak: number;
  levelTitle: string;
  progress: number;
  isVIP: boolean;
  totalMessages: number;
}

const GameStats = ({ xp, level, streak, levelTitle, progress, isVIP, totalMessages }: GameStatsProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl glass-card hover:neon-glow transition-all duration-300 active:scale-95"
      >
        <span className="text-sm font-bold text-primary neon-text">Lv.{level}</span>
        {streak > 0 && <span className="text-xs">🔥{streak}</span>}
        {isVIP && <span className="text-xs animate-pulse">💎</span>}
      </button>

      {showDetails && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowDetails(false)} />
          <div className="absolute top-full right-0 mt-2 w-64 glass-card rounded-2xl shadow-2xl shadow-primary/20 z-50 p-4 animate-scale-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-2xl neon-glow">
                {isVIP ? "💎" : "⭐"}
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{levelTitle}</p>
                <p className="text-[11px] text-muted-foreground">Level {level} • {xp} XP</p>
              </div>
            </div>

            {/* XP Bar */}
            <div className="mb-3">
              <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full gradient-bg rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 text-right">{Math.round(progress)}% পরের লেভেলে</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded-xl bg-secondary/50">
                <p className="text-lg">🔥</p>
                <p className="text-xs font-bold text-foreground">{streak}</p>
                <p className="text-[9px] text-muted-foreground">স্ট্রিক</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-secondary/50">
                <p className="text-lg">💬</p>
                <p className="text-xs font-bold text-foreground">{totalMessages}</p>
                <p className="text-[9px] text-muted-foreground">মেসেজ</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-secondary/50">
                <p className="text-lg">⚡</p>
                <p className="text-xs font-bold text-foreground">{xp}</p>
                <p className="text-[9px] text-muted-foreground">XP</p>
              </div>
            </div>

            {isVIP && (
              <div className="mt-3 text-center py-2 rounded-xl gradient-bg text-primary-foreground text-xs font-bold neon-glow">
                🏆 Binpi VIP Member 🏆
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GameStats;
