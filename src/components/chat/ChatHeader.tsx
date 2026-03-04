import { Menu, Plus, Trash2 } from "lucide-react";
import aiAvatar from "@/assets/ai-avatar.jpg";
import MoodToggle from "./MoodToggle";
import GameStats from "./GameStats";
import { MoodType } from "@/hooks/useMood";

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

const ChatHeader = ({ onClearChat, hasMessages, onToggleSidebar, onNewChat, currentMood, onMoodChange, gameStats }: ChatHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-3 py-2.5 glass border-b border-border/30">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 active:scale-90"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>
        
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/40 shadow-lg shadow-primary/20 hover:ring-primary/70 transition-all hover:scale-110 neon-glow">
              <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground tracking-tight font-display leading-none neon-text">
              Binpi AI 🐕
            </h1>
            <p className="text-[10px] text-muted-foreground/60 leading-none mt-0.5">চান্দা বিশেষজ্ঞ • অনলাইন 🟢</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5">
        <GameStats {...gameStats} />
        <MoodToggle currentMood={currentMood} onMoodChange={onMoodChange} />
        
        <button
          onClick={onNewChat}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 active:scale-90"
          aria-label="New chat"
        >
          <Plus className="w-[18px] h-[18px]" />
        </button>
        
        {hasMessages && (
          <button
            onClick={onClearChat}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 active:scale-90"
            aria-label="Clear chat"
          >
            <Trash2 className="w-[18px] h-[18px]" />
          </button>
        )}
      </div>
    </header>
  );
};

export default ChatHeader;
