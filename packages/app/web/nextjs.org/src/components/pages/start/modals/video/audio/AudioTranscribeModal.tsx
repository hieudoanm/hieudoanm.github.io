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

export const AudioTranscribeModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTranscript('Speech recognition is not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        final += e.results[i][0].transcript;
      }
      setTranscript(final);
    };
    recognition.onerror = () => setRecording(false);
    recognition.start();
    recognitionRef.current = recognition;
    setRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setRecording(false);
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="Transcribe Audio">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Transcribe speech from microphone using Web Speech API.
        </p>
        <div className="flex gap-2">
          {!recording ? (
            <button onClick={startRecording} className="btn btn-primary btn-sm">
              Start Recording
            </button>
          ) : (
            <button onClick={stopRecording} className="btn btn-error btn-sm">
              Stop Recording
            </button>
          )}
          {transcript && (
            <button
              onClick={() =>
                downloadBlob(
                  new Blob([transcript], { type: 'text/plain' }),
                  'transcript.txt'
                )
              }
              className="btn btn-ghost btn-sm">
              Download
            </button>
          )}
        </div>
        <textarea
          className="textarea textarea-bordered h-40 w-full text-xs"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Transcription will appear here..."
        />
      </div>
    </ModalWrapper>
  );
};
AudioTranscribeModal.displayName = 'AudioTranscribeModal';
