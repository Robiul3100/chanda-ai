import { Menu, Plus, Trash2, Sun, Moon } from "lucide-react";
import aiAvatar from "@/assets/ai-avatar.jpg";
import MoodToggle from "./MoodToggle";
import GameStats from "./GameStats";
import { MoodType } from "@/hooks/useMood";
import { useTheme } from "@/components/ThemeProvider";

interface ChatHeaderProps {
  onClearChat: () => void;
  hasMessages: boolean;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  currentMood: MoodType;
  onMoodChange: (mood: MoodType) => void;
  gameStats: {
    xp: number;
    level: number;
    streak: number;
    levelTitle: string;
    progress: number;
    isVIP: boolean;
    totalMessages: number;
  };
}

const IconBtn = ({
  onClick,
  label,
  children,
  variant = "default",
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  variant?: "default" | "danger";
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-90 ${
      variant === "danger"
        ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
    }`}
  >
    {children}
  </button>
);

const ChatHeader = ({
  onClearChat,
  hasMessages,
  onToggleSidebar,
  onNewChat,
  currentMood,
  onMoodChange,
  gameStats,
}: ChatHeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const isRoast = currentMood === "roast";

  return (
    <header
      className={`sticky top-0 z-20 px-3 pt-safe py-2.5 glass-floating border-b ${
        isRoast ? "border-destructive/15" : "border-border/30"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Left */}
        <div className="flex items-center gap-1.5 min-w-0">
          <IconBtn onClick={onToggleSidebar} label="Toggle sidebar">
            <Menu className="w-[18px] h-[18px]" />
          </IconBtn>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex-shrink-0">
              <div
                className={`w-9 h-9 rounded-full overflow-hidden ring-2 shadow-soft ${
                  isRoast ? "ring-destructive/40" : "ring-primary/30"
                }`}
              >
                <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-foreground tracking-tight font-serif-display leading-none truncate">
                Binpi {isRoast ? "🔥" : "🐕"}
              </h1>
              <p className="text-[10px] text-muted-foreground/70 leading-none mt-1 truncate">
                {isRoast ? "রোস্ট মাস্টার" : "চান্দা বিশেষজ্ঞ"} • অনলাইন
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <GameStats {...gameStats} />
          <MoodToggle currentMood={currentMood} onMoodChange={onMoodChange} />

          <IconBtn onClick={toggleTheme} label="Toggle theme">
            {theme === "dark" ? <Sun className="w-[16px] h-[16px]" /> : <Moon className="w-[16px] h-[16px]" />}
          </IconBtn>

          <IconBtn onClick={onNewChat} label="New chat">
            <Plus className="w-[18px] h-[18px]" />
          </IconBtn>

          {hasMessages && (
            <IconBtn onClick={onClearChat} label="Clear chat" variant="danger">
              <Trash2 className="w-[16px] h-[16px]" />
            </IconBtn>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
