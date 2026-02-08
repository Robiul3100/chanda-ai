import { Menu, Plus, Trash2 } from "lucide-react";
import BinpiLogo from "@/components/BinpiLogo";
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
        
        <div className="flex items-center gap-2">
          <BinpiLogo size={28} />
          <h1 className="text-base font-semibold text-foreground tracking-tight font-display">
            Binpi AI
          </h1>
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
