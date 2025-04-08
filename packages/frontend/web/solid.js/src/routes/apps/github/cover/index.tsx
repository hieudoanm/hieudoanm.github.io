import { createSignal } from 'solid-js';
import html2canvas from 'html2canvas-pro';

const GitHubPage = () => {
  let coverRef: HTMLDivElement | null = null;
  const [{ name, username, repository }, setState] = createSignal({
    name: 'GitHub',
    username: 'hieudoanm',
    repository: 'hieudoanm',
  });

  return (
    <div class="container mx-auto p-8">
      <div class="flex flex-col gap-y-4">
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div class="col-span-1">
            <input
              id="name"
              name="name"
              placeholder="Name"
              class="w-full rounded border border-gray-300 px-2 py-1"
              value={name}
              onChange={(event) => {
                setState((previous) => ({
                  ...previous,
                  name: event.target.value,
                }));
              }}
            />
          </div>
          <div class="col-span-1">
            <input
              id="username"
              name="username"
              placeholder="Username"
              class="w-full rounded border border-gray-300 px-2 py-1"
              value={username}
              onChange={(event) => {
                setState((previous) => ({
                  ...previous,
                  username: event.target.value,
                }));
              }}
            />
          </div>
          <div class="col-span-1">
            <input
              id="repository"
              name="repository"
              placeholder="Repository"
              class="w-full rounded border border-gray-300 px-2 py-1"
              value={repository}
              onChange={(event) => {
                setState((previous) => ({
                  ...previous,
                  repository: event.target.value,
                }));
              }}
            />
          </div>
          <div class="col-span-1">
            <button
              type="button"
              class="w-full rounded bg-gray-900 px-2 py-1 text-gray-100"
              onClick={async () => {
                if (coverRef) {
                  setState((previous) => ({
                    ...previous,
                    loading: true,
                  }));
                  await new Promise((resolve) =>
                    requestAnimationFrame(resolve)
                  ); // Wait for rendering
                  const canvas = await html2canvas(coverRef, {
                    width: 1280,
                    height: 640,
                    scale: 1,
                    allowTaint: true,
                  });
                  const dataURL = canvas.toDataURL('image/png');
                  // Create a download link
                  const link = document.createElement('a');
                  link.href = dataURL;
                  link.download = 'cover.png';
                  link.click();
                  link.remove();
                  setState((previous) => ({
                    ...previous,
                    loading: false,
                  }));
                }
              }}>
              Download
            </button>
          </div>
        </div>
        <div class={`aspect-[2/1] w-full border border-gray-300`}>
          <div
            ref={(el) => (coverRef = el)}
            class="flex h-full w-full items-center justify-center">
            <div class="flex flex-col gap-y-16">
              <h1 class="text-9xl">{name}</h1>
              <p class="text-center text-4xl">
                {username} / {repository}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubPage;
