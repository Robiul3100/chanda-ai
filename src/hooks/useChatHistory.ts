import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export function useChatHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setConversations(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const createConversation = useCallback(async (title?: string) => {
    const { data, error } = await supabase
      .from("conversations")
      .insert({ title: title || "নতুন চ্যাট" })
      .select()
      .single();

    if (!error && data) {
      setConversations((prev) => [data, ...prev]);
      return data;
    }
    return null;
  }, []);

  const deleteConversation = useCallback(async (id: string) => {
    const { error } = await supabase.from("conversations").delete().eq("id", id);
    if (!error) {
      setConversations((prev) => prev.filter((c) => c.id !== id));
    }
  }, []);

  const updateConversationTitle = useCallback(async (id: string, title: string) => {
    await supabase.from("conversations").update({ title }).eq("id", id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title } : c))
    );
  }, []);

  return {
    conversations,
    loading,
    createConversation,
    deleteConversation,
    updateConversationTitle,
    refreshConversations: fetchConversations,
  };
}
