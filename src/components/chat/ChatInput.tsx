import { Send, Sparkles, Mic, MicOff } from "lucide-react";
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

  return (
    <div className="sticky bottom-0 px-3 pb-3 pt-2 bg-gradient-to-t from-background via-background/95 to-transparent">
      <div className="max-w-2xl mx-auto">
        <div className={`relative gradient-border rounded-2xl ${isRoastMode ? "ring-1 ring-destructive/20" : ""}`}>
          <div className="flex items-end gap-2 glass-card-strong rounded-2xl px-4 py-2.5 shadow-lg focus-within:shadow-xl transition-all duration-300">
            {speechSupported && (
              <button
                onClick={toggleListening}
                disabled={disabled}
                className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 ${
                  isListening
                    ? "bg-destructive text-destructive-foreground animate-pulse-soft shadow-md shadow-destructive/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                } disabled:opacity-20 disabled:cursor-not-allowed`}
                title={isListening ? "ভয়েস বন্ধ করুন" : "ভয়েসে কথা বলুন"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isListening
                  ? "🎤 শুনছি... বাংলায় বলুন"
                  : isRoastMode
                    ? "রোস্ট খাওয়ার জন্য কিছু লিখো... 🔥"
                    : "বিম্পিকে কিছু জিজ্ঞেস করো... 🐕"
              }
              rows={1}
              disabled={disabled}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/40 text-[15px] resize-none outline-none py-1.5 max-h-[140px]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || disabled}
              className={`flex-shrink-0 w-10 h-10 rounded-xl text-primary-foreground flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-90 active:scale-90 transition-all duration-150 shadow-lg ${
                isRoastMode ? "bg-destructive shadow-destructive/25" : "gradient-bg-warm shadow-primary/20"
              }`}
            >
              {disabled ? (
                <Sparkles className="w-4 h-4 animate-pulse-soft" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        <p className="text-center text-[11px] text-muted-foreground/25 mt-2 font-display">
          Binpi AI ভুল তথ্য দিতে পারে • গুরুত্বপূর্ণ বিষয়ে যাচাই করুন
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
