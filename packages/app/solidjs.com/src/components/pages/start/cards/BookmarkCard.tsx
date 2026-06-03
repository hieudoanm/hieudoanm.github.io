export interface BookmarkItem {
  label: string;
  url: string;
  description: string;
  emoji: string;
  color: string;
  badge?: string;
}

export const BookmarkCard = (props: BookmarkItem) => (
  <a
    href={props.url}
    rel="noopener noreferrer"
    class="card bg-base-200 border-base-300 hover:bg-base-300 group relative border transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
    style={{ background: `${props.color}11` } as any}>
    {props.badge && (
      <span
        class="absolute -top-2 right-0 rounded-full px-1.5 py-0.5 font-mono text-[9px] leading-none font-bold tracking-widest uppercase"
        style={{
          background: `${props.color}22`,
          color: props.color,
          border: `1px solid ${props.color}44`,
        }}>
        {props.badge}
      </span>
    )}
    <div class="card-body flex-col items-center justify-center gap-2 p-4 text-center">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-inner transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${props.color}22`,
          border: `1.5px solid ${props.color}44`,
        }}>
        <span>{props.emoji}</span>
      </div>
      <div>
        <div class="truncate text-sm font-bold tracking-tight">
          {props.label}
        </div>
        <div class="text-base-content/40 mt-0.5 truncate text-[10px] tracking-widest uppercase">
          {props.description}
        </div>
      </div>
    </div>
  </a>
);
