import { useCamera } from '@web/hooks/use-camera';
import { Layout } from '@web/layout';
import { logger } from '@web/log';
import { downloadImage } from '@web/utils/download';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer> => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result ?? '');
    reader.readAsDataURL(blob);
  });
};

const CameraPage: NextPage = () => {
  const imageRef = useRef<HTMLCanvasElement>();
  const videoRef = useRef<HTMLVideoElement>();
  const [size, setSize] = useState({
    width: videoRef.current?.videoWidth ?? 0,
    height: videoRef.current?.videoHeight ?? 0,
  });
  const camera = useCamera({
    width: size.width,
    height: size.height,
    facingMode: 'environment',
  });
  const [image, setImage] = useState<string | ArrayBuffer>('');

  useEffect(() => {
    if (!camera || typeof document === 'undefined') return;
    const cameraElement: HTMLVideoElement = document.getElementById(
      'camera'
    ) as HTMLVideoElement;
    cameraElement.srcObject = camera;
    return () => {
      cameraElement.srcObject = null;
    };
  }, [camera]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener(
      'resize',
      () => {
        setSize({
          width: videoRef.current?.videoWidth ?? 0,
          height: videoRef.current?.videoHeight ?? 0,
        });
      },
      true
    );
    return () => {
      window.removeEventListener('resize', () => {}, false);
    };
  }, []);

  if (!camera) {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl uppercase'>
            Camera is Unavailable
          </div>
        </div>
      </Layout>
    );
  }

  const capture = () => {
    if (!imageRef.current || !videoRef.current) return;
    const context = imageRef.current.getContext('2d');
    if (!context) return;
    context.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.videoWidth ?? 0,
      videoRef.current.videoHeight ?? 0
    );
    imageRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const image: string | ArrayBuffer = await blobToBase64(blob);
      setImage(image as string);
    });
  };

  const clear = () => {
    if (!imageRef.current || !videoRef.current) return;
    const context = imageRef.current.getContext('2d');
    if (!context) return;
    context.reset();
  };

  return (
    <Layout nav full>
      <div className='container mx-auto h-full'>
        <div className='h-full p-4 md:p-8'>
          <div className='flex h-full flex-col gap-y-4 md:gap-y-8'>
            <div className='relative grow overflow-hidden rounded-lg border border-base-content'>
              <div className='absolute bottom-0 left-0 right-0 top-0 z-10'>
                <video
                  id='camera'
                  className='h-full w-full'
                  ref={videoRef as any}
                  autoPlay>
                  <track kind='captions' />
                </video>
              </div>
              <div className='absolute bottom-0 left-0 right-0 top-0 z-20'>
                <canvas
                  id='preview'
                  className='h-full w-full'
                  ref={imageRef as any}
                />
              </div>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8'>
              <button className='btn btn-outline' onClick={() => capture()}>
                Capture
              </button>
              <button
                className='btn btn-outline'
                onClick={() => {
                  clear();
                  setImage('');
                }}>
                Reset
              </button>
              <button
                className='btn btn-outline'
                onClick={() => {
                  downloadImage(image as string, 'png', 'png');
                }}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CameraPage;
