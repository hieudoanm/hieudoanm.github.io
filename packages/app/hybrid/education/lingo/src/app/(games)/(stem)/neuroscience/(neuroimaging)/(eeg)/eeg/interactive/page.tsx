import { ErpSimulator } from '@/games/stem/neuroscience/neuroimaging/eeg/eeg';

export default function EegInteractivePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-2xl font-bold">
          ERP Construction & Averaging Simulator
        </h1>
        <p className="text-base-content/60 text-sm">
          Build a single-trial EEG, inject artefacts, and watch what averaging
          does — and does not — remove.
        </p>
      </div>
      <ErpSimulator />
    </div>
  );
}
