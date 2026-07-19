import { BrainAtlasExplorer } from '@/games/stem/neuroscience/anatomy/brain-atlas';

export default function BrainAtlasInteractivePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-2xl font-bold">Depth Explorer</h1>
        <p className="text-base-content/60 text-sm">
          Scrub from the cortical surface down to the brainstem and watch which
          structures the cut exposes — then read any of them in place.
        </p>
      </div>
      <BrainAtlasExplorer />
    </div>
  );
}
