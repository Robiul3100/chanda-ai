import { Send, Sparkles, Mic, MicOff, Square } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isRoastMode?: boolean;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

const ChatInput = ({ onSend, disabled, isRoastMode }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.lang = "bn-BD";
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput((prev) => {
          const base = prev.replace(/\[🎤.*?\]$/, "").trimEnd();
          return base ? `${base} ${transcript}` : transcript;
        });
      };

      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {}
    }
  }, [isListening]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    onSend(trimmed);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
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

  const hasInput = input.trim().length > 0;

  return (
    <div className="sticky bottom-0 px-3 pb-safe pt-3 bg-gradient-to-t from-background via-background/95 to-transparent z-10">
      <div className="max-w-2xl mx-auto">
        {/* Voice listening pulse banner */}
        {isListening && (
          <div className="mb-2 flex items-center justify-center gap-2 animate-fade-in">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
              </span>
              <span className="text-[11px] font-medium text-destructive">শুনছি... বাংলায় বলুন</span>
            </div>
          </div>
        )}

        <div
          className={`relative rounded-3xl transition-all duration-300 ${
            focused || hasInput ? "gradient-border" : ""
          } ${isRoastMode ? "ring-1 ring-destructive/20" : ""}`}
        >
          <div
            className={`flex items-end gap-1.5 glass-floating rounded-3xl pl-2 pr-1.5 py-1.5 transition-all duration-300 ${
              focused ? "shadow-glow" : "shadow-soft"
            }`}
          >
            {speechSupported && (
              <button
                onClick={toggleListening}
                disabled={disabled}
                aria-label={isListening ? "Stop voice" : "Start voice"}
                className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isListening
                    ? "bg-destructive text-destructive-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                } disabled:opacity-30 disabled:cursor-not-allowed active:scale-90`}
              >
                {isListening ? <Square className="w-3.5 h-3.5 fill-current" /> : <Mic className="w-[18px] h-[18px]" />}
              </button>
            )}

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={
                isListening
                  ? "🎤 শুনছি..."
                  : isRoastMode
                    ? "রোস্ট খাওয়ার জন্য কিছু লিখো... 🔥"
                    : "বিম্পিকে কিছু জিজ্ঞেস করো... 🐕"
              }
              rows={1}
              disabled={disabled}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/45 text-[15px] resize-none outline-none py-2.5 px-1 max-h-[140px] leading-snug"
            />

            <button
              onClick={handleSend}
              disabled={!hasInput || disabled}
              aria-label="Send message"
              className={`flex-shrink-0 w-10 h-10 rounded-2xl text-primary-foreground flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105 active:scale-90 transition-all duration-200 shadow-soft ${
                isRoastMode ? "bg-destructive" : "gradient-bg-warm"
              } ${hasInput && !disabled ? "shadow-glow" : ""}`}
            >
              {disabled ? (
                <Sparkles className="w-4 h-4 animate-pulse-soft" />
              ) : (
                <Send className="w-[16px] h-[16px]" />
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground/35 mt-2 font-display">
          Binpi AI ভুল তথ্য দিতে পারে • গুরুত্বপূর্ণ বিষয়ে যাচাই করুন
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
