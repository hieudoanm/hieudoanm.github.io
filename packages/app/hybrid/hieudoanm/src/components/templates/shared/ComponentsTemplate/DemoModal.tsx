import { FC } from 'react';

export const DemoModal: FC = () => {
  return (
    <>
      <input type="checkbox" id="demo-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle" role="dialog">
        <div className="modal-box bg-base-200 border-base-300 border">
          <h3 className="mb-4 font-serif text-xl font-bold">Modal component</h3>
          <p className="text-base-content/50 mb-7 text-sm leading-relaxed">
            This is a modal dialog. It traps focus, supports Escape key
            dismissal, and renders in a portal to avoid z-index collisions. Use
            it for confirmations, forms, and contextual detail views.
          </p>
          <div className="modal-action">
            <label
              htmlFor="demo-modal"
              className="btn btn-ghost border-base-300 border">
              Cancel
            </label>
            <label htmlFor="demo-modal" className="btn btn-primary">
              Confirm
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="demo-modal" />
      </div>
    </>
  );
};
DemoModal.displayName = 'DemoModal';
