import type { FC, ReactNode } from 'react';

interface GameInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  instructions: string[];
  visualization: ReactNode;
}

export const GameInstructionsModal: FC<GameInstructionsModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  instructions,
  visualization,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-base-content/50 absolute inset-0" onClick={onClose} />
      <div className="bg-base-100 relative z-10 flex w-full max-w-md flex-col gap-4 rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base-content text-lg font-bold">{title}</h3>
            <p className="text-base-content/40 text-xs">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-xs btn-square text-base opacity-60 hover:opacity-100">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {instructions.map((instruction, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 text-xs font-bold">
                {i + 1}.
              </span>
              <span className="text-base-content/70 text-xs leading-relaxed">
                {instruction}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-base-200 flex items-center justify-center rounded-lg p-4">
          {visualization}
        </div>

        <button onClick={onClose} className="btn btn-primary btn-sm w-full">
          Got it!
        </button>
      </div>
    </div>
  );
};

GameInstructionsModal.displayName = 'GameInstructionsModal';
