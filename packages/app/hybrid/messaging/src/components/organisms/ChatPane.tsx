'use client';

import {
  type FC,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import { FaLock, FaSearch, FaUsers, FaCog, FaImages } from 'react-icons/fa';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { ChatHeader } from '@/components/molecules/ChatHeader';
import { MessageBubble } from '@/components/molecules/MessageBubble';
import { Composer } from '@/components/molecules/Composer';
import { ReplyComposer } from '@/components/molecules/ReplyComposer';
import { DateDivider } from '@/components/molecules/DateDivider';
import { ChatSearchBar } from '@/components/molecules/ChatSearchBar';
import { TypingIndicator } from '@/components/atoms/TypingIndicator';
import { EmptyState } from '@/components/atoms/EmptyState';
import { MediaComposer } from '@/components/molecules/MediaComposer';
import { VoiceRecorder } from '@/components/molecules/VoiceRecorder';
import { StickerPicker } from '@/components/molecules/StickerPicker';
import { ImageLightbox } from '@/components/organisms/ImageLightbox';
import { MediaGallery } from '@/components/organisms/MediaGallery';
import { ForwardModal } from '@/components/organisms/ForwardModal';
import { ChatSettingsPanel } from '@/components/organisms/ChatSettingsPanel';
import { GroupAdminPanel } from '@/components/organisms/GroupAdminPanel';
import { SecretChatBanner } from '@/components/molecules/SecretChatBanner';
import { VerificationCodeModal } from '@/components/molecules/VerificationCodeModal';
import { CallScreen } from '@/components/organisms/CallScreen';
import { GroupCallView } from '@/components/organisms/GroupCallView';
import { getChatMessages } from '@/lib/selectors';
import { searchMessages } from '@/lib/format';
import type { Message, MediaAttachment } from '@/types';

interface ChatPaneProps {
  chatId: string | null;
  onNewChat: () => void;
  onBack?: () => void;
}

export const ChatPane: FC<ChatPaneProps> = ({ chatId, onNewChat, onBack }) => {
  const {
    chats,
    contacts,
    messages,
    sendMessage,
    addReaction,
    deleteMessage,
    deleteForEveryone,
    editMessage,
    forwardMessage,
    markChatRead,
    typingUsers,
    setTyping,
    sendMediaMessage,
    sendSticker,
    activeVerification,
    startVerification,
    clearVerification,
    privacySettings,
    startCall,
    activeCall,
    endCall,
    toggleCallMute,
    toggleCallVideo,
    toggleCallSpeaker,
    shareScreen,
    callMuted,
    callVideoOff,
    callSpeakerOff,
  } = useData();
  const { showToast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchIndex, setSearchIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showGroupAdmin, setShowGroupAdmin] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [forwardMessageId, setForwardMessageId] = useState<string | null>(null);

  const chat = chats.find((c) => c.id === chatId) ?? null;
  const chatMessages = useMemo(
    () => (chatId ? getChatMessages(messages, chatId) : []),
    [messages, chatId]
  );

  const searchResults = useMemo(
    () => searchMessages(chatMessages, searchQuery),
    [chatMessages, searchQuery]
  );

  const highlightedIds = useMemo(
    () => new Set(searchResults.map((m) => m.id)),
    [searchResults]
  );

  useEffect(() => {
    if (chatId) {
      void markChatRead(chatId);
    }
  }, [chatId, chatMessages.length, markChatRead]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages.length]);

  useEffect(() => {
    setSearchQuery('');
    setSearchIndex(0);
    setReplyingTo(null);
    setEditingMessage(null);
    setShowSettings(false);
    setShowGroupAdmin(false);
    setShowVoiceRecorder(false);
    setShowStickerPicker(false);
    setShowMediaGallery(false);
    setLightboxImages(null);
    setForwardMessageId(null);
  }, [chatId]);

  useEffect(() => {
    if (
      searchResults.length > 0 &&
      searchIndex >= 0 &&
      searchIndex < searchResults.length
    ) {
      const el = document.getElementById(
        `message-${searchResults[searchIndex].id}`
      );
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [searchIndex, searchResults]);

  const otherContact = chat
    ? contacts.find((c) => chat.memberIds.includes(c.id))
    : undefined;

  const chatTypingNames = useMemo(() => {
    if (!chat) return [];
    return typingUsers
      .filter(
        (t) =>
          t.chatId === chat.id &&
          t.typing &&
          t.userId !== 'me' &&
          Date.now() - t.timestamp < 5000
      )
      .map((t) => contacts.find((c) => c.id === t.userId)?.name ?? 'Someone');
  }, [typingUsers, chat, contacts]);

  const handleSend = useCallback(
    (text: string): void => {
      if (!chat) return;
      if (editingMessage) {
        void editMessage(chat.id, editingMessage.id, text);
        setEditingMessage(null);
        showToast('Message edited', 'info');
        return;
      }
      const replyToId = replyingTo?.id;
      void sendMessage(chat.id, text, replyToId);
      setReplyingTo(null);
    },
    [chat, editingMessage, replyingTo, editMessage, sendMessage, showToast]
  );

  const handleReact = useCallback(
    (messageId: string, emoji: string): void => {
      if (!chat) return;
      void addReaction(chat.id, messageId, emoji);
    },
    [chat, addReaction]
  );

  const handleCopy = useCallback(
    (text: string): void => {
      void navigator.clipboard.writeText(text);
      showToast('Copied to clipboard', 'info');
    },
    [showToast]
  );

  const handleForward = useCallback((message: Message): void => {
    setForwardMessageId(message.id);
  }, []);

  const handleEdit = useCallback((message: Message): void => {
    setEditingMessage(message);
    setReplyingTo(null);
  }, []);

  const handleDelete = useCallback(
    (chatId: string, messageId: string): void => {
      void deleteMessage(chatId, messageId);
      showToast('Message deleted', 'info');
    },
    [deleteMessage, showToast]
  );

  const handleDeleteForEveryone = useCallback(
    (chatId: string, messageId: string): void => {
      void deleteForEveryone(chatId, messageId);
      showToast('Message deleted for everyone', 'info');
    },
    [deleteForEveryone, showToast]
  );

  const handleVerify = useCallback(async (): Promise<void> => {
    if (!chat) return;
    await startVerification(chat.id);
  }, [chat, startVerification]);

  useEffect(() => {
    if (!chat?.isSecret) return;
    const handler = (): void => {
      if (document.visibilityState === 'hidden') {
        showToast('Screenshot detected in secret chat', 'error');
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [chat?.isSecret, showToast]);

  const handleImageSelect = useCallback(
    async (file: File): Promise<void> => {
      if (!chat) return;
      const url = URL.createObjectURL(file);
      const attachment: MediaAttachment = { file, url, type: 'image' };
      await sendMediaMessage(chat.id, attachment, '');
      showToast('Image sent', 'info');
    },
    [chat, sendMediaMessage, showToast]
  );

  const handleVideoSelect = useCallback(
    async (file: File): Promise<void> => {
      if (!chat) return;
      const url = URL.createObjectURL(file);
      const attachment: MediaAttachment = { file, url, type: 'video' };
      await sendMediaMessage(chat.id, attachment, '');
      showToast('Video sent', 'info');
    },
    [chat, sendMediaMessage, showToast]
  );

  const handleFileSelect = useCallback(
    async (file: File): Promise<void> => {
      if (!chat) return;
      const url = URL.createObjectURL(file);
      const attachment: MediaAttachment = { file, url, type: 'file' };
      await sendMediaMessage(chat.id, attachment, '');
      showToast('File sent', 'info');
    },
    [chat, sendMediaMessage, showToast]
  );

  const handleVoiceSend = useCallback(
    async (blob: Blob, duration: number): Promise<void> => {
      if (!chat) return;
      const file = new File([blob], `voice-${Date.now()}.webm`, {
        type: 'audio/webm',
      });
      const url = URL.createObjectURL(blob);
      const attachment: MediaAttachment = { file, url, type: 'audio' };
      await sendMediaMessage(chat.id, attachment, '');
      setShowVoiceRecorder(false);
      showToast('Voice message sent', 'info');
    },
    [chat, sendMediaMessage, showToast]
  );

  const handleStickerSelect = useCallback(
    async (sticker: string): Promise<void> => {
      if (!chat) return;
      await sendSticker(chat.id, sticker);
      setShowStickerPicker(false);
    },
    [chat, sendSticker]
  );

  const handleVoiceCall = useCallback(async (): Promise<void> => {
    if (!chat) return;
    await startCall(chat.id, 'voice');
  }, [chat, startCall]);

  const handleVideoCall = useCallback(async (): Promise<void> => {
    if (!chat) return;
    await startCall(chat.id, 'video');
  }, [chat, startCall]);

  const handleEndCall = useCallback(async (): Promise<void> => {
    await endCall();
  }, [endCall]);

  const handleImageClick = useCallback(
    (url: string): void => {
      const imageUrls = chatMessages
        .filter((m) => m.type === 'image' && m.mediaUrl)
        .map((m) => m.mediaUrl!);
      const idx = imageUrls.indexOf(url);
      setLightboxImages(imageUrls);
      setLightboxIndex(idx >= 0 ? idx : 0);
    },
    [chatMessages]
  );

  const scrollToBottom = useCallback((): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  if (!chat) {
    return (
      <section className="bg-base-200/40 flex h-full flex-1 flex-col items-center justify-center">
        <EmptyState
          icon={FaLock}
          title="Select a chat"
          description="Choose a conversation from the list or start a new one."
        />
      </section>
    );
  }

  let lastDay = '';
  const grouped = chatMessages.map((message) => {
    const day = new Date(message.createdAt).toDateString();
    const isNewDay = day !== lastDay;
    lastDay = day;
    return { message, isNewDay };
  });

  return (
    <section className="bg-base-200/40 flex h-full min-w-0 flex-1 flex-col">
      <ChatHeader
        title={chat.title}
        avatarColor={chat.avatarColor}
        kind={chat.kind}
        online={otherContact?.online ?? false}
        lastSeenAt={otherContact?.lastSeenAt ?? Date.now()}
        memberCount={chat.memberIds.length}
        muted={chat.muted}
        secret={chat.isSecret}
        lastSeenVisibility={privacySettings.lastSeen}
        profilePhotoVisibility={privacySettings.profilePhoto}
        onNewChat={onNewChat}
        onBack={onBack}
        onSearch={() => {
          setShowSettings(false);
          setShowGroupAdmin(false);
          setSearchQuery(searchQuery === '' ? ' ' : searchQuery);
        }}
        onGroupAdmin={
          chat.kind === 'group'
            ? () => {
                setShowSettings(false);
                setShowGroupAdmin(!showGroupAdmin);
              }
            : undefined
        }
        onSettings={() => {
          setShowGroupAdmin(false);
          setShowSettings(!showSettings);
        }}
        onMediaGallery={() => {
          setShowSettings(false);
          setShowGroupAdmin(false);
          setShowMediaGallery(!showMediaGallery);
        }}
        onVoiceCall={handleVoiceCall}
        onVideoCall={handleVideoCall}
      />
      {searchQuery.trim() !== '' && (
        <ChatSearchBar
          query={searchQuery}
          onChange={(q) => {
            setSearchQuery(q);
            setSearchIndex(0);
          }}
          resultCount={searchResults.length}
          currentIndex={searchIndex}
          onPrev={() =>
            setSearchIndex(
              searchResults.length > 0
                ? (searchIndex - 1 + searchResults.length) %
                    searchResults.length
                : 0
            )
          }
          onNext={() =>
            setSearchIndex(
              searchResults.length > 0
                ? (searchIndex + 1) % searchResults.length
                : 0
            )
          }
        />
      )}
      {chat.isSecret && <SecretChatBanner onVerify={handleVerify} />}
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
            {grouped.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-base-content/50 text-sm">
                  No messages yet — say hello!
                </p>
              </div>
            ) : (
              grouped.map(({ message, isNewDay }) => {
                const quotedMessage = message.replyToId
                  ? messages.find((m) => m.id === message.replyToId)
                  : undefined;
                const quotedAuthorName = quotedMessage
                  ? quotedMessage.authorId === 'me'
                    ? 'You'
                    : contacts.find((c) => c.id === quotedMessage.authorId)
                        ?.name
                  : undefined;
                return (
                  <div
                    key={message.id}
                    id={`message-${message.id}`}
                    className="flex flex-col gap-1.5">
                    {isNewDay && <DateDivider timestamp={message.createdAt} />}
                    <MessageBubble
                      message={message}
                      mine={message.authorId === 'me'}
                      authorName={
                        message.authorId !== 'me'
                          ? contacts.find((c) => c.id === message.authorId)
                              ?.name
                          : undefined
                      }
                      onReact={(emoji) => handleReact(message.id, emoji)}
                      onReply={() => {
                        setReplyingTo(message);
                        setEditingMessage(null);
                      }}
                      onCopy={() => handleCopy(message.text)}
                      onForward={() => handleForward(message)}
                      onEdit={() => handleEdit(message)}
                      onDelete={() => handleDelete(chat.id, message.id)}
                      onDeleteForEveryone={() =>
                        handleDeleteForEveryone(chat.id, message.id)
                      }
                      quotedMessage={quotedMessage}
                      quotedAuthorName={quotedAuthorName}
                      highlight={searchQuery.trim()}
                      highlighted={highlightedIds.has(message.id)}
                      onImageClick={handleImageClick}
                    />
                  </div>
                );
              })
            )}
          </div>
          <TypingIndicator names={chatTypingNames} />
          {editingMessage && (
            <div className="bg-base-200/60 border-base-300 flex items-center gap-2 border-t px-3 py-1.5 text-xs">
              <span className="text-base-content/50">
                Editing: {editingMessage.text.slice(0, 40)}…
              </span>
              <button
                type="button"
                onClick={() => setEditingMessage(null)}
                className="btn btn-xs btn-ghost text-error">
                Cancel
              </button>
            </div>
          )}
          {replyingTo && (
            <ReplyComposer
              replyingTo={replyingTo}
              authorName={
                replyingTo.authorId === 'me'
                  ? 'You'
                  : contacts.find((c) => c.id === replyingTo.authorId)?.name
              }
              onSend={handleSend}
              onCancel={() => setReplyingTo(null)}
            />
          )}
          {showVoiceRecorder ? (
            <VoiceRecorder
              onSend={handleVoiceSend}
              onCancel={() => setShowVoiceRecorder(false)}
            />
          ) : (
            <div className="border-base-300 bg-base-100 flex items-end gap-2 border-t p-3">
              <MediaComposer
                onImageSelect={handleImageSelect}
                onVideoSelect={handleVideoSelect}
                onFileSelect={handleFileSelect}
                onVoiceRecord={() => setShowVoiceRecorder(true)}
                onStickerToggle={() => setShowStickerPicker(!showStickerPicker)}
              />
              <div className="relative flex-1">
                {showStickerPicker && (
                  <StickerPicker
                    onSelect={handleStickerSelect}
                    onClose={() => setShowStickerPicker(false)}
                  />
                )}
                <Composer onSend={handleSend} incognito={chat.isSecret} />
              </div>
            </div>
          )}
        </div>
        {showSettings && (
          <ChatSettingsPanel
            chat={chat}
            onClose={() => setShowSettings(false)}
          />
        )}
        {showGroupAdmin && chat.kind === 'group' && (
          <GroupAdminPanel
            chat={chat}
            onClose={() => setShowGroupAdmin(false)}
          />
        )}
        {showMediaGallery && (
          <MediaGallery
            chatId={chat.id}
            onClose={() => setShowMediaGallery(false)}
          />
        )}
      </div>
      {lightboxImages && (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxImages(null)}
        />
      )}
      {forwardMessageId && (
        <ForwardModal
          messageId={forwardMessageId}
          onClose={() => setForwardMessageId(null)}
        />
      )}
      {activeVerification && activeVerification.chatId === chat.id && (
        <VerificationCodeModal
          verification={activeVerification}
          onClose={clearVerification}
        />
      )}
      {activeCall && activeCall.chatId === chat.id && activeCall.isGroup && (
        <GroupCallView
          call={activeCall}
          isMuted={callMuted}
          isVideoOff={callVideoOff}
          isSpeakerOff={callSpeakerOff}
          onToggleMute={toggleCallMute}
          onToggleVideo={toggleCallVideo}
          onToggleSpeaker={toggleCallSpeaker}
          onEndCall={handleEndCall}
          onShareScreen={shareScreen}
        />
      )}
      {activeCall && activeCall.chatId === chat.id && !activeCall.isGroup && (
        <CallScreen
          call={activeCall}
          isMuted={callMuted}
          isVideoOff={callVideoOff}
          isSpeakerOff={callSpeakerOff}
          onToggleMute={toggleCallMute}
          onToggleVideo={toggleCallVideo}
          onToggleSpeaker={toggleCallSpeaker}
          onEndCall={handleEndCall}
          onShareScreen={shareScreen}
        />
      )}
    </section>
  );
};
