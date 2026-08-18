'use client';

import { createMockMqttClient, MqttClient } from '@/lib/mqtt';
import { RealtimeMessage } from '@/types/api-client';
import { type FC, useEffect, useRef, useState } from 'react';
import { FiPlus, FiSend } from 'react-icons/fi';

const uid = (): string => Math.random().toString(36).slice(2, 10);

const MqttPanel: FC = () => {
  const [url, setUrl] = useState('wss://broker.hivemq.com:8884/mqtt');
  const [connected, setConnected] = useState(false);
  const [topic, setTopic] = useState('test/topic');
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [publishTopic, setPublishTopic] = useState('test/topic');
  const [message, setMessage] = useState('hello mqtt');
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);
  const clientRef = useRef<MqttClient | null>(null);

  const addMessage = (topicText: string, text: string): void =>
    setMessages((prev) => [
      {
        id: uid(),
        direction: 'received',
        text: `[${topicText}] ${text}`,
        timestamp: Date.now(),
      },
      ...prev,
    ]);

  useEffect(
    () => () => {
      clientRef.current?.disconnect();
    },
    []
  );

  const connect = async (): Promise<void> => {
    if (url.trim() === '') return;
    const client = createMockMqttClient({
      onConnect: () => setConnected(true),
      onDisconnect: () => setConnected(false),
      onMessage: (topicText, text) => addMessage(topicText, text),
    });
    clientRef.current = client;
    await client.connect();
  };

  const disconnect = (): void => {
    clientRef.current?.disconnect();
    clientRef.current = null;
  };

  const subscribe = async (): Promise<void> => {
    const trimmed = topic.trim();
    if (trimmed === '' || !connected) return;
    await clientRef.current?.subscribe(trimmed);
    if (!subscriptions.includes(trimmed)) {
      setSubscriptions((prev) => [...prev, trimmed]);
    }
  };

  const publish = async (): Promise<void> => {
    const trimmed = publishTopic.trim();
    if (trimmed === '' || !connected) return;
    await clientRef.current?.publish(trimmed, message);
    setMessages((prev) => [
      {
        id: uid(),
        direction: 'sent',
        text: `[${trimmed}] ${message}`,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="MQTT broker URL"
          placeholder="wss://broker.example.com:8884/mqtt"
          className="input input-bordered input-sm flex-1 font-mono"
        />
        {connected ? (
          <button
            type="button"
            onClick={disconnect}
            className="btn btn-outline btn-error btn-sm">
            Disconnect
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void connect()}
            className="btn btn-primary btn-sm">
            Connect
          </button>
        )}
      </div>

      <span className="badge badge-sm badge-success w-fit">
        {connected ? 'Connected' : 'Disconnected'}
      </span>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic to subscribe"
          aria-label="Subscribe topic"
          disabled={!connected}
          className="input input-bordered input-sm flex-1 font-mono"
        />
        <button
          type="button"
          onClick={() => void subscribe()}
          disabled={!connected}
          className="btn btn-outline btn-primary btn-sm gap-1">
          <FiPlus className="size-4" />
          <span>Subscribe</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-1">
        {subscriptions.length === 0 ? (
          <span className="text-base-content/40 text-xs">No subscriptions</span>
        ) : (
          subscriptions.map((sub) => (
            <span key={sub} className="badge badge-ghost badge-sm font-mono">
              {sub}
            </span>
          ))
        )}
      </div>

      <div className="bg-base-200 flex h-40 flex-col-reverse gap-1 overflow-y-auto rounded-lg p-3 font-mono text-xs">
        {messages.length === 0 ? (
          <span className="text-base-content/40">
            No messages yet. Subscribe and publish to see traffic.
          </span>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`whitespace-pre-wrap ${
                msg.direction === 'sent'
                  ? 'text-primary'
                  : 'text-base-content/80'
              }`}>
              <span className="mr-2 select-none">
                {msg.direction === 'sent' ? '→' : '←'}
              </span>
              {msg.text}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={publishTopic}
          onChange={(e) => setPublishTopic(e.target.value)}
          placeholder="Topic"
          aria-label="Publish topic"
          disabled={!connected}
          className="input input-bordered input-sm flex-1 font-mono"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          aria-label="Publish message"
          disabled={!connected}
          className="input input-bordered input-sm flex-1 font-mono"
        />
        <button
          type="button"
          onClick={() => void publish()}
          disabled={!connected}
          className="btn btn-primary btn-sm gap-1">
          <FiSend className="size-4" />
          <span>Publish</span>
        </button>
      </div>
    </div>
  );
};

MqttPanel.displayName = 'MqttPanel';

export { MqttPanel };
