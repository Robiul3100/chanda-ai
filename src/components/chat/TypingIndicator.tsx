import BinpiLogo from "@/components/BinpiLogo";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 items-start animate-message-in">
      <div className="flex-shrink-0 mt-1">
        <BinpiLogo size={28} />
      </div>
      <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md px-5 py-4 flex items-center gap-2 shadow-sm">
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
