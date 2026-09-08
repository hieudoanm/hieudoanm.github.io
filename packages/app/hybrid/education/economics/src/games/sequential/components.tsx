import type { FC } from 'react';

interface GameTreeProps {
  chosenPath: string[];
  showAnnotations: boolean;
}

const TerminalBox: FC<{
  label: string;
  payoffs: [number, number];
  highlighted: boolean;
}> = ({ label, payoffs, highlighted }) => (
  <div
    className={`rounded border px-2 py-1 text-xs ${
      highlighted
        ? 'border-success bg-success/10 font-bold'
        : 'border-base-300 bg-base-200'
    }`}>
    {label} [{payoffs[0]}, {payoffs[1]}]
  </div>
);

export const GameTree: FC<GameTreeProps> = ({
  chosenPath,
  showAnnotations,
}) => {
  const outChosen = chosenPath[0] === 'out';
  const enterChosen = chosenPath[0] === 'enter';
  const accChosen = chosenPath[1] === 'accommodate';

  return (
    <div
      className="border-base-300 rounded-lg border p-4 text-sm"
      data-testid="game-tree">
      <div className="mb-2 font-bold">Game Tree</div>
      <div className="flex flex-col gap-2 pl-2">
        <div className="flex items-center gap-2">
          <span className="text-primary font-semibold">Node 1 (Entrant):</span>
        </div>
        <div className="ml-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`rounded px-1 text-xs ${
                outChosen ? 'bg-primary/20 font-bold' : 'bg-base-200'
              }`}>
              Out
            </span>
            <TerminalBox
              label="Terminal"
              payoffs={[4, 6]}
              highlighted={outChosen}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span
              className={`rounded px-1 text-xs ${
                enterChosen ? 'bg-primary/20 font-bold' : 'bg-base-200'
              }`}>
              Enter
            </span>
            <div className="ml-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-secondary font-semibold">
                  Node 2 (Incumbent):
                </span>
              </div>
              <div className="ml-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-1 text-xs ${
                      accChosen && enterChosen
                        ? 'bg-secondary/20 font-bold'
                        : 'bg-base-200'
                    }`}>
                    Accommodate
                  </span>
                  <TerminalBox
                    label="Terminal"
                    payoffs={[6, 6]}
                    highlighted={enterChosen && accChosen}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="bg-base-200 rounded px-1 text-xs">
                    Fight
                  </span>
                  {showAnnotations && (
                    <div className="border-base-300 ml-4 flex flex-col gap-1 border-l-2 border-dashed pl-2">
                      <span className="text-secondary text-xs font-semibold">
                        Node 3 (Entrant):
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="bg-base-200 rounded px-1 text-xs">
                          Stay
                        </span>
                        <TerminalBox
                          label="Terminal"
                          payoffs={[-2, 8]}
                          highlighted={false}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-success/20 rounded px-1 text-xs font-bold">
                          Leave
                        </span>
                        <TerminalBox
                          label="Terminal"
                          payoffs={[2, 4]}
                          highlighted={false}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RollbackAnnotationProps {
  playerAction: string;
  incumbentAction: string | null;
}

export const RollbackAnnotation: FC<RollbackAnnotationProps> = ({
  playerAction,
  incumbentAction,
}) => (
  <div
    className="border-base-300 rounded-lg border p-3 text-sm"
    data-testid="rollback-annotation">
    <div className="mb-1 font-bold">Rollback Annotation</div>
    <ul className="list-inside list-disc space-y-1 text-xs">
      {playerAction === 'enter' && incumbentAction === 'accommodate' && (
        <li>
          If the incumbent had fought, your optimal reply would be{' '}
          <strong>Leave</strong> (2 &gt; -2)
        </li>
      )}
      {playerAction === 'enter' && (
        <li>
          The incumbent foresees this, so <strong>Accommodate</strong> (6) beats
          Fight (4)
        </li>
      )}
      {playerAction === 'out' && (
        <li>
          You chose <strong>Out</strong> — the incumbent never had to respond
        </li>
      )}
    </ul>
  </div>
);
