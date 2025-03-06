"use client";

import { ChatRequestOptions, CreateMessage, Message } from "ai";
import { motion } from "framer-motion";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "sonner";

import useWindowSize from "./use-window-size";
import { Textarea } from "../ui/textarea";


const suggestedActions = [
  {
    title: "Libraries for HTML5 Canvas",
    action: "Libraries for HTML5 Canvas to help me draw",
  },
  {
    title: "Pre-Build ReactJs Component",
    action: "Pre-Build React Js Components whose code can be copy pasted",
  },
  {
    title: "Viral Fun Tools",
    action: "Viral Fun Tools on twitter right now like git wrapped",
  },
  {
    title: "Gradient Genrator",
    action: "Gradient generator like gradii.fun",
  },
];

interface multimodalChatBot {
  input: string,
  setInput: (value: string) => void,
  isLoading: boolean,
  stop: () => void,
  messages: Array<Message>,
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void,
}

export function MultimodalInput({
  input,
  setInput,
  isLoading,
  stop,
  messages,
  append,
  handleSubmit,
}: multimodalChatBot) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 0}px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  const submitForm = useCallback(() => {
    handleSubmit(undefined);

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [handleSubmit, width]);

  return (
    <div className="relative w-full flex flex-col gap-4">
      {messages.length === 0 &&
        uploadQueue.length === 0 && (
          <div className="sm:grid sm:grid-cols-2 flex gap-4 overflow-x-auto overflow-y-hidden w-full md:px-0 mx-auto md:max-w-[500px]">
            {suggestedActions.map((suggestedAction, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.05 * index }}
                key={index}
                className={index > 1 ? "hidden sm:block" : "block"}
              >
                <button
                  onClick={async () => {
                    append({
                      role: "user",
                      content: suggestedAction.action,
                    });
                  }}
                  className="border-none bg-muted/50 w-full text-left border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-lg p-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex flex-col"
                >
                  <span className="font-medium">{suggestedAction.title}</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        <div className="relative w-full flex items-center justify-center">
      <Textarea
        ref={textareaRef}
        placeholder="Search for a Project..."
        value={input}
        onChange={handleInput}
        className="max-h-[15vh] overflow-hidden resize-none outline-none active:outline-none relative focus:border-none! focus:outline-none! rounded-2xl text-base bg-muted border-none"
        rows={1}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (isLoading) {
              toast.error("Please wait for the model to finish its response!");
            } else {
              submitForm();
            }
          }
        }}
      />

      {/* {isLoading ? (
        <button
          className="p-2 hover:bg-gray-200 duration-200 border flex items-center justify-center absolute top-[1.35rem] shadow-lg bg-white opacity-100 text-black right-2 rounded-full"
          onClick={(event) => {
            event.preventDefault();
            stop();
          }}
        >
          <StopIcon size={14} />
        </button>
      ) : (
        <button
          onClick={(event) => {
            event.preventDefault();
            submitForm();
          }}
          disabled={input.length === 0 || uploadQueue.length > 0}
          className="p-2 hover:bg-gray-200 duration-200 border flex items-center justify-center absolute top-[1.35rem] shadow-lg bg-white opacity-100 text-black right-2 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      )} */}
    </div>
    </div>
  );
}
