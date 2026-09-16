'use client';

import { InferenceSession, Tensor } from 'onnxruntime-web';
import { FC, useEffect, useRef, useState } from 'react';
import {
  extractFeatures,
  mirrorLandmarks,
  MODEL_URI,
  readLabelTensor,
} from './utils';

interface MediaPipeCamera {
  start: () => Promise<void>;
  stop: () => void;
}

export const Sign: FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sessionRef = useRef<InferenceSession | null>(null);
  const isRunningRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [loadingText, setLoadingText] = useState('🚀 Initializing AI model...');
  const [isReady, setIsReady] = useState(false);
  const [sign, setSign] = useState<string>('');

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !containerRef.current)
      return;

    let camera: MediaPipeCamera | null = null;
    let resizeHandler: (() => void) | null = null;

    const load = async () => {
      try {
        setLoadingText('📦 Loading ONNX model...');
        await new Promise((r) => setTimeout(r, 300));

        setLoadingText('⚙️ Initializing inference engine...');
        await new Promise((r) => setTimeout(r, 300));

        sessionRef.current = await InferenceSession.create(MODEL_URI, {
          executionProviders: ['wasm'],
        });

        setLoadingText('🧠 AI model ready!');
        setIsReady(true);

        const { Hands, HAND_CONNECTIONS } = await import('@mediapipe/hands');
        const { Camera } = await import('@mediapipe/camera_utils');
        const drawingUtils = await import('@mediapipe/drawing_utils');

        const video = videoRef.current!;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;

        const resize = () => {
          if (containerRef.current) {
            canvas.width = containerRef.current.clientWidth;
            canvas.height = containerRef.current.clientHeight;
          }
        };

        resize();
        resizeHandler = resize;
        window.addEventListener('resize', resize);

        const hands = new Hands({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        hands.onResults(async (results) => {
          if (!canvas || !ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (!results.image) return;

          const drawScale = canvas.width / results.image.width;
          const scaledHeight = results.image.height * drawScale;
          const offsetY = (canvas.height - scaledHeight) / 2;

          // Draw mirrored video
          ctx.save();
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);
          ctx.drawImage(results.image, 0, offsetY, canvas.width, scaledHeight);
          ctx.restore();

          if (!results.multiHandLandmarks || !sessionRef.current) return;

          for (const landmarks of results.multiHandLandmarks) {
            try {
              if (isRunningRef.current) break;
              isRunningRef.current = true;

              const mirrored = mirrorLandmarks(landmarks);

              drawingUtils.drawConnectors(ctx, mirrored, HAND_CONNECTIONS, {
                color: '#00FF00',
                lineWidth: 3,
              });
              drawingUtils.drawLandmarks(ctx, mirrored, {
                color: '#FF0000',
                lineWidth: 2,
              });

              const features = extractFeatures(mirrored, HAND_CONNECTIONS);
              if (!features) continue;

              const input = new Tensor('float32', Float32Array.from(features), [
                1,
                features.length,
              ]);

              const inputName = sessionRef.current.inputNames[0];
              const output = await sessionRef.current.run(
                { [inputName]: input },
                ['output_label']
              );

              const detectedSign = readLabelTensor(output['output_label']);
              if (detectedSign) setSign(detectedSign);
            } catch (error) {
              console.error('Error in inference:', error);
            } finally {
              isRunningRef.current = false;
            }
          }
        });

        camera = new Camera(video, {
          onFrame: async () => {
            await hands.send({ image: video });
          },
          width: 1280,
          height: 720,
        });

        await camera.start();
      } catch (err) {
        console.error('Failed to load Sign model or MediaPipe', err);
        setLoadingText('❌ Error initializing AI. Please try again.');
      }
    };

    load();

    return () => {
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      if (camera) camera.stop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-base-content relative h-full w-full overflow-hidden rounded-xl">
      {!isReady && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur transition-opacity duration-500">
          <div className="flex flex-col items-center gap-4 text-white">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
            <p className="text-lg opacity-80">{loadingText}</p>
          </div>
        </div>
      )}

      <video ref={videoRef} className="hidden" autoPlay playsInline />
      <canvas ref={canvasRef} className="h-full w-full" />

      {sign !== '' && (
        <div className="pointer-events-none absolute top-6 left-1/2 z-40 -translate-x-1/2">
          <span
            key={sign}
            className="animate-in fade-in zoom-in-50 badge badge-primary badge-lg px-8 py-4 text-3xl font-extrabold"
            data-testid="detected-sign">
            {sign}
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/50 uppercase">
        Mirrored • Single Hand Tracking
      </div>
    </div>
  );
};
Sign.displayName = 'Sign';
