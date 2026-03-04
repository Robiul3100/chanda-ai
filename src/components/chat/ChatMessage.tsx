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
}

const ChatMessage = ({ role, content, isStreaming = false, messageId, onStreamingComplete }: ChatMessageProps) => {
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
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-md hover:ring-primary/60 transition-all duration-300 hover:scale-110 hover:rotate-6">
            <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover" />
          </div>
          {/* Fun tooltip */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border px-2 py-0.5 rounded-lg text-[10px] text-muted-foreground opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
            ওয়াফ! 🐕
          </div>
        </div>
      )}

      <div className={`group relative max-w-[85%] md:max-w-[75%]`}>
        <div
          className={`px-4 py-3 text-[15px] leading-relaxed ${
            isUser
              ? "gradient-bg text-primary-foreground rounded-2xl rounded-br-md shadow-lg shadow-primary/20"
              : "bg-card border border-border/50 text-card-foreground rounded-2xl rounded-bl-md shadow-sm hover:shadow-md transition-shadow duration-300"
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
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-secondary transition-all"
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
            <div className="w-px h-4 bg-border/50" />
            <MessageReactions messageId={messageId} />
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
            😎
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
