import { type FC } from 'react';
import { FaStar } from 'react-icons/fa';
import type { Contact } from '@/types';
import { Avatar } from '@/components/atoms/Avatar';
import { StatusDot } from '@/components/atoms/StatusDot';
import { formatLastSeen } from '@/lib/format';

interface ContactRowProps {
  contact: Contact;
  onSelect: (contactId: string) => void;
}

export const ContactRow: FC<ContactRowProps> = ({ contact, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(contact.id)}
    aria-label={`Start chat with ${contact.name}`}
    className="hover:bg-base-200 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors">
    <div className="relative">
      <Avatar
        name={contact.name}
        color={contact.avatarColor}
        online={contact.online}
      />
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <span className="truncate font-semibold">{contact.name}</span>
        {contact.starred && (
          <FaStar
            aria-label="Starred"
            className="text-warning h-3 w-3 shrink-0"
          />
        )}
        <StatusDot online={contact.online} />
      </div>
      <p className="text-base-content/50 truncate text-xs">
        {formatLastSeen(contact.online, contact.lastSeenAt)}
      </p>
    </div>
  </button>
);
