import { A } from '@solidjs/router';

export interface AppCardProps {
  href: string;
  name: string;
  emoji: string;
}

export const AppCard = (props: AppCardProps) => (
  <A href={props.href}>
    <button
      type="button"
      class="card bg-base-200 border-base-300 hover:bg-base-300 group w-full border text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
      <div class="card-body flex-col items-center justify-center gap-2 p-4 text-center">
        <div class="bg-neutral border-primary-content flex h-10 w-10 items-center justify-center rounded-xl border text-xl shadow-inner transition-transform duration-300 group-hover:scale-110">
          {props.emoji}
        </div>
        <div>
          <div class="truncate text-sm font-bold tracking-tight">
            {props.name}
          </div>
          <div class="text-base-content/40 mt-0.5 truncate text-[10px] tracking-widest uppercase">
            {props.name}
          </div>
        </div>
      </div>
    </button>
  </A>
);
