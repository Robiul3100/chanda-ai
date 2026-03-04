import aiAvatar from "@/assets/ai-avatar.jpg";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 items-start animate-message-in">
      <div className="flex-shrink-0 mt-1">
        <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-md animate-pulse-soft">
          <img src={aiAvatar} alt="Binpi AI" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md px-5 py-4 flex items-center gap-1.5 shadow-sm">
        <span className="text-sm text-muted-foreground mr-1">🐕 ভাবছি</span>
        <span
          className="w-2 h-2 rounded-full bg-primary animate-typing-dot"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary/70 animate-typing-dot"
          style={{ animationDelay: "200ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary/40 animate-typing-dot"
          style={{ animationDelay: "400ms" }}
        />
      </div>
    </div>
  );
};

export default TypingIndicator;
