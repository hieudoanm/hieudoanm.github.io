import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

type QuizData = {
  question: string;
  answers: {
    red: string;
    yellow: string;
    blue: string;
    green: string;
  };
  correct: 'red' | 'yellow' | 'blue' | 'green';
};

/**
 * Parse a CSV string into an array of QuizData.
 * Expected header: question,red,blue,green,yellow,correct
 */
function parseCsv(csvText: string): QuizData[] {
  const lines = csvText.trim().split(/\r?\n/);
  const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const expected = ['question', 'red', 'blue', 'green', 'yellow', 'correct'];
  // Simple validation – if headers differ, attempt to map by position.
  const indices = expected.map((col) => header.indexOf(col));
  if (indices.some((i) => i === -1)) {
    console.warn(
      'CSV header missing expected columns; using positional mapping.'
    );
  }
  const rows: QuizData[] = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = lines[i].split(',');
    if (vals.length < 6) continue; // skip malformed rows
    const get = (idx: number) =>
      vals[indices[idx] !== -1 ? indices[idx] : idx].trim();
    const correct = get(5) as 'red' | 'yellow' | 'blue' | 'green';
    rows.push({
      question: get(0),
      answers: {
        red: get(1),
        blue: get(2),
        green: get(3),
        yellow: get(4),
      },
      correct,
    });
  }
  return rows;
}

const colorClassMap: Record<keyof QuizData['answers'], string> = {
  red: 'btn-error',
  yellow: 'btn-warning',
  blue: 'btn-info',
  green: 'btn-success',
};

export const QuizifyModal = ({ onClose }: { onClose: () => void }) => {
  const [questions, setQuestions] = createSignal<QuizData[]>([]);
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [selected, setSelected] = createSignal<
    keyof QuizData['answers'] | null
  >(null);
  const [score, setScore] = createSignal(0);
  const [csvError, setCsvError] = createSignal<string>('');

  const quiz = createMemo(() => questions()[currentIndex()]);
  const isLastQuestion = createMemo(
    () => currentIndex() === questions().length - 1
  );

  const progress = createMemo(
    () => ((currentIndex() + (selected() ? 1 : 0)) / questions().length) * 100
  );

  const handleSelect = (key: keyof QuizData['answers']) => {
    if (selected()) return;
    setSelected(key);
    if (key === quiz().correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setCurrentIndex((i) => i + 1);
  };

  const resetQuiz = (newQuestions: QuizData[]) => {
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
  };

  const handleFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const parsed = parseCsv(text);
        if (parsed.length === 0) throw new Error('No valid rows found');
        resetQuiz(parsed);
        setCsvError('');
      } catch (err) {
        console.error(err);
        setCsvError(
          'Failed to parse CSV file. Please ensure it follows the required format.'
        );
      }
    };
    reader.readAsDataURL(file);
  };

  // Keyboard shortcuts (same as original Play page)
  createEffect(() => {
    selected();
    isLastQuestion();
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      if (!selected()) {
        if (e.key === 'r') handleSelect('red');
        if (e.key === 'y') handleSelect('yellow');
        if (e.key === 'b') handleSelect('blue');
        if (e.key === 'g') handleSelect('green');
      }
      if (selected() && e.key === 'ArrowRight' && !isLastQuestion()) {
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    onCleanup(() => window.removeEventListener('keydown', onKeyDown));
  });

  const getButtonClass = (key: keyof QuizData['answers']) => {
    if (!selected()) return colorClassMap[key];
    if (key === quiz().correct) return 'btn-success';
    if (key === selected()) return 'btn-error';
    return 'btn-disabled opacity-50';
  };

  return (
    <ModalWrapper onClose={onClose} title="Quizify" size="max-w-2xl">
      {questions().length === 0 ? (
        <div class="space-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            class="file-input file-input-bordered w-full"
          />
          {csvError() && <div class="text-error">{csvError()}</div>}
        </div>
      ) : (
        <main class="bg-base-100 text-base-content flex flex-col items-center">
          <div class="card bg-base-100 border-base-300 w-full max-w-md border shadow-xl">
            <div class="card-body space-y-4">
              {/* Progress */}
              <div class="space-y-1">
                <progress
                  class="progress progress-primary w-full"
                  value={progress()}
                  max={100}
                />
                <div class="flex justify-between text-xs opacity-60">
                  <span>
                    Question {currentIndex() + 1} / {questions().length}
                  </span>
                  <span>{Math.round(progress())}%</span>
                </div>
              </div>

              {/* Question */}
              <div class="space-y-1 text-center">
                <h2 class="card-title justify-center text-lg">
                  {quiz().question}
                </h2>
              </div>

              {/* Answers */}
              <div class="grid grid-cols-2 gap-3">
                {(
                  Object.keys(quiz().answers) as Array<
                    keyof QuizData['answers']
                  >
                ).map((key) => (
                  <button
                    key={key}
                    disabled={
                      !!selected() &&
                      key !== quiz().correct &&
                      key !== selected()
                    }
                    class={`btn h-20 text-white transition-all ${getButtonClass(key)}`}
                    onClick={() => handleSelect(key)}>
                    {quiz().answers[key]}
                    <span class="ml-1 opacity-60">
                      ({key[0].toUpperCase()})
                    </span>
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {selected() && (
                <div class="alert">
                  {selected() === quiz().correct ? (
                    <span>✅ Correct answer!</span>
                  ) : (
                    <span>❌ Wrong answer</span>
                  )}
                </div>
              )}

              {/* Navigation */}
              {selected() && !isLastQuestion() && (
                <button class="btn btn-primary w-full" onClick={handleNext}>
                  Next Question →
                </button>
              )}

              {/* Completed */}
              {selected() && isLastQuestion() && (
                <div class="space-y-3 text-center">
                  <div class="text-lg font-semibold">🎉 Quiz completed!</div>
                  <div>
                    Score:{' '}
                    <span class="font-bold">
                      {score()} / {questions().length}
                    </span>
                  </div>
                  <button
                    class="btn btn-outline w-full"
                    onClick={() => resetQuiz(questions())}>
                    🔄 Reset Quiz
                  </button>
                  <div class="text-xs opacity-60">
                    Keyboard: R Y B G • → Next
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </ModalWrapper>
  );
};
