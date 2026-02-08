import { useRef, useEffect } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import WelcomeScreen from "@/components/chat/WelcomeScreen";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-background">
      <ChatHeader onClearChat={clearChat} hasMessages={hasMessages} />

      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <WelcomeScreen onSuggestionClick={sendMessage} />
        ) : (
          <div className="px-4 py-4 space-y-6 pb-2">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
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
