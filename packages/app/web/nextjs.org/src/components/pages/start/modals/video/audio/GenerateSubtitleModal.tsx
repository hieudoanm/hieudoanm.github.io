'use client';

import { FC, useState, useRef, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

const toSrt = (entries: { start: number; end: number; text: string }[]) =>
  entries
    .map(
      (e, i) =>
        `${i + 1}\n${new Date(e.start * 1000).toISOString().slice(11, 23).replace('.', ',')} --> ${new Date(e.end * 1000).toISOString().slice(11, 23).replace('.', ',')}\n${e.text}`
    )
    .join('\n\n');

const toVtt = (entries: { start: number; end: number; text: string }[]) =>
  'WEBVTT\n\n' +
  entries
    .map(
      (e) =>
        `${new Date(e.start * 1000).toISOString().slice(11, 23)} --> ${new Date(e.end * 1000).toISOString().slice(11, 23)}\n${e.text}`
    )
    .join('\n\n');

export const GenerateSubtitleModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [recording, setRecording] = useState(false);
  const [entries, setEntries] = useState<
    { start: number; end: number; text: string }[]
  >([]);
  const [currentText, setCurrentText] = useState('');
  const startTimeRef = useRef(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    setEntries([]);
    startTimeRef.current = Date.now();
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const text = e.results[e.results.length - 1][0].transcript;
      if (e.results[e.results.length - 1].isFinal) {
        setEntries((prev) => [
          ...prev,
          { start: (Date.now() - startTimeRef.current) / 1000, end: 0, text },
        ]);
      } else {
        setCurrentText(text);
      }
    };
    recognition.onerror = () => setRecording(false);
    recognition.start();
    recognitionRef.current = recognition;
    setRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setRecording(false);
    setEntries((prev) =>
      prev.length > 0
        ? prev.map((e, i) =>
            i === prev.length - 1
              ? { ...e, end: (Date.now() - startTimeRef.current) / 1000 }
              : e
          )
        : []
    );
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="Generate Subtitles">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Generate subtitles from microphone using Web Speech API.
        </p>
        <div className="flex flex-wrap gap-2">
          {!recording ? (
            <button onClick={startRecording} className="btn btn-primary btn-sm">
              Start Recording
            </button>
          ) : (
            <button onClick={stopRecording} className="btn btn-error btn-sm">
              Stop Recording
            </button>
          )}
          {entries.length > 0 && (
            <>
              <button
                onClick={() =>
                  downloadBlob(
                    new Blob([toSrt(entries)], { type: 'text/plain' }),
                    'subtitles.srt'
                  )
                }
                className="btn btn-ghost btn-sm">
                Download SRT
              </button>
              <button
                onClick={() =>
                  downloadBlob(
                    new Blob([toVtt(entries)], { type: 'text/vtt' }),
                    'subtitles.vtt'
                  )
                }
                className="btn btn-ghost btn-sm">
                Download VTT
              </button>
            </>
          )}
        </div>
        {currentText && (
          <p className="text-xs italic opacity-60">{currentText}</p>
        )}
        <div className="textarea textarea-bordered h-40 w-full overflow-y-auto p-2 text-xs">
          {entries.map((e, i) => (
            <p key={i} className="mb-1">
              <span className="font-bold">{i + 1}.</span> {e.text}
            </p>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};
GenerateSubtitleModal.displayName = 'GenerateSubtitleModal';
