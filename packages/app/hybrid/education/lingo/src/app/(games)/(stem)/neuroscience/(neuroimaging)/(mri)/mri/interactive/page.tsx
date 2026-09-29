import { BoldSimulator } from '@/games/stem/neuroscience/mri';

export default function MriInteractivePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-2xl font-bold">
          Haemodynamic Response Simulator
        </h1>
        <p className="text-base-content/60 text-sm">
          Convolve a neural drive with the vascular response and see the 4–6
          second delay that defines fMRI&rsquo;s temporal limits.
        </p>
      </div>
      <BoldSimulator />
    </div>
  );
}
