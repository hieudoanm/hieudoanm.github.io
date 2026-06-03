interface ChatFooterProps {
  disclaimer?: string;
}

export const ChatFooter = (props: ChatFooterProps) => (
  <div class="border-base-300 border-t px-6 py-3 text-center">
    <p class="text-base-content/20 text-xs">
      {props.disclaimer ??
        'AI responses are generated and may not be accurate. Verify important information.'}
    </p>
  </div>
);
