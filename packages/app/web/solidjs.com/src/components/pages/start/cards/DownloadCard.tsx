export interface Download {
  label: string;
  url: string;
}

export interface DownloadCardProps {
  label: string;
  description: string;
  emoji: string;
  color: string;
  downloads: Download[];
}

export const DownloadCard = (props: DownloadCardProps) => (
  <div
    class="card bg-base-200 border-base-300 hover:bg-base-300 group w-full border text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
    style={{ background: `${props.color}11` } as any}>
    <div class="card-body flex-col items-center justify-center gap-2 p-4 text-center">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-inner transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${props.color}22`,
          border: `1.5px solid ${props.color}44`,
        }}>
        <span>{props.emoji}</span>
      </div>
      <div class="mb-2">
        <div class="text-sm font-bold tracking-tight">{props.label}</div>
        <div class="text-base-content/40 mt-0.5 text-[10px] tracking-widest uppercase">
          {props.description}
        </div>
      </div>
      <div class="flex w-full flex-col gap-1.5">
        {props.downloads.map((download, index) => (
          <a
            key={index}
            href={download.url}
            download
            class="btn btn-primary btn-xs w-full no-underline transition-all">
            {download.label}
          </a>
        ))}
      </div>
    </div>
  </div>
);
