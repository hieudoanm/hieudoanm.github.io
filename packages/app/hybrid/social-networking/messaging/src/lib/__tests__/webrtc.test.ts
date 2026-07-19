const mockSend = jest.fn();
const mockClose = jest.fn();
const mockCreateOffer = jest
  .fn()
  .mockResolvedValue({ type: 'offer', sdp: 'mock-sdp' });
const mockCreateAnswer = jest
  .fn()
  .mockResolvedValue({ type: 'answer', sdp: 'mock-answer' });
const mockSetLocalDescription = jest.fn().mockResolvedValue(undefined);
const mockSetRemoteDescription = jest.fn().mockResolvedValue(undefined);
const mockAddIceCandidate = jest.fn().mockResolvedValue(undefined);
const mockRestartIce = jest.fn();

const createMockDataChannel = (label: string) => ({
  send: mockSend,
  readyState: 'open',
  close: mockClose,
  label,
  onmessage: null as ((e: unknown) => void) | null,
  onopen: null as (() => void) | null,
  onclose: null as (() => void) | null,
});

let channels: Record<string, ReturnType<typeof createMockDataChannel>> = {};

class MockRTCPeerConnection {
  static lastInstance: MockRTCPeerConnection | null = null;
  localDescription: any = null;
  oniceconnectionstatechange: (() => void) | null = null;
  ondatachannel: ((e: any) => void) | null = null;
  iceConnectionState = 'new';

  constructor() {
    MockRTCPeerConnection.lastInstance = this;
  }

  async createOffer() {
    return mockCreateOffer();
  }
  async createAnswer() {
    return mockCreateAnswer();
  }
  async setLocalDescription(desc: any) {
    this.localDescription = desc;
    mockSetLocalDescription(desc);
  }
  async setRemoteDescription(desc: any) {
    mockSetRemoteDescription(desc);
  }
  async addIceCandidate(c: any) {
    mockAddIceCandidate(c);
  }
  createDataChannel(label: string) {
    const ch = createMockDataChannel(label);
    channels[label] = ch;
    return ch;
  }
  close() {
    mockClose();
  }
  restartIce() {
    mockRestartIce();
  }
}

(globalThis as any).RTCPeerConnection = MockRTCPeerConnection;

import {
  DEFAULT_ICE_SERVERS,
  PeerConnection,
  generateDeviceId,
  createSyncPayload,
} from '@/lib/webrtc';

describe('webrtc', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    channels = {};
    MockRTCPeerConnection.lastInstance = null;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('DEFAULT_ICE_SERVERS', () => {
    it('has STUN servers', () => {
      expect(DEFAULT_ICE_SERVERS.length).toBeGreaterThan(0);
      for (const server of DEFAULT_ICE_SERVERS) {
        expect(server.urls).toMatch(/^stun:/);
      }
    });
  });

  describe('PeerConnection', () => {
    it('starts in new state', () => {
      const pc = new PeerConnection();
      expect(pc.getConnectionState()).toBe('new');
    });

    it('accepts custom ice servers', async () => {
      const pc = new PeerConnection([{ urls: 'stun:custom.server:3478' }]);
      await pc.createOffer();
      expect(pc.getConnectionState()).not.toBe('failed');
    });

    it('accepts custom reconnect config', () => {
      const pc = new PeerConnection(DEFAULT_ICE_SERVERS, {
        initialDelayMs: 100,
        maxRetries: 3,
        multiplier: 1.5,
        maxDelayMs: 5000,
      });
      expect(pc.getRetryCount()).toBe(0);
    });

    it('createOffer creates peer, opens channels, returns offer', async () => {
      const pc = new PeerConnection();
      const offer = await pc.createOffer();
      expect(offer.type).toBe('offer');
      expect(offer.sdp).toBe('mock-sdp');
      expect(Object.keys(channels).length).toBe(4);
      expect(mockSetLocalDescription).toHaveBeenCalled();
    });

    it('acceptAnswer throws if no local peer', async () => {
      const pc = new PeerConnection();
      await expect(
        pc.acceptAnswer({ type: 'answer', sdp: 'x' })
      ).rejects.toThrow('No local peer');
    });

    it('acceptAnswer works when peer exists', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();
      await pc.acceptAnswer({ type: 'answer', sdp: 'x' });
      expect(mockSetRemoteDescription).toHaveBeenCalledWith({
        type: 'answer',
        sdp: 'x',
      });
    });

    it('acceptOffer creates peer, opens channels, returns answer', async () => {
      const pc = new PeerConnection();
      const answer = await pc.acceptOffer({ type: 'offer', sdp: 'x' });
      expect(answer.type).toBe('answer');
      expect(answer.sdp).toBe('mock-answer');
      expect(Object.keys(channels).length).toBe(4);
      expect(mockSetRemoteDescription).toHaveBeenCalledWith({
        type: 'offer',
        sdp: 'x',
      });
      expect(mockSetLocalDescription).toHaveBeenCalled();
    });

    it('send sends message on open channel', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();
      pc.send('messaging', { text: 'hi' });
      expect(mockSend).toHaveBeenCalledWith(
        JSON.stringify({ channel: 'messaging', payload: { text: 'hi' } })
      );
    });

    it('send sends on presence channel', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();
      pc.send('presence', { online: true });
      expect(mockSend).toHaveBeenCalledWith(
        JSON.stringify({ channel: 'presence', payload: { online: true } })
      );
    });

    it('send sends on typing channel', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();
      pc.send('typing', { chatId: 'c1' });
      expect(mockSend).toHaveBeenCalledWith(
        JSON.stringify({ channel: 'typing', payload: { chatId: 'c1' } })
      );
    });

    it('send sends on receipts channel', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();
      pc.send('receipts', { messageId: 'm1' });
      expect(mockSend).toHaveBeenCalledWith(
        JSON.stringify({ channel: 'receipts', payload: { messageId: 'm1' } })
      );
    });

    it('send is no-op if channel not found', () => {
      const pc = new PeerConnection();
      expect(() => pc.send('messaging', {})).not.toThrow();
      expect(mockSend).not.toHaveBeenCalled();
    });

    it('send is no-op if channel readyState is not open', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();
      channels['messaging'].readyState = 'closing';
      mockSend.mockClear();
      pc.send('messaging', { text: 'hi' });
      expect(mockSend).not.toHaveBeenCalled();
    });

    it('getConnectionState returns current state', () => {
      const pc = new PeerConnection();
      expect(pc.getConnectionState()).toBe('new');
    });

    it('getRetryCount returns 0 initially', () => {
      const pc = new PeerConnection();
      expect(pc.getRetryCount()).toBe(0);
    });

    it('close sets state to closed and cleans up', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();
      pc.close();
      expect(pc.getConnectionState()).toBe('closed');
      expect(mockClose).toHaveBeenCalled();
    });

    it('close clears reconnect timer if set', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();

      const peer = MockRTCPeerConnection.lastInstance!;
      peer.iceConnectionState = 'disconnected';
      peer.oniceconnectionstatechange?.();
      expect(pc.getRetryCount()).toBe(1);

      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      pc.close();
      expect(clearTimeoutSpy).toHaveBeenCalled();
      clearTimeoutSpy.mockRestore();
    });

    it('onState callback is invoked on state changes', async () => {
      const cb = jest.fn();
      const pc = new PeerConnection();
      pc.onState(cb);
      await pc.createOffer();
      pc.close();
      expect(cb).toHaveBeenCalledWith('closed');
    });

    it('onData callback receives parsed messages from openChannels', async () => {
      const cb = jest.fn();
      const pc = new PeerConnection();
      pc.onData(cb);
      await pc.createOffer();

      const ch = channels['messaging'];
      const testMsg = { channel: 'messaging', payload: { text: 'test' } };
      ch.onmessage!({ data: JSON.stringify(testMsg) });
      expect(cb).toHaveBeenCalledWith(testMsg);
    });

    it('malformed JSON in channel onmessage is silently ignored', async () => {
      const cb = jest.fn();
      const pc = new PeerConnection();
      pc.onData(cb);
      await pc.createOffer();

      const ch = channels['messaging'];
      ch.onmessage!({ data: 'not-valid-json' });
      expect(cb).not.toHaveBeenCalled();
    });

    it('ondatachannel handler receives remote data channels', async () => {
      const cb = jest.fn();
      const pc = new PeerConnection();
      pc.onData(cb);
      await pc.acceptOffer({ type: 'offer', sdp: 'x' });
      pc.onRemoteDataChannel();

      const peer = MockRTCPeerConnection.lastInstance!;
      const fakeChannel: any = {
        label: 'messaging',
        onmessage: null,
        onopen: null,
      };
      peer.ondatachannel?.({ channel: fakeChannel });

      const testMsg = { channel: 'messaging', payload: { text: 'remote' } };
      fakeChannel.onmessage({ data: JSON.stringify(testMsg) });
      expect(cb).toHaveBeenCalledWith(testMsg);
    });

    it('malformed JSON in remote data channel is silently ignored', async () => {
      const cb = jest.fn();
      const pc = new PeerConnection();
      pc.onData(cb);
      await pc.acceptOffer({ type: 'offer', sdp: 'x' });
      pc.onRemoteDataChannel();

      const peer = MockRTCPeerConnection.lastInstance!;
      const fakeChannel: any = {
        label: 'messaging',
        onmessage: null,
        onopen: null,
      };
      peer.ondatachannel?.({ channel: fakeChannel });

      fakeChannel.onmessage({ data: 'bad-json' });
      expect(cb).not.toHaveBeenCalled();
    });

    it('remote data channel onopen triggers connected state', async () => {
      const pc = new PeerConnection();
      await pc.acceptOffer({ type: 'offer', sdp: 'x' });
      pc.onRemoteDataChannel();

      const peer = MockRTCPeerConnection.lastInstance!;
      const fakeChannel: any = {
        label: 'messaging',
        onmessage: null,
        onopen: null,
      };
      peer.ondatachannel?.({ channel: fakeChannel });

      fakeChannel.onopen();
      expect(pc.getConnectionState()).toBe('connected');
    });

    it('onRemoteDataChannel is no-op if no pc', () => {
      const pc = new PeerConnection();
      expect(() => pc.onRemoteDataChannel()).not.toThrow();
    });

    it('ICE connected triggers connected state', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();

      const peer = MockRTCPeerConnection.lastInstance!;
      peer.iceConnectionState = 'connected';
      peer.oniceconnectionstatechange?.();
      expect(pc.getConnectionState()).toBe('connected');
    });

    it('ICE disconnected triggers disconnected and scheduleReconnect', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();

      const peer = MockRTCPeerConnection.lastInstance!;
      peer.iceConnectionState = 'disconnected';
      peer.oniceconnectionstatechange?.();
      expect(pc.getConnectionState()).toBe('disconnected');
    });

    it('ICE failed triggers failed state and scheduleReconnect', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();

      const peer = MockRTCPeerConnection.lastInstance!;
      peer.iceConnectionState = 'failed';
      peer.oniceconnectionstatechange?.();
      expect(pc.getConnectionState()).toBe('failed');
    });

    it('scheduleReconnect increments retry count and restarts ice', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();

      const peer = MockRTCPeerConnection.lastInstance!;
      peer.iceConnectionState = 'disconnected';
      peer.oniceconnectionstatechange?.();

      expect(pc.getRetryCount()).toBe(1);

      jest.runOnlyPendingTimers();
      expect(mockRestartIce).toHaveBeenCalled();
      expect(pc.getConnectionState()).toBe('connecting');
    });

    it('scheduleReconnect stops at max retries', async () => {
      const pc = new PeerConnection(DEFAULT_ICE_SERVERS, { maxRetries: 2 });
      await pc.createOffer();

      const peer = MockRTCPeerConnection.lastInstance!;

      peer.iceConnectionState = 'disconnected';
      peer.oniceconnectionstatechange?.();
      expect(pc.getRetryCount()).toBe(1);

      jest.runOnlyPendingTimers();
      peer.oniceconnectionstatechange?.();
      expect(pc.getRetryCount()).toBe(2);

      jest.runOnlyPendingTimers();
      peer.oniceconnectionstatechange?.();
      expect(pc.getRetryCount()).toBe(2);
    });

    it('reconnect delay uses exponential backoff', async () => {
      const pc = new PeerConnection(DEFAULT_ICE_SERVERS, {
        initialDelayMs: 100,
        multiplier: 2,
        maxDelayMs: 5000,
      });
      await pc.createOffer();

      const peer = MockRTCPeerConnection.lastInstance!;
      peer.iceConnectionState = 'disconnected';
      peer.oniceconnectionstatechange?.();

      expect(pc.getRetryCount()).toBe(1);
      jest.advanceTimersByTime(100);
      expect(mockRestartIce).toHaveBeenCalled();
    });

    it('reconnect delay caps at maxDelayMs', async () => {
      const pc = new PeerConnection(DEFAULT_ICE_SERVERS, {
        initialDelayMs: 1000,
        multiplier: 10,
        maxDelayMs: 3000,
        maxRetries: 5,
      });
      await pc.createOffer();

      const peer = MockRTCPeerConnection.lastInstance!;
      peer.iceConnectionState = 'disconnected';
      peer.oniceconnectionstatechange?.();

      jest.advanceTimersByTime(3000);
      expect(mockRestartIce).toHaveBeenCalled();
    });

    it('ICE completed also sets connected and resets retry count', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();

      const peer = MockRTCPeerConnection.lastInstance!;
      peer.iceConnectionState = 'completed';
      peer.oniceconnectionstatechange?.();
      expect(pc.getConnectionState()).toBe('connected');
      expect(pc.getRetryCount()).toBe(0);
    });

    it('addIceCandidate delegates to pc', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();
      const candidate = {
        candidate: 'candidate:1 1 UDP 2130706431 192.168.1.1 1234 typ host',
        sdpMid: '0',
        sdpMLineIndex: 0,
      };
      await pc.addIceCandidate(candidate);
      expect(mockAddIceCandidate).toHaveBeenCalledWith(candidate);
    });

    it('addIceCandidate is no-op if no pc', async () => {
      const pc = new PeerConnection();
      await expect(
        pc.addIceCandidate({ candidate: 'x' })
      ).resolves.toBeUndefined();
    });

    it('channel onopen triggers connected state', async () => {
      const cb = jest.fn();
      const pc = new PeerConnection();
      pc.onState(cb);
      await pc.createOffer();

      const ch = channels['messaging'];
      ch.onopen!();
      expect(pc.getConnectionState()).toBe('connected');
    });

    it('channel onclose is a no-op', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();
      const ch = channels['messaging'];
      expect(() => ch.onclose!()).not.toThrow();
    });

    it('send on closed channel is no-op', async () => {
      const pc = new PeerConnection();
      await pc.createOffer();
      channels['messaging'].readyState = 'closed';
      mockSend.mockClear();
      pc.send('messaging', { text: 'hi' });
      expect(mockSend).not.toHaveBeenCalled();
    });
  });

  describe('generateDeviceId', () => {
    it('returns 32-char hex string', () => {
      const id = generateDeviceId();
      expect(id).toMatch(/^[0-9a-f]{32}$/);
    });

    it('returns unique ids', () => {
      const id1 = generateDeviceId();
      const id2 = generateDeviceId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('createSyncPayload', () => {
    it('returns correct structure for key-backup', () => {
      const payload = createSyncPayload('dev-1', 'key-backup', { keys: ['a'] });
      expect(payload.deviceId).toBe('dev-1');
      expect(payload.type).toBe('key-backup');
      expect(payload.data).toEqual({ keys: ['a'] });
      expect(typeof payload.timestamp).toBe('number');
      expect(payload.timestamp).toBeGreaterThan(0);
    });

    it('returns correct structure for message-sync', () => {
      const payload = createSyncPayload('dev-2', 'message-sync', {
        messages: [],
      });
      expect(payload.deviceId).toBe('dev-2');
      expect(payload.type).toBe('message-sync');
    });

    it('returns correct structure for presence', () => {
      const payload = createSyncPayload('dev-3', 'presence', { online: true });
      expect(payload.deviceId).toBe('dev-3');
      expect(payload.type).toBe('presence');
      expect(payload.data).toEqual({ online: true });
    });
  });
});
