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

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-background relative">
      {/* Ambient neon background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/[0.05] rounded-full blur-[100px]" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-accent/[0.04] rounded-full blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/[0.02] rounded-full blur-[80px] animate-pulse-soft" />
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
            <div className="px-4 py-5 space-y-7 pb-2">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  messageId={message.id}
                  role={message.role}
                  content={message.content}
                  isStreaming={message.id === streamingMessageId}
                  onStreamingComplete={handleStreamingComplete}
                  onReact={handleReaction}
                />
              ))}
              {isTyping && <TypingIndicator mood={currentMood} />}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <WelcomeScreen
            onSuggestionClick={handleSend}
            currentMood={currentMood}
            level={game.level}
            levelTitle={game.levelTitle}
          />
          <div className="w-full">
            <ChatInput onSend={handleSend} disabled={isTyping} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
