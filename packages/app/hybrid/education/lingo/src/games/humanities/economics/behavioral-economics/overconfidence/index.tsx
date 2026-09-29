import { FC, useCallback, useReducer, useState } from 'react';
import {
  AggregateTable,
  DoneCard,
  MarketCard,
  MarketResultCard,
  QuestionCard,
  RevealCard,
  SliderCard,
  SliderResultCard,
} from './components';
import { QUESTIONS } from './constants';
import { answeredCorrect, scorePct } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { Confidence, Option } from './types';

export const CalibrationGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [low, setLow] = useState('');
  const [high, setHigh] = useState('');

  const select = useCallback(
    (option: Option) => dispatch({ type: 'SELECT_OPTION', option }),
    []
  );
  const setConfidence = useCallback(
    (value: Confidence) => dispatch({ type: 'SELECT_CONFIDENCE', value }),
    []
  );
  const submitAnswer = useCallback(
    () => dispatch({ type: 'SUBMIT_ANSWER' }),
    []
  );
  const nextQuestion = useCallback(
    () => dispatch({ type: 'NEXT_QUESTION' }),
    []
  );
  const aggregateNext = useCallback(
    () => dispatch({ type: 'AGGREGATE_NEXT' }),
    []
  );
  const setPosition = useCallback(
    (value: number) => dispatch({ type: 'SET_POSITION', value }),
    []
  );
  const submitMarket = useCallback(
    () => dispatch({ type: 'SUBMIT_MARKET' }),
    []
  );
  const marketNext = useCallback(() => dispatch({ type: 'MARKET_NEXT' }), []);
  const applyLow = useCallback(
    (v: string) => {
      setLow(v);
      const l = Number(v);
      const h = Number(high);
      if (Number.isFinite(l) && Number.isFinite(h) && h >= l)
        dispatch({ type: 'SET_BRACKET', low: l, high: h });
    },
    [high]
  );
  const applyHigh = useCallback(
    (v: string) => {
      setHigh(v);
      const l = Number(low);
      const h = Number(v);
      if (Number.isFinite(l) && Number.isFinite(h) && h >= l)
        dispatch({ type: 'SET_BRACKET', low: l, high: h });
    },
    [low]
  );
  const submitSlider = useCallback(() => {
    dispatch({ type: 'SUBMIT_SLIDER' });
  }, []);
  const sliderNext = useCallback(() => dispatch({ type: 'SLIDER_NEXT' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setLow('');
    setHigh('');
  }, []);

  const question = QUESTIONS[state.index];
  const score = answeredCorrect(state.answers);
  const accuracy = scorePct(state.answers);
  const canSubmit = state.selected !== null && state.confidence !== null;
  const nums = state.low !== null && state.high !== null;

  return (
    <div data-testid="calibration" className="flex flex-col gap-4">
      {state.phase === 'question' && (
        <QuestionCard
          question={question}
          index={state.index}
          selected={state.selected}
          confidence={state.confidence}
          canSubmit={canSubmit}
          onSelect={select}
          onConfidence={setConfidence}
          onSubmit={submitAnswer}
        />
      )}
      {state.phase === 'reveal' && (
        <RevealCard
          question={question}
          correct={state.answers[state.answers.length - 1]?.correct ?? false}
          score={score}
          accuracy={accuracy}
          confidence={state.answers[state.answers.length - 1]?.confidence ?? 50}
          onNext={nextQuestion}
        />
      )}
      {state.phase === 'aggregate' && (
        <AggregateTable buckets={state.buckets} onNext={aggregateNext} />
      )}
      {state.phase === 'market' && (
        <MarketCard
          actual={state.marketActual}
          position={state.position}
          onPosition={setPosition}
          onSubmit={submitMarket}
        />
      )}
      {state.phase === 'market-result' && state.marketOutcome && (
        <MarketResultCard outcome={state.marketOutcome} onNext={marketNext} />
      )}
      {state.phase === 'slider' && (
        <SliderCard
          low={low}
          high={high}
          canSubmit={nums}
          onLow={applyLow}
          onHigh={applyHigh}
          onSubmit={submitSlider}
        />
      )}
      {state.phase === 'slider-result' && (
        <SliderResultCard
          inRange={state.nileInRange ?? false}
          onNext={sliderNext}
        />
      )}
      {state.phase === 'done' && <DoneCard onReset={reset} />}
    </div>
  );
};

CalibrationGame.displayName = 'CalibrationGame';
