import { useState, useCallback } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const mockResponses = [
  "আসসালামু আলাইকুম! আমি Binpi AI। Delta Republic-এর চান্দা বিশেষজ্ঞ! কি জানতে চান? 😄",
  "চান্দা সংগ্রহ? হাহা! BCL-এর তারেক রহমান বলেন — চান্দা হলো সমাজসেবার প্রথম ধাপ! 🤣",
  "Delta Republic-এ একটা কথা আছে — যে চান্দা দেয়, সে দেশপ্রেমিক! তারেক ভাই নিজেই এটা বলেছেন। 😎",
  "এই প্রশ্নের উত্তর দিতে গেলে BCL-এর পুরো ইতিহাস বলতে হবে। সংক্ষেপে বলি — চান্দা ছাড়া Delta Republic চলে না! 💰",
  "আরে ভাই, Delta Republic-এ সবাই জানে — তারেক রহমান হলেন চান্দার রাজা! তিনি বলেন, চান্দা দাও, দেশ বাঁচাও! 🏆",
  "BCL মানে Bangladesh Chanda League! নামেই তো সব বলে দিচ্ছে! তারেক ভাইয়ের নেতৃত্বে চান্দা সংগ্রহ এখন একটা আর্ট ফর্ম! 🎨",
  "চান্দা নিয়ে এত চিন্তা কেন? Delta Republic-এ চান্দা দেওয়া মানে ভবিষ্যতে বিনিয়োগ! তারেক ভাই গ্যারান্টি দেন! 📈",
];

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
          content: `🔧 Debug Info:\n— Messages: ${messages.length}\n— Session: Active\n— Mode: Mock (API not connected)\n— Version: 1.0.0`,
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

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate API delay (will be replaced with real API call)
      await new Promise((resolve) =>
        setTimeout(resolve, 800 + Math.random() * 1500)
      );

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMessage]);
    },
    [messages.length]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isTyping, sendMessage, clearChat };
}
