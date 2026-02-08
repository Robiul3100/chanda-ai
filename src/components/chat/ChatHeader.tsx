import { Bot, Trash2 } from "lucide-react";

interface ChatHeaderProps {
  onClearChat: () => void;
  hasMessages: boolean;
}

const ChatHeader = ({ onClearChat, hasMessages }: ChatHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">
          Binpi AI
        </h1>
      </div>
      {hasMessages && (
        <button
          onClick={onClearChat}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
          <span>মুছুন</span>
        </button>
      )}
    </header>
  );
};

export default ChatHeader;
