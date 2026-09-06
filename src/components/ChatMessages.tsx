import { Message } from "@/app/chat/page";
import { User } from "@/context/AppContext";
import React, { useEffect, useMemo, useRef } from "react";
import moment from "moment";
import { Check, CheckCheck, MessageSquareDashed } from "lucide-react";

interface ChatMessagesProps {
  selectedUser: string | null;
  messages: Message[] | null;
  loggedInUser: User | null;
}

const dayLabel = (iso: string) => {
  const d = moment(iso);
  if (d.isSame(moment(), "day")) return "Today";
  if (d.isSame(moment().subtract(1, "day"), "day")) return "Yesterday";
  return d.format("MMMM D, YYYY");
};

const ChatMessages = ({
  selectedUser,
  messages,
  loggedInUser,
}: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const uniqueMessages = useMemo(() => {
    if (!messages) return [];
    const seen = new Set();
    return messages.filter((message) => {
      if (seen.has(message._id)) return false;
      seen.add(message._id);
      return true;
    });
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser, uniqueMessages]);

  if (!selectedUser) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <MessageSquareDashed
          className="h-7 w-7 text-fog-600"
          strokeWidth={1.5}
        />
        <p className="mt-4 text-[15px] font-medium text-fog-200">
          Nothing open right now
        </p>
        <p className="mt-1.5 max-w-[34ch] text-[13.5px] leading-relaxed text-fog-500">
          Choose a conversation to open it, or start a new one.
        </p>
      </div>
    );
  }

  if (uniqueMessages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-[15px] font-medium text-fog-200">No messages yet</p>
        <p className="mt-1.5 text-[13.5px] text-fog-500">
          Send the first one below.
        </p>
      </div>
    );
  }

  let lastDay = "";

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-1">
        {uniqueMessages.map((e, i) => {
          const isSentByMe = e.sender === loggedInUser?._id;
          const prev = uniqueMessages[i - 1];
          const grouped = prev && prev.sender === e.sender;
          const label = dayLabel(e.createdAt);
          const showDay = label !== lastDay;
          lastDay = label;

          return (
            <React.Fragment key={`${e._id}-${i}`}>
              {showDay && (
                <div className="my-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-ink-800" />
                  <span className="text-[11.5px] font-medium text-fog-600">
                    {label}
                  </span>
                  <span className="h-px flex-1 bg-ink-800" />
                </div>
              )}

              <div
                className={`flex flex-col ${
                  isSentByMe ? "items-end" : "items-start"
                } ${grouped && !showDay ? "mt-0.5" : "mt-3"}`}
              >
                <div
                  className={`max-w-[min(30rem,82%)] px-3.5 py-2.5 text-[14.5px] leading-relaxed ${
                    isSentByMe
                      ? "rounded-panel rounded-br-[5px] border border-mint-500/25 bg-mint-500/15 text-fog-50"
                      : "rounded-panel rounded-bl-[5px] border border-ink-700 bg-ink-850 text-fog-50"
                  }`}
                >
                  {e.messageType === "image" && e.image && (
                    <img
                      src={e.image.url}
                      alt="Shared attachment"
                      className="mb-1.5 h-auto max-w-full rounded-control"
                    />
                  )}
                  {e.text && <p className="whitespace-pre-wrap">{e.text}</p>}
                </div>

                <div
                  className={`mt-1 flex items-center gap-1 px-1 text-[11.5px] text-fog-600 ${
                    isSentByMe ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className="font-mono">
                    {moment(e.createdAt).format("HH:mm")}
                  </span>
                  {isSentByMe &&
                    (e.seen ? (
                      <CheckCheck
                        className="h-3.5 w-3.5 text-mint-400"
                        strokeWidth={2}
                        aria-label="Seen"
                      />
                    ) : (
                      <Check
                        className="h-3.5 w-3.5"
                        strokeWidth={2}
                        aria-label="Sent"
                      />
                    ))}
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
