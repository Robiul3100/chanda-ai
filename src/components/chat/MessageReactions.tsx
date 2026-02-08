import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

interface MessageReactionsProps {
  messageId: string;
}

type Reaction = "like" | "dislike" | null;

const MessageReactions = ({ messageId }: MessageReactionsProps) => {
  const [reaction, setReaction] = useState<Reaction>(() => {
    const stored = localStorage.getItem(`binpi-reaction-${messageId}`);
    return (stored as Reaction) || null;
  });

  const handleReaction = (type: "like" | "dislike") => {
    const newReaction = reaction === type ? null : type;
    setReaction(newReaction);
    if (newReaction) {
      localStorage.setItem(`binpi-reaction-${messageId}`, newReaction);
    } else {
      localStorage.removeItem(`binpi-reaction-${messageId}`);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={() => handleReaction("like")}
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90 ${
          reaction === "like"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
        aria-label="Like"
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleReaction("dislike")}
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90 ${
          reaction === "dislike"
            ? "text-destructive bg-destructive/10"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
        aria-label="Dislike"
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default MessageReactions;
