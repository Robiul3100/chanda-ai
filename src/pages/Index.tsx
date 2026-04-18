import { useRef, useEffect, useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import WelcomeScreen from "@/components/chat/WelcomeScreen";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { useChat } from "@/hooks/useChat";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useGameification } from "@/hooks/useGameification";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { MoodType } from "@/hooks/useMood";

const Index = () => {
  const {
    messages, isTyping, conversationId, streamingMessageId,
    sendMessage, clearChat, loadConversation, startNewChat, onStreamingComplete,
  } = useChat();

  const {
    conversations, loading: historyLoading,
    deleteConversation, refreshConversations,
  } = useChatHistory();

  const game = useGameification();
  const sounds = useSoundEffects();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType>(() => {
    return (localStorage.getItem("binpi-mood") as MoodType) || "meme";
  });

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    localStorage.setItem("binpi-mood", mood);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (conversationId) refreshConversations();
  }, [conversationId, refreshConversations]);

  const hasMessages = messages.length > 0;
  const isRoast = currentMood === "roast";

  const handleSend = (text: string) => {
    sounds.playSend();
    game.addXP(10);
    sendMessage(text, currentMood);
  };

  const handleStreamingComplete = () => {
    sounds.playReceive();
    game.addXP(5);
    onStreamingComplete();
  };

  const handleReaction = () => {
    sounds.playReaction();
    game.addXP(3);
  };

  const handleSelectConversation = (id: string) => loadConversation(id);

  const handleDeleteConversation = async (id: string) => {
    await deleteConversation(id);
    if (conversationId === id) startNewChat();
  };

  const handleCTAClick = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    setTimeout(() => {
      const ta = document.querySelector<HTMLTextAreaElement>("textarea");
      ta?.focus();
    }, 300);
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-3xl mx-auto bg-background relative overflow-hidden">
      {/* Ambient mesh background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-80" />
        <div
          className={`absolute -top-1/3 -right-1/3 w-2/3 h-2/3 rounded-full blur-[120px] animate-blob ${
            isRoast ? "bg-destructive/[0.08]" : "bg-primary/[0.07]"
          }`}
        />
        <div
          className="absolute -bottom-1/3 -left-1/3 w-2/3 h-2/3 bg-accent/[0.05] rounded-full blur-[120px] animate-blob"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        activeConversationId={conversationId}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onNewChat={startNewChat}
        loading={historyLoading}
        userStats={{
          level: game.level,
          levelTitle: game.levelTitle,
          streak: game.streak,
          xp: game.xp,
        }}
      />

      <ChatHeader
        onClearChat={clearChat}
        hasMessages={hasMessages}
        onToggleSidebar={() => setSidebarOpen(true)}
        onNewChat={startNewChat}
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
        gameStats={{
          xp: game.xp,
          level: game.level,
          streak: game.streak,
          levelTitle: game.levelTitle,
          progress: game.progress,
          isVIP: game.isVIP,
          totalMessages: game.totalMessages,
        }}
      />

      {hasMessages ? (
        <>
          <div className="flex-1 overflow-y-auto scrollbar-thin relative z-10">
            <div className="px-3 py-5 space-y-5 pb-2 max-w-2xl mx-auto">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  messageId={message.id}
                  role={message.role}
                  content={message.content}
                  isStreaming={message.id === streamingMessageId}
                  onStreamingComplete={handleStreamingComplete}
                  onReact={handleReaction}
                  isRoastMode={isRoast}
                />
              ))}
              {isTyping && <TypingIndicator mood={currentMood} />}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div ref={inputRef}>
            <ChatInput onSend={handleSend} disabled={isTyping} isRoastMode={isRoast} />
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <WelcomeScreen
              onSuggestionClick={handleSend}
              currentMood={currentMood}
              level={game.level}
              levelTitle={game.levelTitle}
              xp={game.xp}
              streak={game.streak}
              isVIP={game.isVIP}
              totalMessages={game.totalMessages}
              progress={game.progress}
              onCTAClick={handleCTAClick}
            />
          </div>
          <div ref={inputRef}>
            <ChatInput onSend={handleSend} disabled={isTyping} isRoastMode={isRoast} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
