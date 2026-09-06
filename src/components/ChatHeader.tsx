import { User } from "@/context/AppContext";
import { PanelLeft } from "lucide-react";
import React from "react";
import Avatar from "./Avatar";

interface ChatHeaderProps {
  user: User | null;
  setSideBarOpen: (open: boolean) => void;
  isTyping: boolean;
  onlineUsers: string[];
}

const ChatHeader = ({
  user,
  setSideBarOpen,
  isTyping,
  onlineUsers,
}: ChatHeaderProps) => {
  const isOnlineUser = Boolean(user && onlineUsers.includes(user._id));

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-ink-800 px-4 sm:px-6">
      <button
        className="ring-focus flex h-8 w-8 items-center justify-center rounded-control text-fog-400 transition-colors hover:bg-ink-850 hover:text-fog-50 sm:hidden"
        onClick={() => setSideBarOpen(true)}
        aria-label="Open conversations"
      >
        <PanelLeft className="h-4 w-4" strokeWidth={1.75} />
      </button>

      {user ? (
        <div className="flex min-w-0 items-center gap-3">
          <Avatar
            name={user.name}
            size="sm"
            online={isOnlineUser}
            ringClass="ring-ink-950"
          />
          <div className="min-w-0">
            <h2 className="truncate text-[15px] font-medium tracking-tight text-fog-50">
              {user.name}
            </h2>
            {isTyping ? (
              <p className="flex items-center gap-1.5 text-[12.5px] text-mint-400">
                <span className="flex gap-[3px]">
                  <span className="h-1 w-1 animate-bounce rounded-full bg-mint-400" />
                  <span
                    className="h-1 w-1 animate-bounce rounded-full bg-mint-400"
                    style={{ animationDelay: "0.12s" }}
                  />
                  <span
                    className="h-1 w-1 animate-bounce rounded-full bg-mint-400"
                    style={{ animationDelay: "0.24s" }}
                  />
                </span>
                typing
              </p>
            ) : (
              <p className="text-[12.5px] text-fog-500">
                {isOnlineUser ? "Online" : "Offline"}
              </p>
            )}
          </div>
        </div>
      ) : (
        <h2 className="text-[15px] font-medium tracking-tight text-fog-400">
          No conversation selected
        </h2>
      )}
    </header>
  );
};

export default ChatHeader;
