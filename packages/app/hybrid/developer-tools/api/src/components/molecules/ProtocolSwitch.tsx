'use client';

import { RequestProtocol } from '@/types/api-client';
import { type FC } from 'react';
import { FiGlobe, FiRadio, FiZap } from 'react-icons/fi';

const PROTOCOLS: readonly {
  id: RequestProtocol;
  label: string;
  icon: FC<{ className?: string }>;
}[] = [
  { id: 'http', label: 'HTTP', icon: FiGlobe },
  { id: 'websocket', label: 'WS', icon: FiZap },
  { id: 'grpc', label: 'gRPC', icon: FiRadio },
  { id: 'mqtt', label: 'MQTT', icon: FiRadio },
];

interface ProtocolSwitchProps {
  value: RequestProtocol;
  onChange: (protocol: RequestProtocol) => void;
}

export const ProtocolSwitch: FC<ProtocolSwitchProps> = ({
  value,
  onChange,
}) => (
  <div className="tabs tabs-boxed tabs-sm w-fit">
    {PROTOCOLS.map((protocol) => {
      const Icon = protocol.icon;
      return (
        <button
          key={protocol.id}
          type="button"
          onClick={() => onChange(protocol.id)}
          aria-pressed={value === protocol.id}
          className={`tab gap-1 ${value === protocol.id ? 'tab-active' : ''}`}>
          <Icon className="size-4" />
          <span>{protocol.label}</span>
        </button>
      );
    })}
  </div>
);

ProtocolSwitch.displayName = 'ProtocolSwitch';
