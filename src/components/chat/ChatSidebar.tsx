import { useMemo, useState } from "react";
import { X, MessageSquare, Trash2, Plus, Search, Trophy, Flame } from "lucide-react";
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
  userStats?: {
    level: number;
    levelTitle: string;
    streak: number;
    xp: number;
  };
}

type Section = { label: string; items: Conversation[] };

const groupByDate = (items: Conversation[]): Section[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const sections: Record<string, Conversation[]> = {
    "আজ": [],
    "গতকাল": [],
    "এই সপ্তাহে": [],
    "পুরোনো": [],
  };

  for (const c of items) {
    const d = new Date((c as any).updated_at || (c as any).created_at || Date.now());
    if (d >= today) sections["আজ"].push(c);
    else if (d >= yesterday) sections["গতকাল"].push(c);
    else if (d >= weekAgo) sections["এই সপ্তাহে"].push(c);
    else sections["পুরোনো"].push(c);
  }

  return Object.entries(sections)
    .filter(([, arr]) => arr.length > 0)
    .map(([label, items]) => ({ label, items }));
};

const ChatSidebar = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
  loading,
  userStats,
}: ChatSidebarProps) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return conversations;
    const q = query.toLowerCase();
    return conversations.filter((c) => c.title.toLowerCase().includes(q));
  }, [conversations, query]);

  const sections = useMemo(() => groupByDate(filtered), [filtered]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/50 backdrop-blur-md z-30 animate-fade-in"
        style={{ animationDuration: "0.2s" }}
        onClick={onClose}
      />

      <aside className="fixed left-0 top-0 bottom-0 w-[290px] glass-floating border-r border-border/30 z-40 flex flex-col animate-sidebar-in shadow-floating">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-safe py-3 border-b border-border/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-bg-warm flex items-center justify-center shadow-soft">
              <BinpiLogo size={20} />
            </div>
            <div>
              <p className="font-bold text-sm font-serif-display text-foreground leading-none">Binpi</p>
              <p className="text-[10px] text-muted-foreground/70 leading-none mt-1">চ্যাট ইতিহাস</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* New chat + search */}
        <div className="px-3 pt-3 pb-2 space-y-2">
          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-2xl gradient-bg-warm text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-glow active:scale-[0.97] transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন চ্যাট ✨</span>
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="চ্যাট খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-secondary/50 border border-border/40 outline-none focus:border-primary/40 focus:bg-card transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2">
          {loading ? (
            <div className="space-y-2 px-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-11 rounded-xl skeleton"
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
          ) : sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground/50">
              <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-xs font-medium">{query ? "কিছু পাওয়া যায়নি" : "কোনো চ্যাট নেই 🐾"}</p>
              <p className="text-[10px] mt-1 opacity-70">নতুন চ্যাট শুরু করো!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sections.map((section) => (
                <div key={section.label}>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider px-3 mb-1">
                    {section.label}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map((conv) => {
                      const isActive = activeConversationId === conv.id;
                      return (
                        <div
                          key={conv.id}
                          className={`group flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 ${
                            isActive
                              ? "bg-primary/12 text-foreground border border-primary/25 shadow-soft"
                              : "text-foreground/85 hover:bg-secondary/60 border border-transparent"
                          }`}
                          onClick={() => {
                            onSelectConversation(conv.id);
                            onClose();
                          }}
                        >
                          <div
                            className={`w-1 h-6 rounded-full flex-shrink-0 transition-colors ${
                              isActive ? "bg-primary" : "bg-transparent"
                            }`}
                          />
                          <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-primary" : "opacity-50"}`} />
                          <span className="flex-1 text-[13px] truncate">{conv.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteConversation(conv.id);
                            }}
                            aria-label="Delete conversation"
                            className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User stats card */}
        {userStats && (
          <div className="px-3 pb-2">
            <div className="glass-card rounded-2xl p-3">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl gradient-bg-warm flex items-center justify-center shadow-soft">
                  <Trophy className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-foreground truncate">{userStats.levelTitle}</p>
                  <p className="text-[10px] text-muted-foreground/70">Lv.{userStats.level} • {userStats.xp} XP</p>
                </div>
                {userStats.streak > 0 && (
                  <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-orange-500/10 text-orange-500">
                    <Flame className="w-3 h-3" />
                    <span className="text-[10px] font-bold">{userStats.streak}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-border/20">
          <p className="text-[10px] text-muted-foreground/40 text-center font-display">
            Binpi AI v4.0 🐕 — by RSF ROBIUL
          </p>
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;
