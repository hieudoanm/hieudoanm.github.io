import { FC } from 'react';

export const DemoDrawer: FC = () => {
  return (
    <div className="drawer drawer-end">
      <input id="demo-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-50">
        <label htmlFor="demo-drawer" className="drawer-overlay" />
        <div className="bg-base-200 border-base-300 min-h-full w-96 border-l p-8">
          <div className="mb-7 flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold">Drawer panel</h3>
            <label
              htmlFor="demo-drawer"
              className="btn btn-ghost btn-sm btn-square text-base-content/50">
              ✕
            </label>
          </div>
          <p className="text-base-content/50 mb-6 text-sm leading-relaxed">
            Drawers slide in from the edge of the screen. Ideal for settings
            panels, detail views, and secondary navigation. Focus is trapped
            within the drawer while it&apos;s open.
          </p>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-base-content/50 text-xs">
                Theme
              </span>
            </label>
            <select className="select select-bordered w-full">
              <option>Dark (Obsidian)</option>
              <option>Light (Chalk)</option>
              <option>Auto (system)</option>
            </select>
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-base-content/50 text-xs">
                Accent color
              </span>
            </label>
            <select className="select select-bordered w-full">
              <option>Gold</option>
              <option>Teal</option>
              <option>Coral</option>
            </select>
          </div>
          <button className="btn btn-primary w-full">Save settings</button>
        </div>
      </div>
    </div>
  );
};
DemoDrawer.displayName = 'DemoDrawer';
