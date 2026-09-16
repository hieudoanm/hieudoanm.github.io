import type { FC, ReactNode } from 'react';
import { TOTAL_QUIZ_ROUNDS } from './constants';
import { computeNPV } from './game';
import { ActionButton, formatCurrency, formatPercent } from './components';
import type { QuizAnswer } from './types';

const Card: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    {children}
  </div>
);

const Stat: FC<{ label: string; testid?: string; children: ReactNode }> = ({
  label,
  testid,
  children,
}) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-base-content/70">{label}:</span>
    <strong data-testid={testid}>{children}</strong>
  </div>
);

export const DecisionPanel: FC<{
  npv: number;
  shouldMove: boolean;
  expectedMove: number;
  expectedStay: number;
  onReset: () => void;
}> = ({ npv, shouldMove, expectedMove, expectedStay, onReset }) => (
  <Card>
    <span className="text-base-content/70 text-sm">Net present value:</span>
    <div
      data-testid="npv"
      className={`text-2xl font-bold ${
        npv >= 0 ? 'text-success' : 'text-error'
      }`}>
      {formatCurrency(npv)}
    </div>
    <div data-testid="decision" className="text-lg font-semibold">
      {shouldMove ? 'Move' : 'Stay'}
    </div>
    <Stat label="Expected if moving">{formatCurrency(expectedMove)}</Stat>
    <Stat label="Expected if staying">{formatCurrency(expectedStay)}</Stat>
    <div className="mt-2">
      <ActionButton
        testid="reset"
        onClick={onReset}
        className="btn btn-primary btn-sm">
        Reset
      </ActionButton>
    </div>
  </Card>
);

export const MacroPanel: FC<{
  equilibriumWage: number;
  nativeWage: number;
  migrantCount: number;
  immigrantSurplus: number;
  onReset: () => void;
}> = ({
  equilibriumWage,
  nativeWage,
  migrantCount,
  immigrantSurplus,
  onReset,
}) => (
  <Card>
    <Stat label="Equilibrium wage" testid="equilibrium-wage">
      {formatCurrency(equilibriumWage)}
    </Stat>
    <Stat label="Native wage" testid="native-wage">
      {formatCurrency(nativeWage)}
    </Stat>
    <Stat label="Migrants" testid="migrants">
      {migrantCount}
    </Stat>
    <Stat label="Immigrant surplus" testid="economic-surplus">
      {formatCurrency(immigrantSurplus)}
    </Stat>
    <div className="mt-2">
      <ActionButton
        testid="reset"
        onClick={onReset}
        className="btn btn-primary btn-sm">
        Reset
      </ActionButton>
    </div>
  </Card>
);

export const QuizPanel: FC<{
  quizRound: number;
  params: { w0: number; w1: number; m: number; p: number };
  quizAnswer: QuizAnswer | null;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
}> = ({ quizRound, params, quizAnswer, onAnswer, onNext }) => {
  const npv = computeNPV(params.w0, params.w1, params.p, params.m);
  return (
    <Card>
      <span className="text-base-content/70 text-sm">
        Round {quizRound} / {TOTAL_QUIZ_ROUNDS}
      </span>
      <Stat label="Origin wage" testid="origin-wage">
        {formatCurrency(params.w0)}
      </Stat>
      <Stat label="Destination wage" testid="destination-wage">
        {formatCurrency(params.w1)}
      </Stat>
      <Stat label="Moving cost" testid="moving-cost">
        {formatCurrency(params.m)}
      </Stat>
      <Stat label="Job probability" testid="job-probability">
        {formatPercent(params.p)}
      </Stat>
      <Stat label="NPV" testid="npv">
        {formatCurrency(npv)}
      </Stat>
      {!quizAnswer ? (
        <div className="flex gap-2">
          <ActionButton
            testid="answer-move"
            onClick={() => onAnswer('move')}
            className="btn btn-primary btn-sm">
            Move
          </ActionButton>
          <ActionButton
            testid="answer-stay"
            onClick={() => onAnswer('stay')}
            className="btn btn-sm">
            Stay
          </ActionButton>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span data-testid="decision">You chose: {quizAnswer}</span>
          <ActionButton
            testid="check"
            onClick={onNext}
            className="btn btn-primary btn-sm">
            {quizRound >= TOTAL_QUIZ_ROUNDS ? 'See Results' : 'Next Round'}
          </ActionButton>
        </div>
      )}
    </Card>
  );
};

export const ResultsPanel: FC<{
  correctCount: number;
  total: number;
  onReset: () => void;
}> = ({ correctCount, total, onReset }) => (
  <Card>
    <div className="text-4xl">📊</div>
    <div data-testid="npv" className="text-lg font-bold">
      {correctCount} / {total} correct
    </div>
    <div className="mt-2">
      <ActionButton
        testid="reset"
        onClick={onReset}
        className="btn btn-primary btn-sm">
        Play Again
      </ActionButton>
    </div>
  </Card>
);
