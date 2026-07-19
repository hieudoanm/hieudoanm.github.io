import { FC } from 'react';

export const ChatCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 overflow-hidden border shadow-sm">
    <div className="card-body">
      <div className="chat chat-start">
        <div className="chat-image avatar placeholder">
          <div className="bg-primary/20 text-primary w-8 rounded-full">
            <span className="text-xs">OW</span>
          </div>
        </div>
        <div className="chat-header text-xs">
          Obi-Wan
          <time className="text-base-content/40 ml-1">12:45</time>
        </div>
        <div className="chat-bubble chat-bubble-neutral">It's over Anakin</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar placeholder">
          <div className="bg-primary/20 text-primary w-8 rounded-full">
            <span className="text-xs">OW</span>
          </div>
        </div>
        <div className="chat-footer text-xs opacity-50">Delivered</div>
        <div className="chat-bubble chat-bubble-neutral">
          I have the high ground
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar placeholder">
          <div className="bg-error/20 text-error w-8 rounded-full">
            <span className="text-xs">AK</span>
          </div>
        </div>
        <div className="chat-header text-xs">
          Anakin
          <time className="text-base-content/40 ml-1">12:46</time>
        </div>
        <div className="chat-bubble">You underestimate my power</div>
        <div className="chat-footer text-xs opacity-50">Seen at 12:46</div>
      </div>
    </div>
  </div>
);

ChatCard.displayName = 'ChatCard';
