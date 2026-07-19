'use client';

import { connectWebSocket, WebSocketConnection } from '@/lib/websocket';
import { RealtimeMessage } from '@/types/api-client';
import { type FC, useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';

const uid = (): string => Math.random().toString(36).slice(2, 10);

const WebSocketPanel: FC = () => {
  const [url, setUrl] = useState('wss://echo.websocket.org');
  const [status, setStatus] = useState<'idle' | 'connected'>('idle');
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);
  const [input, setInput] = useState('');
  const connectionRef = useRef<WebSocketConnection | null>(null);

  const addMessage = (direction: 'sent' | 'received', text: string): void =>
    setMessages((prev) => [
      { id: uid(), direction, text, timestamp: Date.now() },
      ...prev,
    ]);

  const disconnect = (): void => {
    connectionRef.current?.close();
    connectionRef.current = null;
    setStatus('idle');
  };

  useEffect(
    () => () => {
      connectionRef.current?.close();
    },
    []
  );

  const connect = (): void => {
    if (url.trim() === '') return;
    const connection = connectWebSocket(url.trim(), {
      onOpen: () => setStatus('connected'),
      onMessage: (text) => addMessage('received', text),
      onClose: () => {
        connectionRef.current = null;
        setStatus('idle');
      },
      onError: () => addMessage('received', '[error] WebSocket error'),
    });
    connectionRef.current = connection;
  };

  const send = (): void => {
    const trimmed = input.trim();
    if (trimmed === '' || status !== 'connected') return;
    connectionRef.current?.send(trimmed);
    addMessage('sent', trimmed);
    setInput('');
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="WebSocket URL"
          placeholder="wss://example.com/socket"
          className="input input-bordered input-sm flex-1 font-mono"
        />
        {status === 'idle' ? (
          <button
            type="button"
            onClick={connect}
            className="btn btn-primary btn-sm">
            Connect
          </button>
        ) : (
          <button
            type="button"
            onClick={disconnect}
            className="btn btn-outline btn-error btn-sm">
            Disconnect
          </button>
        )}
      </div>

      <span className="badge badge-sm badge-success w-fit">
        {status === 'connected' ? 'Connected' : 'Disconnected'}
      </span>

      <div className="bg-base-200 flex h-40 flex-col-reverse gap-1 overflow-y-auto rounded-lg p-3 font-mono text-xs">
        {messages.length === 0 ? (
          <span className="text-base-content/40">
            No messages yet. Connect and start talking.
          </span>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`whitespace-pre-wrap ${
                message.direction === 'sent'
                  ? 'text-primary'
                  : 'text-base-content/80'
              }`}>
              <span className="mr-2 select-none">
                {message.direction === 'sent' ? '→' : '←'}
              </span>
              {message.text}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send();
          }}
          placeholder="Type a message…"
          aria-label="WebSocket message"
          disabled={status !== 'connected'}
          className="input input-bordered input-sm flex-1 font-mono"
        />
        <button
          type="button"
          onClick={send}
          disabled={status !== 'connected'}
          className="btn btn-primary btn-sm gap-1">
          <FiSend className="size-4" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

WebSocketPanel.displayName = 'WebSocketPanel';

export { WebSocketPanel };
