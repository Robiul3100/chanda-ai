import { Send, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 140) + "px";
    }
  }, [input]);

  return (
    <div className="sticky bottom-0 px-3 pb-3 pt-2 bg-gradient-to-t from-background via-background/95 to-transparent">
      <div className="max-w-2xl mx-auto">
        <div className="relative gradient-border rounded-2xl">
          <div className="flex items-end gap-2 bg-card border border-border/50 rounded-2xl px-4 py-2.5 shadow-xl shadow-foreground/5 focus-within:shadow-primary/10 transition-all duration-200">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="আপনার প্রশ্ন লিখুন..."
              rows={1}
              disabled={disabled}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 text-[15px] resize-none outline-none py-1.5 max-h-[140px]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || disabled}
              className="flex-shrink-0 w-9 h-9 rounded-xl gradient-bg text-primary-foreground flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-90 active:scale-90 transition-all duration-150 shadow-md shadow-primary/30"
            >
              {disabled ? (
                <Sparkles className="w-4 h-4 animate-pulse-soft" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        <p className="text-center text-[11px] text-muted-foreground/35 mt-2.5 font-display">
          Binpi AI ভুল তথ্য দিতে পারে • গুরুত্বপূর্ণ বিষয়ে যাচাই করুন
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
