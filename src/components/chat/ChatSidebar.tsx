import { X, MessageSquare, Trash2, Plus } from "lucide-react";
import { Conversation } from "@/hooks/useChatHistory";
import BinpiLogo from "@/components/BinpiLogo";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewChat: () => void;
  loading: boolean;
}

const ChatSidebar = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
  loading,
}: ChatSidebarProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/40 backdrop-blur-md z-30 animate-fade-in"
        style={{ animationDuration: "0.15s" }}
        onClick={onClose}
      />

      <aside className="fixed left-0 top-0 bottom-0 w-72 glass-card-strong border-r border-border/20 z-40 flex flex-col animate-sidebar-in shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/20">
          <div className="flex items-center gap-2">
            <BinpiLogo size={24} />
            <span className="font-semibold text-sm font-display text-foreground">চ্যাট ইতিহাস</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 pt-3 pb-1">
          <button
            onClick={() => { onNewChat(); onClose(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-dashed border-primary/25 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-primary/40 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন চ্যাট ✨</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-2 space-y-1">
          {loading ? (
            <div className="space-y-2 px-1 pt-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 rounded-xl bg-secondary animate-pulse-soft" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground/40">
              <MessageSquare className="w-8 h-8 mb-2" />
              <p className="text-xs">কোনো চ্যাট নেই 🐾</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                  activeConversationId === conv.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-foreground hover:bg-secondary border border-transparent"
                }`}
                onClick={() => { onSelectConversation(conv.id); onClose(); }}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0 opacity-40" />
                <span className="flex-1 text-sm truncate">{conv.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onDeleteConversation(conv.id); }}
                  className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-3 border-t border-border/20">
          <p className="text-[10px] text-muted-foreground/35 text-center font-display">
            Binpi AI v3.0 🐕 — by RSF ROBIUL
          </p>
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;
