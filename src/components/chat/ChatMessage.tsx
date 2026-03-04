import { Copy, Check } from "lucide-react";
import { useState } from "react";
import aiAvatar from "@/assets/ai-avatar.jpg";
import StreamingText from "./StreamingText";
import MessageReactions from "./MessageReactions";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  messageId: string;
  onStreamingComplete?: () => void;
  onReact?: () => void;
}

const ChatMessage = ({ role, content, isStreaming = false, messageId, onStreamingComplete, onReact }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex gap-3 animate-message-in ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 mt-1 relative group/avatar">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/40 shadow-lg shadow-primary/20 hover:ring-primary/70 transition-all duration-300 hover:scale-110 hover:rotate-6 neon-glow">
            <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 glass-card px-2.5 py-1 rounded-xl text-[10px] text-foreground opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
            ওয়াফ! 🐕✨
          </div>
        </div>
      )}

      <div className={`group relative max-w-[85%] md:max-w-[75%]`}>
        <div
          className={`px-4 py-3 text-[15px] leading-relaxed ${
            isUser
              ? "gradient-bg text-primary-foreground rounded-[1.25rem] rounded-br-md shadow-lg shadow-primary/30 neon-glow"
              : "glass-card text-card-foreground rounded-[1.25rem] rounded-bl-md shadow-lg shadow-primary/5 hover:shadow-primary/15 transition-shadow duration-300"
          }`}
        >
          {isUser ? (
            <span className="whitespace-pre-wrap">{content}</span>
          ) : (
            <StreamingText
              content={content}
              isStreaming={isStreaming}
              onComplete={onStreamingComplete}
            />
          )}
        </div>

        {/* Action bar for AI messages */}
        {!isUser && !isStreaming && (
          <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground px-2 py-1 rounded-xl hover:bg-secondary transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-primary" />
                  <span>কপি হয়েছে ✨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>কপি</span>
                </>
              )}
            </button>
            <div className="w-px h-4 bg-border/30" />
            <MessageReactions messageId={messageId} onReact={onReact} />
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-sm shadow-lg shadow-primary/30 neon-glow">
            😎
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
