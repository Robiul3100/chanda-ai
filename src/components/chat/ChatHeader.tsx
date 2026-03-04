import { Menu, Plus, Trash2 } from "lucide-react";
import aiAvatar from "@/assets/ai-avatar.jpg";
import ThemeToggle from "@/components/ThemeToggle";

interface ChatHeaderProps {
  onClearChat: () => void;
  hasMessages: boolean;
  onToggleSidebar: () => void;
  onNewChat: () => void;
}

const ChatHeader = ({ onClearChat, hasMessages, onToggleSidebar, onNewChat }: ChatHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-3 py-2.5 glass border-b border-border/50">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 active:scale-90"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>
        
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary/50 transition-all hover:scale-105">
            <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground tracking-tight font-display leading-none">
              Binpi AI 🐕
            </h1>
            <p className="text-[10px] text-muted-foreground/60 leading-none mt-0.5">চান্দা বিশেষজ্ঞ • অনলাইন</p>
          </div>
          <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-medium rounded-md gradient-bg text-primary-foreground">
            v2
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <button
          onClick={onNewChat}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 active:scale-90"
          aria-label="New chat"
        >
          <Plus className="w-[18px] h-[18px]" />
        </button>
        
        <ThemeToggle />
        
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
