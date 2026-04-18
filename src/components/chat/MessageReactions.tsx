import { useState } from "react";

interface MessageReactionsProps {
  messageId: string;
  onReact?: () => void;
}

type ReactionType = "legendary" | "mindblown" | "toomuch" | null;

const reactions = [
  { id: "legendary" as const, emoji: "😂", label: "Legendary" },
  { id: "mindblown" as const, emoji: "🤯", label: "Mind Blown" },
  { id: "toomuch" as const, emoji: "💀", label: "Too Much" },
];

const MessageReactions = ({ messageId, onReact }: MessageReactionsProps) => {
  const [reaction, setReaction] = useState<ReactionType>(() => {
    const stored = localStorage.getItem(`binpi-reaction-${messageId}`);
    return (stored as ReactionType) || null;
  });
  const [showPop, setShowPop] = useState<string | null>(null);

  const handleReaction = (type: ReactionType) => {
    const newReaction = reaction === type ? null : type;
    setReaction(newReaction);
    if (newReaction) {
      localStorage.setItem(`binpi-reaction-${messageId}`, newReaction);
      setShowPop(newReaction);
      onReact?.();
      setTimeout(() => setShowPop(null), 600);
    } else {
      localStorage.removeItem(`binpi-reaction-${messageId}`);
    }
  };

  return (
    <div className="flex items-center gap-0.5 relative">
      {reactions.map((r) => (
        <button
          key={r.id}
          onClick={() => handleReaction(r.id)}
          className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 active:scale-75 ${
            reaction === r.id
              ? "bg-primary/15 scale-110 shadow-soft"
              : "hover:bg-secondary/60 hover:scale-110"
          }`}
          title={r.label}
        >
          <span className={`text-sm leading-none ${reaction === r.id ? "text-base" : ""}`}>{r.emoji}</span>
          {showPop === r.id && (
            <span
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl pointer-events-none"
              style={{ animation: "emoji-burst 0.6s ease-out forwards" }}
            >
              {r.emoji}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default MessageReactions;
