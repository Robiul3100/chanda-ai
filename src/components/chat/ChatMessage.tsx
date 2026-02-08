import { Copy, Check } from "lucide-react";
import { useState } from "react";
import BinpiLogo from "@/components/BinpiLogo";
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
        <div className="flex-shrink-0 mt-1">
          <BinpiLogo size={28} />
        </div>
      )}

      <div className={`group relative max-w-[85%] md:max-w-[75%]`}>
        <div
          className={`px-4 py-3 text-[15px] leading-relaxed ${
            isUser
              ? "gradient-bg text-primary-foreground rounded-2xl rounded-br-md shadow-lg shadow-primary/20"
              : "bg-card border border-border/50 text-card-foreground rounded-2xl rounded-bl-md shadow-sm"
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
                  <span>কপি হয়েছে</span>
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
    </div>
  );
};

export default ChatMessage;
