import { render, screen, fireEvent } from '@testing-library/react';
import { MessageBubble } from '@/components/molecules/MessageBubble';
import type { Message } from '@/types';

const base: Message = {
  id: 'm1',
  chatId: 'c1',
  authorId: 'other',
  type: 'text',
  text: 'Hello',
  status: 'read',
  createdAt: 1000,
  reactions: [],
};

const renderBubble = (
  props: Partial<Message> &
    Pick<
      Message,
      | 'id'
      | 'chatId'
      | 'authorId'
      | 'type'
      | 'status'
      | 'createdAt'
      | 'reactions'
    >,
  mine = false,
  extraProps: Record<string, unknown> = {}
) =>
  render(
    <MessageBubble
      message={{ ...base, ...props }}
      mine={mine}
      authorName="Alice"
      onReact={jest.fn()}
      {...extraProps}
    />
  );

describe('MessageBubble', () => {
  it('renders the message text and time', () => {
    renderBubble(base);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText(/AM|PM/)).toBeInTheDocument();
  });

  it('shows the author name for incoming group messages', () => {
    renderBubble(base);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('shows delivery ticks for own messages', () => {
    renderBubble({ ...base, status: 'delivered' }, true);
    expect(screen.getByTitle('Delivered')).toBeInTheDocument();
  });

  it('does not show ticks for incoming messages', () => {
    renderBubble({ ...base, status: 'read' });
    expect(screen.queryByTitle('Read')).not.toBeInTheDocument();
  });

  it('shows a read style for read messages', () => {
    renderBubble({ ...base, status: 'read' }, true);
    expect(screen.getByTitle('Read')).toHaveClass('text-info');
  });

  it('shows an edited indicator', () => {
    renderBubble({ ...base, editedAt: 2000 });
    expect(screen.getByLabelText('Edited')).toBeInTheDocument();
  });

  it('shows a deleted placeholder without ticks', () => {
    renderBubble({ ...base, deletedAt: 2000 }, true);
    expect(screen.getByText('Message deleted')).toBeInTheDocument();
    expect(screen.queryByTitle('Read')).not.toBeInTheDocument();
  });

  it('shows reply and file metadata', () => {
    renderBubble({
      ...base,
      replyToId: 'm0',
      type: 'file',
      text: '',
      fileName: 'notes.pdf',
      fileSize: 2048,
    });
    expect(screen.getByLabelText('Replied')).toBeInTheDocument();
    expect(screen.getByText('notes.pdf')).toBeInTheDocument();
    expect(screen.getByText('2.0 KB')).toBeInTheDocument();
  });

  it('renders reactions when present', () => {
    renderBubble({
      ...base,
      reactions: [{ emoji: '👍', authorId: 'me', createdAt: 1500 }],
    });
    expect(screen.getByLabelText('React with 👍')).toBeInTheDocument();
  });

  it('does not render reactions for deleted messages', () => {
    renderBubble({
      ...base,
      deletedAt: 2000,
      reactions: [{ emoji: '👍', authorId: 'me', createdAt: 1500 }],
    });
    expect(screen.queryByLabelText('React with 👍')).not.toBeInTheDocument();
  });

  it('does not show ticks for a sending own message', () => {
    renderBubble({ ...base, status: 'sending' }, true);
    expect(screen.getByTitle('Sending')).toBeInTheDocument();
  });

  it('highlights text when highlight query is non-empty', () => {
    renderBubble(base, false, { highlight: 'Hello' });
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hello').closest('mark')).toBeTruthy();
  });

  it('does not highlight when highlight query is empty', () => {
    renderBubble(base, false, { highlight: '' });
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.queryAllByRole('mark')).toHaveLength(0);
  });

  it('applies highlighted class when highlighted is true', () => {
    const { container } = renderBubble(base, false, { highlighted: true });
    const wrapper = container.querySelector('.bg-warning\\/10');
    expect(wrapper).toBeInTheDocument();
  });

  it('shows sticker emoji for non-http sticker', () => {
    renderBubble({ ...base, type: 'sticker', stickerUrl: '👍' });
    expect(screen.getByText('👍')).toBeInTheDocument();
  });

  it('shows sticker image for http sticker URL', () => {
    renderBubble({
      ...base,
      type: 'sticker',
      stickerUrl: 'https://example.com/sticker.png',
    });
    expect(screen.getByAltText('Sticker')).toBeInTheDocument();
  });

  it('renders audio message with mediaUrl', () => {
    renderBubble({
      ...base,
      type: 'audio',
      mediaUrl: 'https://example.com/audio.mp3',
      text: '',
    });
    expect(document.querySelector('audio')).toBeInTheDocument();
  });

  it('renders video message with mediaUrl', () => {
    renderBubble({
      ...base,
      type: 'video',
      mediaUrl: 'https://example.com/video.mp4',
      text: '',
    });
    expect(document.querySelector('video')).toBeInTheDocument();
  });

  it('renders file without fileName', () => {
    renderBubble({ ...base, type: 'file', text: '' });
    expect(screen.getByText('File')).toBeInTheDocument();
  });

  it('shows quoted message from own user with mine styling', () => {
    render(
      <MessageBubble
        message={base}
        mine={true}
        authorName="Alice"
        onReact={jest.fn()}
        quotedMessage={
          { ...base, id: 'q1', authorId: 'me', text: 'My msg' } as Message
        }
        quotedAuthorName="You"
      />
    );
    expect(screen.getByText('My msg')).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();
  });

  it('shows quoted deleted message', () => {
    render(
      <MessageBubble
        message={base}
        mine={false}
        authorName="Alice"
        onReact={jest.fn()}
        quotedMessage={
          { ...base, id: 'q1', text: 'old', deletedAt: 2000 } as Message
        }
        quotedAuthorName="Alice"
      />
    );
    expect(screen.getByText('Message deleted')).toBeInTheDocument();
  });

  it('shows Unknown when quotedAuthorName is undefined', () => {
    render(
      <MessageBubble
        message={base}
        mine={false}
        authorName="Alice"
        onReact={jest.fn()}
        quotedMessage={{ ...base, id: 'q1', text: 'old' } as Message}
      />
    );
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('opens context menu and allows reply', () => {
    const onReply = jest.fn();
    render(
      <MessageBubble
        message={base}
        mine={false}
        authorName="Alice"
        onReact={jest.fn()}
        onReply={onReply}
      />
    );
    fireEvent.contextMenu(screen.getByText('Hello'));
    fireEvent.click(screen.getByText('Reply'));
    expect(onReply).toHaveBeenCalled();
  });

  it('context menu works without optional callbacks', () => {
    render(
      <MessageBubble
        message={base}
        mine={false}
        authorName="Alice"
        onReact={jest.fn()}
      />
    );
    fireEvent.contextMenu(screen.getByText('Hello'));
    fireEvent.click(screen.getByText('Reply'));
    fireEvent.contextMenu(screen.getByText('Hello'));
    fireEvent.click(screen.getByText('Copy'));
    fireEvent.contextMenu(screen.getByText('Hello'));
    fireEvent.click(screen.getByText('Forward'));
  });

  it('renders image with onImageClick', () => {
    const onImageClick = jest.fn();
    render(
      <MessageBubble
        message={{
          ...base,
          type: 'image',
          mediaUrl: 'https://example.com/img.png',
          text: '',
        }}
        mine={false}
        authorName="Alice"
        onReact={jest.fn()}
        onImageClick={onImageClick}
      />
    );
    fireEvent.click(screen.getByAltText('Image'));
    expect(onImageClick).toHaveBeenCalledWith('https://example.com/img.png');
  });

  it('renders image with text as alt', () => {
    render(
      <MessageBubble
        message={{
          ...base,
          type: 'image',
          mediaUrl: 'https://example.com/img.png',
          text: 'My photo',
        }}
        mine={false}
        authorName="Alice"
        onReact={jest.fn()}
      />
    );
    expect(screen.getByAltText('My photo')).toBeInTheDocument();
  });

  it('renders file download link', () => {
    render(
      <MessageBubble
        message={{
          ...base,
          type: 'file',
          text: '',
          fileName: 'doc.pdf',
          mediaUrl: 'https://example.com/doc.pdf',
          fileSize: 1024,
        }}
        mine={false}
        authorName="Alice"
        onReact={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Download')).toBeInTheDocument();
  });

  it('shows link preview when present', () => {
    render(
      <MessageBubble
        message={{
          ...base,
          linkPreview: {
            title: 'Test',
            description: 'Desc',
            url: 'https://example.com',
            image: '',
            siteName: 'Example',
          },
        }}
        mine={false}
        authorName="Alice"
        onReact={jest.fn()}
      />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
