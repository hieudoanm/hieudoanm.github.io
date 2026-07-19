import type { FC, ReactNode } from 'react';

interface GameInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  instructions: string[];
  visualization: ReactNode;
}

export const GameInstructions: FC<GameInstructionsProps> = ({
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
      <div className="bg-base-content/80 absolute inset-0" onClick={onClose} />
      <div className="bg-base-100 border-base-content/30 relative z-10 flex w-full max-w-md flex-col gap-4 border-2 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-primary text-sm font-bold">{title}</h3>
            <p className="text-base-content/40 text-[8px]">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-base-content/60 hover:text-primary p-1 text-xs transition-colors">
            X
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {instructions.map((instruction, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-primary text-[8px] font-bold">
                {i + 1}.
              </span>
              <span className="text-base-content/60 text-[8px] leading-relaxed">
                {instruction}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-base-200 border-base-content/10 flex items-center justify-center border p-4">
          {visualization}
        </div>

        <button
          onClick={onClose}
          className="bg-primary text-primary-content hover:bg-primary/80 w-full p-2 text-[8px] font-bold transition-colors">
          GOT IT!
        </button>
      </div>
    </div>
  );
};

GameInstructions.displayName = 'GameInstructions';
