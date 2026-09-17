import { OpmSimulator } from '@/games/stem/neuroscience/neuroimaging/meg/opm-meg';

export default function OpmMegInteractivePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-2xl font-bold">
          OPM Field &amp; Noise Simulator
        </h1>
        <p className="text-base-content/60 text-sm">
          Why 1/r³ means a helmet at 4 cm and an on-scalp sensor at 0.5 cm are
          not in the same league — once you get the ambient field under control.
        </p>
      </div>
      <OpmSimulator />
    </div>
  );
}
