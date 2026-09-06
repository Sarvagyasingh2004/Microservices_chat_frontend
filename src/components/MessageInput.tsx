import { Loader2, Paperclip, SendHorizontal, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

interface MessageInputProps {
  selectedUser: string | null;
  message: string;
  setMessage: (message: string) => void;
  handleMessageSend: (e: any, imageFile?: File | null) => void;
}

const MessageInput = ({
  selectedUser,
  message,
  setMessage,
  handleMessageSend,
}: MessageInputProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!message.trim() && !imageFile) return;
    setIsUploading(true);
    await handleMessageSend(e, imageFile);
    setImageFile(null);
    setIsUploading(false);
  };

  if (!selectedUser) return null;

  const canSend = Boolean(message.trim() || imageFile) && !isUploading;

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 border-t border-ink-800 px-4 py-4 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        {imageFile && (
          <div className="relative mb-3 w-fit">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Attachment preview"
              className="h-20 w-20 rounded-control border border-ink-700 object-cover"
            />
            <button
              type="button"
              onClick={() => setImageFile(null)}
              aria-label="Remove attachment"
              className="ring-focus absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-ink-700 bg-ink-850 text-fog-200 transition-colors hover:text-fog-50"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 rounded-panel border border-ink-700 bg-ink-900 py-1.5 pl-1.5 pr-1.5 transition-colors focus-within:border-ink-600">
          <label
            className="ring-focus flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-control text-fog-500 transition-colors hover:bg-ink-800 hover:text-fog-200"
            aria-label="Attach an image"
          >
            <Paperclip className="h-4 w-4" strokeWidth={1.75} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                if (!file.type.startsWith("image/")) {
                  toast.error("Only image files can be attached.");
                  return;
                }
                if (file.size > MAX_IMAGE_BYTES) {
                  toast.error("Images must be 5MB or smaller.");
                  return;
                }
                setImageFile(file);
              }}
            />
          </label>

          <input
            type="text"
            aria-label="Message"
            className="min-w-0 flex-1 bg-transparent py-2 text-[14.5px] text-fog-50 outline-none placeholder:text-fog-600"
            placeholder={imageFile ? "Add a caption" : "Write a message"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send message"
            className="ring-focus flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-mint-400 text-ink-950 transition-all hover:bg-mint-300 active:scale-95 disabled:bg-ink-800 disabled:text-fog-600"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            ) : (
              <SendHorizontal className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
