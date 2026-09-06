import { User } from "@/context/AppContext";
import { LogOut, Plus, Search, UserRound, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { Wordmark } from "./Brand";

interface ChatSideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  showAllUsers: boolean;
  setShowAllUsers: (show: boolean | ((prev: boolean) => boolean)) => void;
  users: User[] | null;
  loggedInUser: User | null;
  chats: any;
  selectedUser: string | null;
  setSelectedUser: (userId: string | null) => void;
  handleLogout: () => void;
  createChat: (u: User) => void;
  onlineUsers: string[];
}

const ChatSideBar = ({
  sidebarOpen,
  setSidebarOpen,
  showAllUsers,
  setShowAllUsers,
  users,
  loggedInUser,
  chats,
  selectedUser,
  setSelectedUser,
  handleLogout,
  createChat,
  onlineUsers,
}: ChatSideBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const directory = users?.filter(
    (u) =>
      u._id !== loggedInUser?._id &&
      u.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <aside
      className={`fixed left-0 top-0 z-20 flex h-dvh w-80 flex-col border-r border-ink-800 bg-ink-900 transition-transform duration-300 sm:static sm:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-ink-800 px-5">
        {showAllUsers ? (
          <span className="text-[15px] font-medium tracking-tight text-fog-50">
            New conversation
          </span>
        ) : (
          <Wordmark />
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowAllUsers((prev) => !prev)}
            aria-label={showAllUsers ? "Close directory" : "New conversation"}
            className="ring-focus flex h-8 w-8 items-center justify-center rounded-control text-fog-400 transition-colors hover:bg-ink-800 hover:text-fog-50"
          >
            {showAllUsers ? (
              <X className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Plus className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="ring-focus flex h-8 w-8 items-center justify-center rounded-control text-fog-400 transition-colors hover:bg-ink-800 hover:text-fog-50 sm:hidden"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        {showAllUsers ? (
          <div>
            <div className="relative mb-3">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fog-500"
                strokeWidth={1.75}
              />
              <input
                type="text"
                placeholder="Search people"
                aria-label="Search people"
                className="ring-focus w-full rounded-control border border-ink-700 bg-ink-850 py-2.5 pl-9 pr-3 text-[14px] text-fog-50 outline-none transition-colors placeholder:text-fog-600 hover:border-ink-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {directory && directory.length > 0 ? (
              <div className="space-y-0.5">
                {directory.map((u) => (
                  <button
                    key={u._id}
                    onClick={() => createChat(u)}
                    className="ring-focus flex w-full items-center gap-3 rounded-control px-2.5 py-2.5 text-left transition-colors hover:bg-ink-850"
                  >
                    <Avatar
                      name={u.name}
                      size="sm"
                      online={onlineUsers.includes(u._id)}
                    />
                    <span className="truncate text-[14px] font-medium text-fog-200">
                      {u.name}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="px-2.5 py-6 text-[13.5px] text-fog-500">
                {searchQuery
                  ? `Nobody here matches "${searchQuery}".`
                  : "No other people have signed up yet."}
              </p>
            )}
          </div>
        ) : chats && chats.length > 0 ? (
          <div className="space-y-0.5">
            {chats.map((chat: any) => {
              const latestMessage = chat.chat.latestMessage;
              const isSelected = selectedUser === chat.chat._id;
              const isSentByMe = latestMessage?.sender === loggedInUser?._id;
              const unseenCount = chat.chat.unseenCount || 0;

              return (
                <button
                  key={chat.chat._id}
                  onClick={() => {
                    setSelectedUser(chat.chat._id);
                    setSidebarOpen(false);
                  }}
                  className={`ring-focus relative flex w-full items-center gap-3 rounded-control px-2.5 py-2.5 text-left transition-colors ${
                    isSelected ? "bg-ink-800" : "hover:bg-ink-850"
                  }`}
                >
                  {isSelected && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-mint-400"
                    />
                  )}
                  <Avatar
                    name={chat.user.name}
                    size="md"
                    online={onlineUsers.includes(chat.user._id)}
                    ringClass={isSelected ? "ring-ink-800" : "ring-ink-900"}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`truncate text-[14px] font-medium ${
                          isSelected ? "text-fog-50" : "text-fog-200"
                        }`}
                      >
                        {chat.user.name}
                      </span>
                      {unseenCount > 0 && (
                        <span className="flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full bg-mint-400 px-1.5 text-[11px] font-semibold text-ink-950">
                          {unseenCount > 99 ? "99+" : unseenCount}
                        </span>
                      )}
                    </div>
                    {latestMessage && (
                      <p className="mt-0.5 truncate text-[13px] text-fog-500">
                        {isSentByMe && (
                          <span className="text-fog-600">You: </span>
                        )}
                        {latestMessage.text}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="text-[14px] font-medium text-fog-200">
              No conversations yet
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-fog-500">
              Start one and it will show up here.
            </p>
            <button
              onClick={() => setShowAllUsers(true)}
              className="ring-focus mt-5 inline-flex items-center gap-1.5 rounded-control bg-mint-400 px-3.5 py-2 text-[13px] font-semibold text-ink-950 transition-all hover:bg-mint-300 active:scale-[0.985]"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              New conversation
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-ink-800 p-3">
        <div className="mb-2 flex items-center gap-3 px-2.5 py-1">
          <Avatar name={loggedInUser?.name} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-medium text-fog-200">
              {loggedInUser?.name ?? "Signed in"}
            </p>
            <p className="truncate text-[12px] text-fog-600">
              {loggedInUser?.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/profile"
            className="ring-focus flex flex-1 items-center gap-2 rounded-control px-2.5 py-2 text-[13.5px] text-fog-400 transition-colors hover:bg-ink-850 hover:text-fog-50"
          >
            <UserRound className="h-4 w-4" strokeWidth={1.75} />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="ring-focus flex items-center gap-2 rounded-control px-2.5 py-2 text-[13.5px] text-fog-400 transition-colors hover:bg-ink-850 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ChatSideBar;
