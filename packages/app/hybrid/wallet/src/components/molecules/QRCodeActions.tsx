import { FC } from 'react';
import { FiSmartphone, FiCamera } from 'react-icons/fi';

interface QRCodeActionsProps {
  onShowQR: () => void;
}

const QRCodeActions: FC<QRCodeActionsProps> = ({ onShowQR }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        className="card bg-base-200 shadow-md hover:shadow-lg"
        onClick={onShowQR}>
        <div className="card-body items-center gap-2">
          <FiSmartphone className="text-4xl" />
          <p className="font-medium">Show QR Code</p>
          <p className="text-base-content/60 text-xs">
            Let others scan to pay you
          </p>
        </div>
      </button>

      <button className="card bg-base-200 shadow-md hover:shadow-lg">
        <div className="card-body items-center gap-2">
          <FiCamera className="text-4xl" />
          <p className="font-medium">Scan QR Code</p>
          <p className="text-base-content/60 text-xs">Scan to make a payment</p>
        </div>
      </button>
    </div>
  );
};

export default QRCodeActions;
