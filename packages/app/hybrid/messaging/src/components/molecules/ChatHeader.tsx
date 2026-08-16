import { type FC } from 'react';
import {
  FaArrowLeft,
  FaBellSlash,
  FaCheckCircle,
  FaPencilAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { Avatar } from '@/components/atoms/Avatar';
import { IconButton } from '@/components/atoms/IconButton';
import { formatLastSeen } from '@/lib/format';

interface ChatHeaderProps {
  title: string;
  avatarColor: string;
  kind: 'direct' | 'group';
  online: boolean;
  lastSeenAt: number;
  memberCount?: number;
  muted: boolean;
  secret: boolean;
  onNewChat: () => void;
  onBack?: () => void;
}

export const ChatHeader: FC<ChatHeaderProps> = ({
  title,
  avatarColor,
  kind,
  online,
  lastSeenAt,
  memberCount,
  muted,
  secret,
  onNewChat,
  onBack,
}: ChatHeaderProps) => {
  const subtitle =
    kind === 'group'
      ? `${memberCount ?? 0} members${secret ? ' · secret' : ''}`
      : formatLastSeen(online, lastSeenAt);

  return (
    <header className="border-base-300 bg-base-100 flex items-center gap-3 border-b px-4 py-2.5">
      {onBack && (
        <IconButton
          icon={FaArrowLeft}
          label="Back"
          onClick={onBack}
          className="md:hidden"
        />
      )}
      <Avatar
        name={title}
        color={avatarColor}
        kind={kind === 'group' ? 'group' : 'user'}
        online={kind === 'direct' ? online : undefined}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="truncate font-semibold">{title}</h2>
          {secret && (
            <FaCheckCircle
              aria-label="Secret chat"
              className="text-success h-4 w-4 shrink-0"
            />
          )}
          {muted && (
            <FaBellSlash
              aria-label="Muted"
              className="text-base-content/50 h-4 w-4 shrink-0"
            />
          )}
        </div>
        <p className="text-base-content/50 truncate text-xs">{subtitle}</p>
      </div>
      <IconButton icon={FaPencilAlt} label="Edit" />
      <IconButton icon={FaUserPlus} label="New chat" onClick={onNewChat} />
    </header>
  );
};
