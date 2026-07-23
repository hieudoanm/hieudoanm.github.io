import { FC } from 'react';
import { useData } from '@/providers/DataProvider';

interface QRCodeModalProps {
  open: boolean;
  onClose: () => void;
}

const QRCodeModal: FC<QRCodeModalProps> = ({ open, onClose }) => {
  const { user } = useData();
  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Your QR Code</h3>
        <div className="bg-base-100 my-4 flex items-center justify-center rounded-lg p-8">
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-sm ${
                  i % 3 === 0 ? 'bg-black' : 'bg-white'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-base-content/60 text-center text-sm">
          Scan this code to pay {user?.name ?? 'User'}
        </p>
        <div className="modal-action">
          <button
            className="btn"
            onClick={onClose}
            aria-label="Close QR code modal">
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default QRCodeModal;
