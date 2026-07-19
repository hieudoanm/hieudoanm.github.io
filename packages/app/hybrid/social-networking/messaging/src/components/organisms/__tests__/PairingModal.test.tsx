import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { PairingModal } from '@/components/organisms/PairingModal';

const mockOnClose = jest.fn();
const mockOnPaired = jest.fn();

let mockOnStateCb: ((s: string) => void) | null = null;
let mockOnDataCb:
  ((msg: { channel: string; payload: unknown }) => void) | null = null;

const mockPeer = {
  onState: jest.fn((cb: (s: string) => void) => {
    mockOnStateCb = cb;
  }),
  onData: jest.fn(
    (cb: (msg: { channel: string; payload: unknown }) => void) => {
      mockOnDataCb = cb;
    }
  ),
  createOffer: jest
    .fn()
    .mockResolvedValue({ type: 'offer', sdp: 'mock-offer-sdp' }),
  acceptAnswer: jest.fn().mockResolvedValue(undefined),
  acceptOffer: jest
    .fn()
    .mockResolvedValue({ type: 'answer', sdp: 'mock-answer-sdp' }),
  onRemoteDataChannel: jest.fn(),
  close: jest.fn(),
};

jest.mock('@/lib/webrtc', () => ({
  PeerConnection: jest.fn().mockImplementation(() => mockPeer),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
  ),
}));

const OFFER_SDP = JSON.stringify({ type: 'offer', sdp: 'mock-offer-sdp' });
const ANSWER_SDP = JSON.stringify({ type: 'answer', sdp: 'mock-answer-sdp' });

beforeEach(() => {
  jest.clearAllMocks();
  mockOnStateCb = null;
  mockOnDataCb = null;
  mockPeer.onState.mockImplementation((cb: (s: string) => void) => {
    mockOnStateCb = cb;
  });
  mockPeer.onData.mockImplementation(
    (cb: (msg: { channel: string; payload: unknown }) => void) => {
      mockOnDataCb = cb;
    }
  );
  mockPeer.createOffer.mockResolvedValue({
    type: 'offer',
    sdp: 'mock-offer-sdp',
  });
  mockPeer.acceptAnswer.mockResolvedValue(undefined);
  mockPeer.acceptOffer.mockResolvedValue({
    type: 'answer',
    sdp: 'mock-answer-sdp',
  });
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: jest.fn().mockResolvedValue(undefined),
      readText: jest.fn().mockResolvedValue(''),
    },
    writable: true,
  });
});

const clickGenerateOffer = async () => {
  await act(async () => {
    fireEvent.click(screen.getByText(/Generate QR \/ Offer/));
  });
  await waitFor(() => {
    expect(screen.getByText(/Complete Pairing/)).toBeInTheDocument();
  });
};

const renderModal = (overrides?: {
  onClose?: jest.Mock;
  onPaired?: jest.Mock;
}) => {
  return render(
    <PairingModal
      onClose={overrides?.onClose ?? mockOnClose}
      onPaired={overrides?.onPaired ?? mockOnPaired}
    />
  );
};

describe('PairingModal', () => {
  describe('rendering', () => {
    it('renders the Pair Device heading', () => {
      renderModal();
      expect(screen.getByText('Pair Device')).toBeInTheDocument();
    });

    it('renders close button with FaTimes icon', () => {
      const { container } = renderModal();
      const btn = container.querySelector('button.btn-ghost');
      expect(btn).toBeInTheDocument();
    });

    it('renders description text in choose step', () => {
      renderModal();
      expect(
        screen.getByText(/Connect to another device using WebRTC/)
      ).toBeInTheDocument();
    });

    it('renders Generate QR / Offer button', () => {
      renderModal();
      expect(screen.getByText(/Generate QR \/ Offer/)).toBeInTheDocument();
    });

    it('renders offer paste textarea', () => {
      renderModal();
      expect(
        screen.getByPlaceholderText(/Paste SDP offer here/)
      ).toBeInTheDocument();
    });

    it('renders disabled Accept Offer button when textarea is empty', () => {
      renderModal();
      const btn = screen.getByText(/Accept Offer & Generate Answer/);
      expect(btn).toBeDisabled();
    });

    it('renders divider text', () => {
      renderModal();
      expect(screen.getByText('or paste an offer')).toBeInTheDocument();
    });
  });

  describe('close button', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();
      const { container } = renderModal({ onClose });
      const btn = container.querySelector('button.btn-ghost');
      fireEvent.click(btn!);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('choose step - generate offer', () => {
    it('transitions to offer step and creates PeerConnection', async () => {
      const { PeerConnection } = jest.requireMock('@/lib/webrtc');
      renderModal();

      await clickGenerateOffer();

      expect(PeerConnection).toHaveBeenCalled();
      expect(mockPeer.onState).toHaveBeenCalled();
      expect(mockPeer.onData).toHaveBeenCalled();
      expect(mockPeer.onRemoteDataChannel).toHaveBeenCalled();
    });

    it('displays serialized offer SDP in textarea', async () => {
      renderModal();

      await clickGenerateOffer();

      const readOnly = document.querySelector('textarea[readonly]');
      expect(readOnly).toBeInTheDocument();
      expect(readOnly).toHaveTextContent(OFFER_SDP);
    });

    it('displays QR code image in offer step', async () => {
      renderModal();

      await clickGenerateOffer();

      expect(screen.getByAltText('QR Code')).toBeInTheDocument();
    });

    it('displays answer paste area in offer step', async () => {
      renderModal();

      await clickGenerateOffer();

      expect(
        screen.getByPlaceholderText(/Paste SDP answer/)
      ).toBeInTheDocument();
    });

    it('displays paste the answer divider in offer step', async () => {
      renderModal();

      await clickGenerateOffer();

      expect(
        screen.getByText(/paste the answer from the other device/)
      ).toBeInTheDocument();
    });

    it('shows description in offer step', async () => {
      renderModal();

      await clickGenerateOffer();

      expect(
        screen.getByText(/Share this QR code or SDP offer/)
      ).toBeInTheDocument();
    });
  });

  describe('choose step - accept offer', () => {
    it('enables Accept Offer button when offer text is pasted', () => {
      renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);
      fireEvent.change(textarea, { target: { value: OFFER_SDP } });
      const btn = screen.getByText(/Accept Offer & Generate Answer/);
      expect(btn).not.toBeDisabled();
    });

    it('calls generateAnswer with pasted offer when Accept Offer is clicked', async () => {
      const { PeerConnection } = jest.requireMock('@/lib/webrtc');
      renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);

      await act(async () => {
        fireEvent.change(textarea, { target: { value: OFFER_SDP } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Accept Offer & Generate Answer/));
      });

      await waitFor(() => {
        expect(PeerConnection).toHaveBeenCalled();
      });
      expect(mockPeer.acceptOffer).toHaveBeenCalledWith({
        type: 'offer',
        sdp: 'mock-offer-sdp',
      });
    });

    it('displays answer SDP in answer step after accepting offer', async () => {
      renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);

      await act(async () => {
        fireEvent.change(textarea, { target: { value: OFFER_SDP } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Accept Offer & Generate Answer/));
      });

      await waitFor(() => {
        const readOnly = document.querySelector('textarea[readonly]');
        expect(readOnly).toHaveTextContent(ANSWER_SDP);
      });
    });

    it('shows answer step description', async () => {
      renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);

      await act(async () => {
        fireEvent.change(textarea, { target: { value: OFFER_SDP } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Accept Offer & Generate Answer/));
      });

      await waitFor(() => {
        expect(
          screen.getByText(/Share this SDP answer with the first device/)
        ).toBeInTheDocument();
      });
    });

    it('handles invalid JSON in pasted offer gracefully', async () => {
      const { PeerConnection } = jest.requireMock('@/lib/webrtc');
      renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);

      await act(async () => {
        fireEvent.change(textarea, { target: { value: 'not-valid-json' } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Accept Offer & Generate Answer/));
      });

      await waitFor(() => {
        expect(PeerConnection).toHaveBeenCalled();
      });
      expect(mockPeer.acceptOffer).not.toHaveBeenCalled();
    });
  });

  describe('copy to clipboard', () => {
    it('copies offer SDP to clipboard when copy button is clicked', async () => {
      const writeTextMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: writeTextMock,
          readText: jest.fn().mockResolvedValue(''),
        },
        writable: true,
      });

      const { container } = renderModal();

      await clickGenerateOffer();

      const copyBtn = container.querySelector('button.btn-ghost.absolute');
      await act(async () => {
        fireEvent.click(copyBtn!);
      });

      expect(writeTextMock).toHaveBeenCalledWith(OFFER_SDP);
    });

    it('shows check icon after copying offer SDP', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: jest.fn().mockResolvedValue(undefined),
          readText: jest.fn().mockResolvedValue(''),
        },
        writable: true,
      });

      const { container } = renderModal();

      await clickGenerateOffer();

      const copyBtn = container.querySelector('button.btn-ghost.absolute');
      await act(async () => {
        fireEvent.click(copyBtn!);
      });

      await waitFor(() => {
        const btns = container.querySelectorAll('button.btn-ghost.absolute');
        const lastBtn = btns[btns.length - 1];
        expect(lastBtn).toContainHTML('svg');
      });
    });

    it('copies answer SDP to clipboard in answer step', async () => {
      const writeTextMock = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: writeTextMock,
          readText: jest.fn().mockResolvedValue(''),
        },
        writable: true,
      });

      const { container } = renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);

      await act(async () => {
        fireEvent.change(textarea, { target: { value: OFFER_SDP } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Accept Offer & Generate Answer/));
      });

      await waitFor(() => {
        const readOnly = document.querySelector('textarea[readonly]');
        expect(readOnly).toHaveTextContent(ANSWER_SDP);
      });

      const copyBtn = container.querySelector('button.btn-ghost.absolute');
      await act(async () => {
        fireEvent.click(copyBtn!);
      });

      expect(writeTextMock).toHaveBeenCalledWith(ANSWER_SDP);
    });

    it('resets copied state after 2 seconds', async () => {
      jest.useFakeTimers();
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: jest.fn().mockResolvedValue(undefined),
          readText: jest.fn().mockResolvedValue(''),
        },
        writable: true,
      });

      const { container } = renderModal();

      await clickGenerateOffer();

      const copyBtn = container.querySelector('button.btn-ghost.absolute');

      await act(async () => {
        fireEvent.click(copyBtn!);
      });

      const btnsAfterCopy = container.querySelectorAll(
        'button.btn-ghost.absolute'
      );
      const copiedBtn = btnsAfterCopy[btnsAfterCopy.length - 1];
      expect(copiedBtn).toContainHTML('svg');

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      const btnsAfterReset = container.querySelectorAll(
        'button.btn-ghost.absolute'
      );
      const resetBtn = btnsAfterReset[btnsAfterReset.length - 1];
      expect(resetBtn).toContainHTML('svg');

      jest.useRealTimers();
    });
  });

  describe('paste from clipboard', () => {
    it('reads clipboard when paste button is clicked in offer step', async () => {
      const readTextMock = jest.fn().mockResolvedValue('pasted-sdp-data');
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: jest.fn().mockResolvedValue(undefined),
          readText: readTextMock,
        },
        writable: true,
      });

      const { container } = renderModal();

      await clickGenerateOffer();

      const pasteBtn = container.querySelector('button.btn-ghost.self-start');
      await act(async () => {
        fireEvent.click(pasteBtn!);
      });

      expect(readTextMock).toHaveBeenCalled();
    });
  });

  describe('accept answer flow', () => {
    it('enables Complete Pairing button when answer is pasted', async () => {
      renderModal();

      await clickGenerateOffer();

      const btn = screen.getByText(/Complete Pairing/);
      expect(btn).toBeDisabled();

      const answerTextarea = screen.getByPlaceholderText(/Paste SDP answer/);
      fireEvent.change(answerTextarea, { target: { value: 'some-answer' } });
      expect(btn).not.toBeDisabled();
    });

    it('calls acceptAnswer and transitions to connecting step', async () => {
      renderModal();

      await clickGenerateOffer();

      const answerTextarea = screen.getByPlaceholderText(/Paste SDP answer/);

      await act(async () => {
        fireEvent.change(answerTextarea, {
          target: { value: '{"type":"answer","sdp":"x"}' },
        });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Complete Pairing/));
      });

      await waitFor(() => {
        expect(mockPeer.acceptAnswer).toHaveBeenCalledWith({
          type: 'answer',
          sdp: 'x',
        });
      });
      expect(screen.getByText(/Connecting/)).toBeInTheDocument();
    });

    it('does nothing when Complete Pairing is clicked with empty pasted', async () => {
      renderModal();

      await clickGenerateOffer();

      fireEvent.click(screen.getByText(/Complete Pairing/));
      expect(mockPeer.acceptAnswer).not.toHaveBeenCalled();
    });

    it('handles invalid JSON in pasted answer gracefully', async () => {
      renderModal();

      await clickGenerateOffer();

      const answerTextarea = screen.getByPlaceholderText(/Paste SDP answer/);

      await act(async () => {
        fireEvent.change(answerTextarea, {
          target: { value: '{invalid json' },
        });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Complete Pairing/));
      });

      expect(mockPeer.acceptAnswer).not.toHaveBeenCalled();
      expect(screen.queryByText(/Connecting/)).not.toBeInTheDocument();
    });
  });

  describe('connecting step', () => {
    it('shows connecting state with spinner and connection info', async () => {
      renderModal();

      await clickGenerateOffer();

      const answerTextarea = screen.getByPlaceholderText(/Paste SDP answer/);

      await act(async () => {
        fireEvent.change(answerTextarea, {
          target: { value: '{"type":"answer","sdp":"x"}' },
        });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Complete Pairing/));
      });

      await waitFor(() => {
        expect(screen.getByText(/Connecting/)).toBeInTheDocument();
      });
      expect(
        screen.getByText(/Waiting for peer to confirm/)
      ).toBeInTheDocument();
    });

    it('displays connection state text', async () => {
      renderModal();

      await clickGenerateOffer();

      const answerTextarea = screen.getByPlaceholderText(/Paste SDP answer/);

      await act(async () => {
        fireEvent.change(answerTextarea, {
          target: { value: '{"type":"answer","sdp":"x"}' },
        });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Complete Pairing/));
      });

      await waitFor(() => {
        expect(screen.getByText(/new/)).toBeInTheDocument();
      });
    });
  });

  describe('done step', () => {
    it('transitions to done step via offer flow', async () => {
      renderModal();

      await clickGenerateOffer();

      act(() => {
        mockOnDataCb?.({ channel: 'presence', payload: { type: 'paired' } });
      });

      await waitFor(() => {
        expect(screen.getByText('Paired!')).toBeInTheDocument();
      });
      expect(mockOnPaired).toHaveBeenCalledWith(
        'peer-device',
        'peer-public-key'
      );
    });

    it('transitions to done step via answer flow', async () => {
      renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);

      await act(async () => {
        fireEvent.change(textarea, { target: { value: OFFER_SDP } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Accept Offer & Generate Answer/));
      });

      await waitFor(() => {
        expect(document.querySelector('textarea[readonly]')).toHaveTextContent(
          ANSWER_SDP
        );
      });

      act(() => {
        mockOnDataCb?.({ channel: 'presence', payload: { type: 'paired' } });
      });

      await waitFor(() => {
        expect(screen.getByText('Paired!')).toBeInTheDocument();
      });
      expect(mockOnPaired).toHaveBeenCalledWith(
        'peer-device',
        'peer-public-key'
      );
    });

    it('shows success description in done step', async () => {
      renderModal();

      await clickGenerateOffer();

      act(() => {
        mockOnDataCb?.({ channel: 'presence', payload: { type: 'paired' } });
      });

      await waitFor(() => {
        expect(
          screen.getByText(
            /Devices are now connected via encrypted DataChannels/
          )
        ).toBeInTheDocument();
      });
    });

    it('Done button calls onClose', async () => {
      const onClose = jest.fn();
      renderModal({ onClose });

      await clickGenerateOffer();

      act(() => {
        mockOnDataCb?.({ channel: 'presence', payload: { type: 'paired' } });
      });

      const doneBtn = await screen.findByText('Done');
      fireEvent.click(doneBtn);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('cleanup', () => {
    it('calls peer.close on unmount', async () => {
      const { unmount } = renderModal();

      await clickGenerateOffer();

      unmount();
      expect(mockPeer.close).toHaveBeenCalled();
    });
  });

  describe('state callbacks', () => {
    it('ignores non-paired messages in answer flow onData callback', async () => {
      renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);

      await act(async () => {
        fireEvent.change(textarea, { target: { value: OFFER_SDP } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Accept Offer & Generate Answer/));
      });

      await waitFor(() => {
        expect(document.querySelector('textarea[readonly]')).toHaveTextContent(
          ANSWER_SDP
        );
      });

      act(() => {
        mockOnDataCb?.({ channel: 'other', payload: { type: 'something' } });
      });

      expect(screen.queryByText('Paired!')).not.toBeInTheDocument();
      expect(mockOnPaired).not.toHaveBeenCalled();

      act(() => {
        mockOnDataCb?.({ channel: 'presence', payload: { type: 'other' } });
      });

      expect(screen.queryByText('Paired!')).not.toBeInTheDocument();
      expect(mockOnPaired).not.toHaveBeenCalled();
    });

    it('updates connState via onState callback', async () => {
      renderModal();

      await clickGenerateOffer();

      act(() => {
        mockOnStateCb?.('connected');
      });

      const answerTextarea = screen.getByPlaceholderText(/Paste SDP answer/);

      await act(async () => {
        fireEvent.change(answerTextarea, {
          target: { value: '{"type":"answer","sdp":"x"}' },
        });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Complete Pairing/));
      });

      await waitFor(() => {
        expect(screen.getByText(/connected/)).toBeInTheDocument();
      });
    });

    it('ignores non-paired messages in onData callback', async () => {
      renderModal();

      await clickGenerateOffer();

      act(() => {
        mockOnDataCb?.({ channel: 'other', payload: { type: 'something' } });
      });

      expect(screen.queryByText('Paired!')).not.toBeInTheDocument();
      expect(mockOnPaired).not.toHaveBeenCalled();
    });

    it('ignores presence channel with non-paired type', async () => {
      renderModal();

      await clickGenerateOffer();

      act(() => {
        mockOnDataCb?.({ channel: 'presence', payload: { type: 'other' } });
      });

      expect(screen.queryByText('Paired!')).not.toBeInTheDocument();
      expect(mockOnPaired).not.toHaveBeenCalled();
    });

    it('ignores presence channel with undefined type in payload', async () => {
      renderModal();

      await clickGenerateOffer();

      act(() => {
        mockOnDataCb?.({ channel: 'presence', payload: {} });
      });

      expect(screen.queryByText('Paired!')).not.toBeInTheDocument();
      expect(mockOnPaired).not.toHaveBeenCalled();
    });
  });

  describe('text input interactions', () => {
    it('updates pasted state when typing in offer textarea', () => {
      renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);
      fireEvent.change(textarea, { target: { value: 'test-value' } });
      expect(textarea).toHaveValue('test-value');
    });

    it('updates pasted state when typing in answer textarea in offer step', async () => {
      renderModal();

      await clickGenerateOffer();

      const textarea = screen.getByPlaceholderText(/Paste SDP answer/);
      fireEvent.change(textarea, { target: { value: 'answer-data' } });
      expect(textarea).toHaveValue('answer-data');
    });

    it('Accept Offer button stays disabled with whitespace-only input', () => {
      renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);
      fireEvent.change(textarea, { target: { value: '   ' } });
      const btn = screen.getByText(/Accept Offer & Generate Answer/);
      expect(btn).toBeDisabled();
    });
  });

  describe('QR code rendering', () => {
    it('renders QR code with correct src attribute', async () => {
      renderModal();

      await clickGenerateOffer();

      const img = screen.getByAltText('QR Code');
      expect(img).toHaveAttribute(
        'src',
        expect.stringContaining('qrserver.com')
      );
    });
  });

  describe('step visibility', () => {
    it('does not show offer step content initially', () => {
      renderModal();
      expect(screen.queryByText(/Share this QR code/)).not.toBeInTheDocument();
      expect(screen.queryByText('Complete Pairing')).not.toBeInTheDocument();
    });

    it('does not show answer step content initially', () => {
      renderModal();
      expect(
        screen.queryByText(/Share this SDP answer/)
      ).not.toBeInTheDocument();
    });

    it('does not show connecting content initially', () => {
      renderModal();
      expect(screen.queryByText(/Connecting/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Waiting for peer/)).not.toBeInTheDocument();
    });

    it('does not show done content initially', () => {
      renderModal();
      expect(screen.queryByText('Paired!')).not.toBeInTheDocument();
      expect(screen.queryByText('Done')).not.toBeInTheDocument();
    });

    it('hides choose step content when in offer step', async () => {
      renderModal();

      await clickGenerateOffer();

      expect(
        screen.queryByPlaceholderText(/Paste SDP offer here/)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Accept Offer & Generate Answer/)
      ).not.toBeInTheDocument();
    });

    it('hides choose step content when in answer step', async () => {
      renderModal();
      const textarea = screen.getByPlaceholderText(/Paste SDP offer here/);

      await act(async () => {
        fireEvent.change(textarea, { target: { value: OFFER_SDP } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText(/Accept Offer & Generate Answer/));
      });

      await waitFor(() => {
        expect(
          screen.queryByPlaceholderText(/Paste SDP offer here/)
        ).not.toBeInTheDocument();
      });
    });
  });
});
