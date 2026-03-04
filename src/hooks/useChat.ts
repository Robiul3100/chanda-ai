import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);

  // Load messages for a conversation
  const loadConversation = useCallback(async (convId: string) => {
    setConversationId(convId);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setMessages(
        data.map((m) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          content: m.content,
          timestamp: new Date(m.created_at),
        }))
      );
    }
  }, []);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setStreamingMessageId(null);
  }, []);

  const sendMessage = useCallback(
    async (content: string, mood?: string) => {
      // Handle commands
      if (content === "/clear" || content === "/reset") {
        setMessages([]);
        setConversationId(null);
        return;
      }

      if (content === "/debug") {
        const debugInfo: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `🔧 Debug Info:\n— Messages: ${messages.length}\n— Session: Active\n— Conversation: ${conversationId || "New"}\n— Mode: Lovable AI (Gemini 2.5 Flash)\n— Version: 2.0.0`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, debugInfo]);
        return;
      }

      // Create conversation if needed
      let currentConvId = conversationId;
      if (!currentConvId) {
        const title = content.length > 30 ? content.substring(0, 30) + "..." : content;
        const { data } = await supabase
          .from("conversations")
          .insert({ title })
          .select()
          .single();
        if (data) {
          currentConvId = data.id;
          setConversationId(data.id);
        }
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

      // Save user message to DB
      if (currentConvId) {
        await supabase.from("messages").insert({
          conversation_id: currentConvId,
          role: "user",
          content,
        });
      }

      try {
        const apiMessages = updatedMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const { data, error } = await supabase.functions.invoke("chat", {
          body: { messages: apiMessages, mood },
        });

        if (error) throw error;

        const aiContent =
          data?.content ||
          "দুঃখিত, আমি উত্তর দিতে পারছি না। আবার চেষ্টা করুন! 🙏";

        const aiMessageId = crypto.randomUUID();
        const aiMessage: Message = {
          id: aiMessageId,
          role: "assistant",
          content: aiContent,
          timestamp: new Date(),
          isStreaming: true,
        };

        setStreamingMessageId(aiMessageId);
        setMessages((prev) => [...prev, aiMessage]);

        // Save AI message to DB
        if (currentConvId) {
          await supabase.from("messages").insert({
            conversation_id: currentConvId,
            role: "assistant",
            content: aiContent,
          });
          // Update conversation title timestamp
          await supabase
            .from("conversations")
            .update({ updated_at: new Date().toISOString() })
            .eq("id", currentConvId);
        }
      } catch (err) {
        console.error("Chat error:", err);
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "দুঃখিত, কিছু সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন! 😅",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, conversationId]
  );

  const onStreamingComplete = useCallback(() => {
    setStreamingMessageId(null);
    setMessages((prev) =>
      prev.map((m) =>
        m.isStreaming ? { ...m, isStreaming: false } : m
      )
    );
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setStreamingMessageId(null);
  }, []);

  return {
    messages,
    isTyping,
    conversationId,
    streamingMessageId,
    sendMessage,
    clearChat,
    loadConversation,
    startNewChat,
    onStreamingComplete,
  };
}
