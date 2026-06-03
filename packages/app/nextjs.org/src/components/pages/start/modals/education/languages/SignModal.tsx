import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { InferenceSession, Tensor } from 'onnxruntime-web';
import { FC, useEffect, useRef, useState } from 'react';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const URI =
  NODE_ENV === 'development'
    ? '/models/sign-model.onnx'
    : '/hieudoanm/models/sign-model.onnx';

export const SignModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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

    let camera: any = null;

    const load = async () => {
      try {
        setLoadingText('📦 Loading ONNX model...');
        await new Promise((r) => setTimeout(r, 300));

        setLoadingText('⚙️ Initializing inference engine...');
        await new Promise((r) => setTimeout(r, 300));

        const executionProviders = ['wasm'];
        sessionRef.current = await InferenceSession.create(URI, {
          executionProviders,
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

          const videoWidth = results.image.width;
          const videoHeight = results.image.height;

          // ==============================
          // 📐 Canvas scaling
          // ==============================
          const drawScale = canvas.width / videoWidth;
          const scaledHeight = videoHeight * drawScale;
          const offsetY = (canvas.height - scaledHeight) / 2;

          // ==============================
          // 🪞 Draw mirrored video
          // ==============================
          ctx.save();
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);

          ctx.drawImage(results.image, 0, offsetY, canvas.width, scaledHeight);

          ctx.restore();

          // ==============================
          // ✋ Process hands
          // ==============================
          if (!results.multiHandLandmarks || !sessionRef.current) return;

          for (const landmarks of results.multiHandLandmarks) {
            try {
              if (isRunningRef.current) break;
              isRunningRef.current = true;

              // ==============================
              // 1️⃣ Mirror landmarks (training parity)
              // ==============================
              const mirrored = landmarks.map((lm) => ({
                x: 1 - lm.x,
                y: lm.y,
                z: lm.z,
              }));

              // ==============================
              // 🎨 Draw skeleton
              // ==============================
              drawingUtils.drawConnectors(ctx, mirrored, HAND_CONNECTIONS, {
                color: '#00FF00',
                lineWidth: 3,
              });

              drawingUtils.drawLandmarks(ctx, mirrored, {
                color: '#FF0000',
                lineWidth: 2,
              });

              // ==============================
              // 🧮 Feature extraction (Python-aligned)
              // ==============================

              // Wrist origin
              const wrist = mirrored[0];

              // Scale normalization (wrist → middle MCP)
              const normScale = Math.sqrt(
                (mirrored[0].x - mirrored[9].x) ** 2 +
                  (mirrored[0].y - mirrored[9].y) ** 2 +
                  (mirrored[0].z - mirrored[9].z) ** 2
              );

              if (normScale === 0) continue;

              const features: number[] = [];

              // ==============================
              // 📍 Normalized landmarks (63)
              // ==============================
              for (const lm of mirrored) {
                features.push(
                  (lm.x - wrist.x) / normScale,
                  (lm.y - wrist.y) / normScale,
                  (lm.z - wrist.z) / normScale
                );
              }

              // ==============================
              // 🦴 Bone vectors (60)
              // ==============================
              for (const [a, b] of HAND_CONNECTIONS) {
                const lmA = mirrored[a];
                const lmB = mirrored[b];

                features.push(lmB.x - lmA.x, lmB.y - lmA.y, lmB.z - lmA.z);
              }

              // ==============================
              // ✅ Safety check
              // ==============================
              if (features.length !== 126) {
                console.warn('⚠️ Feature size mismatch:', features.length);
                continue;
              }

              // ==============================
              // 🧠 ONNX inference
              // ==============================
              const input = new Tensor(
                'float32',
                Float32Array.from(features),
                [1, 126]
              );

              const feeds: Record<string, Tensor> = {};
              const inputName = sessionRef.current.inputNames[0];
              feeds[inputName] = input;

              const resultsAI = await sessionRef.current.run(feeds, [
                'output_label',
              ]);

              // ==============================
              // 🏷️ Read label output (string tensor)
              // ==============================
              const labelTensor = resultsAI['output_label'] as Tensor;

              let detectedSign = '';

              if (labelTensor) {
                const cpuData = (
                  labelTensor as unknown as {
                    cpuData: string[];
                  }
                ).cpuData;

                if (cpuData && cpuData.length > 0) {
                  detectedSign = cpuData[0];
                }
              }

              // ==============================
              // 🖥️ Update UI
              // ==============================
              if (detectedSign) {
                setSign(detectedSign);
              }
            } catch (error) {
              console.error('❌ Error in inference:', error);
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
      window.removeEventListener('resize', () => {});
      if (camera) {
        camera.stop();
      }
    };
  }, []);

  return (
    <ModalWrapper
      onClose={onClose}
      title="Sign Language"
      size="max-w-5xl"
      fullHeight>
      <div ref={containerRef} className="relative h-full w-full bg-black">
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
            <div className="relative flex min-w-[120px] items-center justify-center rounded-2xl border border-white/30 bg-gradient-to-b from-white/25 via-white/10 to-white/5 px-8 py-4 shadow-[0_10px_60px_rgba(0,0,0,0.65)] backdrop-blur-3xl backdrop-contrast-125 backdrop-saturate-[1.8] transition-all duration-300 before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_2px_12px_rgba(255,255,255,0.35),inset_0_-2px_18px_rgba(0,0,0,0.55)] before:content-['']">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/25 via-emerald-300/25 to-green-400/25 blur-xl" />
              <span
                key={sign}
                className="animate-in fade-in zoom-in-50 relative text-5xl font-extrabold text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.95)]">
                {sign}
              </span>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/50 uppercase">
          Mirrored • Single Hand Tracking
        </div>
      </div>
    </ModalWrapper>
  );
};
