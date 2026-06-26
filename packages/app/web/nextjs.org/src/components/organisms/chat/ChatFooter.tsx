import { FC } from 'react';

interface ChatFooterProps {
  disclaimer?: string;
}

export const ChatFooter: FC<ChatFooterProps> = ({
  disclaimer = 'AI responses are generated and may not be accurate. Verify important information.',
}) => {
  return (
    <div className="border-base-300 border-t px-6 py-3 text-center">
      <p className="text-base-content/20 text-xs">{disclaimer}</p>
    </div>
  );
};
ChatFooter.displayName = 'ChatFooter';
