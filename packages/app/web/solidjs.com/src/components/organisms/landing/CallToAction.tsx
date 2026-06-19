interface CallToActionProps {
  onStartClick?: () => void;
}

export const CallToAction = (props: CallToActionProps) => (
  <section class="mx-auto max-w-5xl px-12 py-24 text-center">
    <div class="card bg-base-200 border-base-300 border">
      <div class="card-body items-center py-16">
        <h2 class="mb-4 font-serif text-4xl leading-snug font-bold">
          Ready to build?
        </h2>
        <p class="text-base-content/60 mb-8 max-w-md text-base leading-relaxed">
          Start building with Forma today. Free forever. No credit card
          required.
        </p>
        <button
          type="button"
          class="btn btn-primary"
          onClick={props.onStartClick}>
          Start building
        </button>
      </div>
    </div>
  </section>
);
