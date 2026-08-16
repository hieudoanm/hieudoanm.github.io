import { type FC } from 'react';
import { FaRegEdit, FaReply } from 'react-icons/fa';
import type { Message } from '@/types';
import {
  formatChatTime,
  isEdited,
  statusTicks,
  statusLabel,
  formatFileSize,
} from '@/lib/format';
import { ReactionBar } from '@/components/molecules/ReactionBar';

interface MessageBubbleProps {
  message: Message;
  mine: boolean;
  authorName?: string;
  onReact: (emoji: string) => void;
}

export const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  mine,
  authorName,
  onReact,
}) => {
  const alignment = mine ? 'justify-end' : 'justify-start';
  const bubbleClass = mine
    ? 'bg-primary text-primary-content rounded-br-sm'
    : 'bg-base-200 text-base-content rounded-bl-sm';
  const showAuthor = !mine && authorName !== undefined;

  return (
    <div className={`flex flex-col ${alignment}`}>
      {showAuthor && (
        <span className="text-secondary mb-0.5 text-xs font-semibold">
          {authorName}
        </span>
      )}
      <div
        className={`max-w-[75%] ${mine ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`rounded-2xl px-3 py-1.5 text-sm ${bubbleClass}`}>
          {message.deletedAt !== undefined ? (
            <span className="text-base-content/50 italic">Message deleted</span>
          ) : (
            <span className="break-words whitespace-pre-wrap">
              {message.text}
            </span>
          )}
          <span className="mt-1 flex items-center justify-end gap-1 text-[10px] opacity-70">
            {message.replyToId !== undefined && (
              <FaReply aria-label="Replied" className="h-2.5 w-2.5" />
            )}
            {isEdited(message) && (
              <span>
                <FaRegEdit
                  aria-label="Edited"
                  className="mr-0.5 inline h-2.5 w-2.5"
                />
                edited
              </span>
            )}
            {formatChatTime(message.createdAt)}
            {mine && message.deletedAt === undefined && (
              <span
                title={statusLabel(message.status)}
                className={message.status === 'read' ? 'text-info' : ''}>
                {statusTicks(message.status)}
              </span>
            )}
          </span>
        </div>
        {message.fileName && (
          <span className="text-base-content/50 mt-0.5 text-[11px]">
            {message.fileName}
            {message.fileSize !== undefined &&
              ` · ${formatFileSize(message.fileSize)}`}
          </span>
        )}
        {message.deletedAt === undefined && message.reactions.length > 0 && (
          <ReactionBar message={message} mine={mine} onReact={onReact} />
        )}
      </div>
    </div>
  );
};
