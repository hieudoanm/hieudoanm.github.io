interface TagBadgeProps {
  tag: string;
  active?: boolean;
  onClick?: (tag: string) => void;
}

export const TagBadge = (props: TagBadgeProps) => {
  if (props.onClick) {
    return (
      <button
        type="button"
        onClick={() => props.onClick!(props.tag)}
        class={`badge badge-sm cursor-pointer transition-colors ${
          props.active
            ? 'badge-primary text-primary-content'
            : 'badge-ghost border-base-300 text-base-content/60 hover:text-base-content'
        }`}>
        {props.tag}
      </button>
    );
  }

  return (
    <span
      class={`badge badge-sm ${
        props.active
          ? 'badge-primary text-primary-content'
          : 'badge-ghost border-base-300 text-base-content/60'
      }`}>
      {props.tag}
    </span>
  );
};
