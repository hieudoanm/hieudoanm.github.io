/* eslint-disable @typescript-eslint/no-explicit-any */

import languages from '~/json/github/languages.json';
import { useQuery } from '@tanstack/solid-query';
import { createSignal } from 'solid-js';
import html2canvas from 'html2canvas-pro';

const GitHubLanguagesPage = () => {
  let languagesRef: HTMLDivElement | null = null;

  const [signal, setSignal] = createSignal<{
    token: string;
    username: string;
    repository: string;
  }>({
    token: '',
    username: 'hieudoanm',
    repository: 'reverse-proxy',
  });

  const url = `https://api.github.com/repos/${signal().username}/${signal().repository}/languages`;
  const { isPending, error, data, refetch } = useQuery(() => ({
    queryKey: [`repository-${signal().username}-${signal().repository}`],
    queryFn: () => {
      return fetch(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: signal().token === '' ? '' : `token ${signal().token}`,
        },
      }).then((response) => response.json());
    },
  }));

  return (
    <div class="h-screen w-screen p-4">
      <div class="flex w-full flex-col gap-y-4 rounded border border-gray-300 p-4 shadow">
        <h1 class="text-center text-xl">GitHub Repository Languages</h1>
        <form
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          onSubmit={(event) => {
            event.preventDefault();
            refetch();
          }}>
          <div class="col-span-1">
            <input
              id="username"
              name="username"
              placeholder="Username"
              class="w-full rounded border border-gray-300 px-2 py-1"
              value={signal().username}
              onChange={(event) => {
                setSignal((previous) => ({
                  ...previous,
                  username: event.target.value,
                }));
              }}
              required
            />
          </div>
          <div class="col-span-1">
            <input
              id="repository"
              name="repository"
              placeholder="Repository"
              class="w-full rounded border border-gray-300 px-2 py-1"
              value={signal().repository}
              onChange={(event) => {
                setSignal((previous) => ({
                  ...previous,
                  repository: event.target.value,
                }));
              }}
              required
            />
          </div>
          <div class="col-span-1">
            <input
              id="token"
              name="token"
              placeholder="Token"
              class="w-full rounded border border-gray-300 px-2 py-1"
              value={signal().token}
              onChange={(event) => {
                setSignal((previous) => ({
                  ...previous,
                  token: event.target.value,
                }));
              }}
              required
            />
          </div>
          <div class="col-span-1">
            <button
              type="submit"
              class="w-full rounded bg-gray-900 px-2 py-1 text-gray-100"
              disabled={isPending}>
              {isPending ? 'Querying' : 'Query'}
            </button>
          </div>
        </form>
        <div
          ref={(el) => (languagesRef = el)}
          class="flex h-12 w-full items-center overflow-hidden rounded">
          {isPending && <div class="text-center">Loading</div>}
          {error && <div class="text-center">Error: {error.message}</div>}
          {JSON.stringify(data) !== '{}' && (
            <>
              {Object.keys(data ?? {})
                .filter((languageKey: string) => {
                  const language: Record<string, any> =
                    (languages as Record<string, Record<string, any>>)[
                      languageKey
                    ] ?? {};
                  const { color = '' } = language;
                  return color;
                })
                .map((languageKey: string) => {
                  const language: Record<string, any> =
                    (languages as Record<string, Record<string, any>>)[
                      languageKey
                    ] ?? {};
                  const { color = '' } = language;
                  return (
                    <div
                      title={languageKey}
                      class="flex h-full w-full items-center justify-center text-center text-xs text-gray-100"
                      style={{ 'background-color': color }}>
                      {languageKey}
                    </div>
                  );
                })}
            </>
          )}
        </div>
        <button
          type="button"
          class="w-full rounded bg-gray-900 px-2 py-1 text-gray-100"
          onClick={async () => {
            if (languagesRef) {
              await new Promise((resolve) => requestAnimationFrame(resolve)); // Wait for rendering
              const canvas = await html2canvas(languagesRef, {
                backgroundColor: null,
                scale: 10,
                removeContainer: true,
              });
              const dataURL = canvas.toDataURL('image/png');
              // Create a download link
              const link = document.createElement('a');
              link.href = dataURL;
              link.download = 'languages.png';
              link.click();
              link.remove();
            }
          }}>
          Download
        </button>
      </div>
    </div>
  );
};

export default GitHubLanguagesPage;
