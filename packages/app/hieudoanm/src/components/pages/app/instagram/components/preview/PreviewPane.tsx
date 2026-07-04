import type { FC, RefObject } from 'react';

import { InstagramBadge } from './InstagramBadge';
import { NavButton } from './NavButton';
import { PostDots } from './PostDots';
import { PreviewHeader } from './PreviewHeader';

const ASPECT_CLASS: Record<string, string> = {
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '9:16': 'aspect-[9/16]',
  '2:3': 'aspect-[2/3]',
  '3:4': 'aspect-[3/4]',
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '3:2': 'aspect-[3/2]',
  A4: 'aspect-[140/99]',
  Letter: 'aspect-[11/8.5]',
};

export const PreviewPane: FC<{
  captureRef: RefObject<HTMLDivElement | null>;
  onDownload: () => void;
  onCopy: () => void;
  ratio: string;
  fontFamily: string;
  totalPosts: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectPost: (index: number) => void;
  instagramUsername?: string;
  children: React.ReactNode;
}> = ({
  captureRef,
  onDownload,
  onCopy,
  ratio,
  fontFamily,
  totalPosts,
  activeIndex,
  onPrev,
  onNext,
  onSelectPost,
  instagramUsername,
  children,
}) => {
  const multi = totalPosts > 1;

  return (
    <div className="flex-1">
      <PreviewHeader
        totalPosts={totalPosts}
        activeIndex={activeIndex}
        onCopy={onCopy}
        onDownload={onDownload}
      />

      <div className="relative mx-auto w-full sm:w-96">
        {multi && (
          <NavButton
            direction="prev"
            disabled={activeIndex === 0}
            onClick={onPrev}
          />
        )}

        <div
          ref={captureRef}
          style={{ fontFamily }}
          className={`border-base-300 mx-auto w-full overflow-hidden border shadow-2xl ${ASPECT_CLASS[ratio] || 'aspect-square'}`}>
          <div className="relative size-full">
            {children}
            {instagramUsername && (
              <InstagramBadge username={instagramUsername} />
            )}
          </div>
        </div>

        {multi && (
          <NavButton
            direction="next"
            disabled={activeIndex === totalPosts - 1}
            onClick={onNext}
          />
        )}
      </div>

      {multi && (
        <PostDots
          total={totalPosts}
          activeIndex={activeIndex}
          onSelect={onSelectPost}
        />
      )}
    </div>
  );
};

PreviewPane.displayName = 'PreviewPane';
