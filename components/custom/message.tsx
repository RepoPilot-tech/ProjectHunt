"use client";

import { Attachment, ToolInvocation } from "ai";
import { motion } from "framer-motion";
import { ReactNode } from "react";

import { BotIcon, UserIcon } from "./icons";
import { Markdown } from "./markdown";
import { PreviewAttachment } from "./preview-attachment";
import ToolRecommendations from "../projectHunt/ToolRecommendations";

export const Message = ({
  chatId,
  role,
  content,
  toolInvocations,
  attachments,
}: {
  chatId: string;
  role: string;
  content: string | ReactNode;
  toolInvocations: Array<ToolInvocation> | undefined;
  attachments?: Array<Attachment>;
}) => {
  return (
    <motion.div
      className={`flex flex-row gap-4 w-full first-of-type:pt-20`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {/* <div className={`size-[24px] border rounded-sm p-1 flex flex-col bg-red-200 justify-end items-end shrink-0 text-zinc-500`}>
        {role === "assistant" ? <BotIcon /> : <UserIcon />}
      </div> */}

      <div className="flex flex-col gap-2 w-full">
        {content && typeof content === "string" && (
          <div className={`text-zinc-800 dark:text-zinc-300 ${role === "assistant" ? "" : "items-end text-base"} flex flex-col gap-4`}>
            <span className={`${role === "assistant" ? "" : "border-r-4 border-blue-300 hover:bg-gray-100 hover:rounded-xl hover:text-black duration-200 max-w-[35vw] text-left py-2 px-3"}`}>
            <Markdown>
              {content}
            </Markdown>
            </span>
          </div>
        )}

        {toolInvocations && (
          <div className="flex flex-col gap-4 h-fit">
            {toolInvocations.map((toolInvocation) => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === "result") {
                const { result } = toolInvocation;

                return (
                  <div key={toolCallId}>
                    {toolName === "combinedQueryTool" ? (
                      <ToolRecommendations recommendations={result} />
                    ) : (
                      <div>{JSON.stringify(result, null, 2)}</div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={toolCallId} className="skeleton">
                    {toolName === "combinedQueryTool" ? (
                      <div className="h-10 w-full bg-gray-200">
                        showing....
                      </div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        )}

        {attachments && (
          <div className="flex flex-row gap-2">
            {attachments.map((attachment) => (
              <PreviewAttachment key={attachment.url} attachment={attachment} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
