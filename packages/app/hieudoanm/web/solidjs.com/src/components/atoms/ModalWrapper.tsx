import { JSX } from 'solid-js';

type ModalWrapperProps = {
  children: JSX.Element;
  onClose: () => void;
};

export const ModalWrapper = (props: ModalWrapperProps) => {
  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black/50" onClick={props.onClose} />
      <div class="bg-base-100 relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl shadow-2xl">
        <button
          onClick={props.onClose}
          class="btn btn-ghost btn-sm btn-square absolute top-2 right-2 z-20">
          ✕
        </button>
        {props.children}
      </div>
    </div>
  );
};
