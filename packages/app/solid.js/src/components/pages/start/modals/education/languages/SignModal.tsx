import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { InferenceSession, Tensor } from 'onnxruntime-web';
import { createSignal, onMount, onCleanup } from 'solid-js';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const URI =
  NODE_ENV === 'development'
    ? '/models/sign-model.onnx'
    : '/hieudoanm/models/sign-model.onnx';

export const SignModal = ({ onClose }: { onClose: () => void }) => {
  let videoRef: HTMLVideoElement | undefined;
  let canvasRef: HTMLCanvasElement | undefined;
  let sessionRef: InferenceSession | undefined;
  let isRunning = false;
  let containerRef: HTMLDivElement | undefined;

  const [loadingText, setLoadingText] = createSignal(
    '🚀 Initializing AI model...'
  );
  const [isReady, setIsReady] = createSignal(false);
  const [sign, setSign] = createSignal<string>('');

  onMount(() => {
    if (!videoRef || !canvasRef || !containerRef) return;

    let camera: any = null;

    const load = async () => {
      try {
        setLoadingText('📦 Loading ONNX model...');
        await new Promise((r) => setTimeout(r, 300));

        setLoadingText('⚙️ Initializing inference engine...');
        await new Promise((r) => setTimeout(r, 300));

        const executionProviders = ['wasm'];
        sessionRef = await InferenceSession.create(URI, {
          executionProviders,
        });

        setLoadingText('🧠 AI model ready!');
        setIsReady(true);

        const { Hands, HAND_CONNECTIONS } = await import('@mediapipe/hands');
        const { Camera } = await import('@mediapipe/camera_utils');
        const drawingUtils = await import('@mediapipe/drawing_utils');

        const video = videoRef!;
        const canvas = canvasRef!;
        const ctx = canvas.getContext('2d')!;

        const resize = () => {
          if (containerRef) {
            canvas.width = containerRef.clientWidth;
            canvas.height = containerRef.clientHeight;
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

          const drawScale = canvas.width / videoWidth;
          const scaledHeight = videoHeight * drawScale;
          const offsetY = (canvas.height - scaledHeight) / 2;

          ctx.save();
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);

          ctx.drawImage(results.image, 0, offsetY, canvas.width, scaledHeight);

          ctx.restore();

          if (!results.multiHandLandmarks || !sessionRef) return;

          for (const landmarks of results.multiHandLandmarks) {
            try {
              if (isRunning) break;
              isRunning = true;

              const mirrored = landmarks.map((lm) => ({
                x: 1 - lm.x,
                y: lm.y,
                z: lm.z,
              }));

              drawingUtils.drawConnectors(ctx, mirrored, HAND_CONNECTIONS, {
                color: '#00FF00',
                lineWidth: 3,
              });

              drawingUtils.drawLandmarks(ctx, mirrored, {
                color: '#FF0000',
                lineWidth: 2,
              });

              const wrist = mirrored[0];

              const normScale = Math.sqrt(
                (mirrored[0].x - mirrored[9].x) ** 2 +
                  (mirrored[0].y - mirrored[9].y) ** 2 +
                  (mirrored[0].z - mirrored[9].z) ** 2
              );

              if (normScale === 0) continue;

              const features: number[] = [];

              for (const lm of mirrored) {
                features.push(
                  (lm.x - wrist.x) / normScale,
                  (lm.y - wrist.y) / normScale,
                  (lm.z - wrist.z) / normScale
                );
              }

              for (const [a, b] of HAND_CONNECTIONS) {
                const lmA = mirrored[a];
                const lmB = mirrored[b];

                features.push(lmB.x - lmA.x, lmB.y - lmA.y, lmB.z - lmA.z);
              }

              if (features.length !== 126) {
                console.warn('⚠️ Feature size mismatch:', features.length);
                continue;
              }

              const input = new Tensor(
                'float32',
                Float32Array.from(features),
                [1, 126]
              );

              const feeds: Record<string, Tensor> = {};
              const inputName = sessionRef!.inputNames[0];
              feeds[inputName] = input;

              const resultsAI = await sessionRef!.run(feeds, ['output_label']);

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

              if (detectedSign) {
                setSign(detectedSign);
              }
            } catch (error) {
              console.error('❌ Error in inference:', error);
            } finally {
              isRunning = false;
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

    onCleanup(() => {
      window.removeEventListener('resize', () => {});
      if (camera) {
        camera.stop();
      }
    });
  });

  return (
    <ModalWrapper
      onClose={onClose}
      title="Sign Language"
      size="max-w-5xl"
      fullHeight>
      <div ref={containerRef} class="relative h-full w-full bg-black">
        {!isReady() && (
          <div class="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur transition-opacity duration-500">
            <div class="flex flex-col items-center gap-4 text-white">
              <div class="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
              <p class="text-lg opacity-80">{loadingText()}</p>
            </div>
          </div>
        )}

        <video ref={videoRef} class="hidden" autoPlay playsInline />
        <canvas ref={canvasRef} class="h-full w-full" />

        {sign() !== '' && (
          <div class="pointer-events-none absolute top-6 left-1/2 z-40 -translate-x-1/2">
            <div class="relative flex min-w-[120px] items-center justify-center rounded-2xl border border-white/30 bg-gradient-to-b from-white/25 via-white/10 to-white/5 px-8 py-4 shadow-[0_10px_60px_rgba(0,0,0,0.65)] backdrop-blur-3xl backdrop-contrast-125 backdrop-saturate-[1.8] transition-all duration-300 before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_2px_12px_rgba(255,255,255,0.35),inset_0_-2px_18px_rgba(0,0,0,0.55)] before:content-['']">
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/25 via-emerald-300/25 to-green-400/25 blur-xl" />
              <span class="animate-in fade-in zoom-in-50 relative text-5xl font-extrabold text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.95)]">
                {sign()}
              </span>
            </div>
          </div>
        )}

        <div class="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/50 uppercase">
          Mirrored • Single Hand Tracking
        </div>
      </div>
    </ModalWrapper>
  );
};
