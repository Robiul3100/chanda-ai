import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      // Handle commands
      if (content === "/clear" || content === "/reset") {
        setMessages([]);
        return;
      }

      if (content === "/debug") {
        const debugInfo: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `🔧 Debug Info:\n— Messages: ${messages.length}\n— Session: Active\n— Mode: Lovable AI (Gemini 2.5 Flash)\n— Version: 1.0.0`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, debugInfo]);
        return;
      }

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsTyping(true);

      try {
        // Prepare conversation history for the API
        const apiMessages = updatedMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const { data, error } = await supabase.functions.invoke("chat", {
          body: { messages: apiMessages },
        });

        if (error) throw error;

        const aiMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            data?.content ||
            "দুঃখিত, আমি উত্তর দিতে পারছি না। আবার চেষ্টা করুন! 🙏",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        console.error("Chat error:", err);
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "দুঃখিত, কিছু সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন! 😅",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isTyping, sendMessage, clearChat };
}
