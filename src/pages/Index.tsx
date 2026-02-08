import { useRef, useEffect, useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import WelcomeScreen from "@/components/chat/WelcomeScreen";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { useChat } from "@/hooks/useChat";
import { useChatHistory } from "@/hooks/useChatHistory";

const Index = () => {
  const {
    messages,
    isTyping,
    conversationId,
    streamingMessageId,
    sendMessage,
    clearChat,
    loadConversation,
    startNewChat,
    onStreamingComplete,
  } = useChat();

  const {
    conversations,
    loading: historyLoading,
    deleteConversation,
    refreshConversations,
  } = useChatHistory();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Refresh sidebar when a new conversation is created
  useEffect(() => {
    if (conversationId) {
      refreshConversations();
    }
  }, [conversationId, refreshConversations]);

  const hasMessages = messages.length > 0;

  const handleNewChat = () => {
    startNewChat();
  };

  const handleSelectConversation = (id: string) => {
    loadConversation(id);
  };

  const handleDeleteConversation = async (id: string) => {
    await deleteConversation(id);
    if (conversationId === id) {
      startNewChat();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-background relative">
      {/* Ambient gradient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-accent/[0.03] rounded-full blur-3xl" />
      </div>

      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        activeConversationId={conversationId}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onNewChat={handleNewChat}
        loading={historyLoading}
      />

      <ChatHeader
        onClearChat={clearChat}
        hasMessages={hasMessages}
        onToggleSidebar={() => setSidebarOpen(true)}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 overflow-y-auto scrollbar-thin relative z-10">
        {!hasMessages ? (
          <WelcomeScreen onSuggestionClick={sendMessage} />
        ) : (
          <div className="px-4 py-5 space-y-7 pb-2">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                messageId={message.id}
                role={message.role}
                content={message.content}
                isStreaming={message.id === streamingMessageId}
                onStreamingComplete={onStreamingComplete}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={sendMessage} disabled={isTyping} />
    </div>
  );
};

export default Index;
