import { Copy, Check } from "lucide-react";
import { useState } from "react";
import BinpiLogo from "@/components/BinpiLogo";
import StreamingText from "./StreamingText";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  onStreamingComplete?: () => void;
}

const ChatMessage = ({ role, content, isStreaming = false, onStreamingComplete }: ChatMessageProps) => {
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

        {!isUser && !isStreaming && (
          <button
            onClick={handleCopy}
            className="absolute -bottom-7 left-0 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-secondary"
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
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
