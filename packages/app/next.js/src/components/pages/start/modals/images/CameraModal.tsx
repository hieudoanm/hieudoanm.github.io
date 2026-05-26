import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

/* ============================= */
/* Types & Constants */
/* ============================= */

type OverlayMode = 'none' | 'thirds' | 'symmetry';

type RatioOption = {
  label: string;
  value: number;
};

const RATIOS: RatioOption[] = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:2', value: 3 / 2 },
  { label: '16:9', value: 16 / 9 },
];

/* ============================= */
/* Sub-components */
/* ============================= */

const GridOverlay: FC<{ overlay: OverlayMode }> = ({ overlay }) => {
  if (overlay === 'none') return null;

  if (overlay === 'thirds') {
    return (
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 h-full w-px bg-white/40" />
        <div className="absolute top-0 left-2/3 h-full w-px bg-white/40" />
        <div className="absolute top-1/3 left-0 h-px w-full bg-white/40" />
        <div className="absolute top-2/3 left-0 h-px w-full bg-white/40" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-white/60" />
      <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/60" />
    </div>
  );
};

const RatioFrame: FC<{ ratio: number; overlay: OverlayMode }> = ({
  ratio,
  overlay,
}) => (
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <div
      className="relative w-full transition-all duration-300"
      style={{
        aspectRatio: ratio,
        maxHeight: '100%',
      }}>
      <div className="absolute inset-0 rounded-2xl border border-white/30" />
      <GridOverlay overlay={overlay} />
    </div>
  </div>
);

export const CameraModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [overlay, setOverlay] = useState<OverlayMode>('none');
  const [ratioIndex, setRatioIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const currentRatio = RATIOS[ratioIndex];

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }, [stream]);

  useEffect(() => {
    const initCamera = async () => {
      try {
        setError(null);
        stopStream();

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        });

        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Could not access camera');
      }
    };

    initCamera();

    return () => {
      stopStream();
    };
  }, [facingMode]);

  const switchCamera = () =>
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));

  const switchOverlay = () =>
    setOverlay((prev) =>
      prev === 'none' ? 'thirds' : prev === 'thirds' ? 'symmetry' : 'none'
    );

  const switchRatio = () => setRatioIndex((prev) => (prev + 1) % RATIOS.length);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const targetRatio = currentRatio.value;
    const videoRatio = videoWidth / videoHeight;

    let cropWidth = videoWidth;
    let cropHeight = videoHeight;

    if (videoRatio > targetRatio) {
      cropWidth = videoHeight * targetRatio;
    } else {
      cropHeight = videoWidth / targetRatio;
    }

    const sx = (videoWidth - cropWidth) / 2;
    const sy = (videoHeight - cropHeight) / 2;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (facingMode === 'user') {
      ctx.translate(cropWidth, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      video,
      sx,
      sy,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.download = `capture-${currentRatio.label}-${timestamp}.png`;
      link.href = url;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <ModalWrapper onClose={onClose} title="Camera" size="max-w-2xl" fullHeight>
      <div className="flex flex-col gap-6 bg-neutral-900 p-4 text-white">
        {error ? (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Viewfinder */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className={`absolute inset-0 h-full w-full object-cover ${
                  facingMode === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />
              <RatioFrame ratio={currentRatio.value} overlay={overlay} />

              {/* Bottom right indicator */}
              <div className="absolute right-4 bottom-4 flex gap-2">
                <span className="badge badge-neutral bg-black/40 text-[10px] backdrop-blur-md">
                  {facingMode === 'user' ? 'Front' : 'Rear'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-3 items-center">
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={switchRatio}
                    className="btn btn-circle btn-ghost h-12 w-12 border border-white/10">
                    <span className="font-mono text-xs">
                      {currentRatio.label}
                    </span>
                  </button>
                  <span className="text-[10px] font-semibold tracking-wider text-white/30 uppercase">
                    Ratio
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={handleCapture}
                    className="group flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/20 p-1 transition-all active:scale-90">
                    <div className="group-hover:bg-primary h-full w-full rounded-full bg-white transition-colors" />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={switchCamera}
                    className="btn btn-circle btn-ghost h-12 w-12 border border-white/10">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path d="M23 4v6h-4M2 20v-6h4M20.49 9A9 9 0 0 0 5.64 5.64L2 10m22 4l-3.64 4.36A9 9 0 0 1 3.51 15" />
                    </svg>
                  </button>
                  <span className="text-[10px] font-semibold tracking-wider text-white/30 uppercase">
                    Flip
                  </span>
                </div>
              </div>

              {/* Grid Toggle */}
              <div className="flex justify-center">
                <div className="join rounded-xl border border-white/10 bg-black/20 p-0.5">
                  {(['none', 'thirds', 'symmetry'] as OverlayMode[]).map(
                    (mode) => (
                      <button
                        key={mode}
                        onClick={() => setOverlay(mode)}
                        className={`join-item btn btn-xs h-8 px-4 capitalize transition-all ${
                          overlay === mode
                            ? 'btn-primary no-animation'
                            : 'btn-ghost text-white/40'
                        }`}>
                        {mode === 'none' ? 'Clean' : mode}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </ModalWrapper>
  );
};
