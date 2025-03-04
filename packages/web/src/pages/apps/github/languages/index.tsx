/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextPage } from 'next';
import languages from '@nothing/json/github/languages.json';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas-pro';

const GitHubLanguagesPage: NextPage = () => {
  const languagesRef = useRef(null);

  const [{ token, username, repository }, setState] = useState<{
    token: string;
    username: string;
    repository: string;
  }>({
    token: '',
    username: 'hieudoanm',
    repository: 'reverse-proxy',
  });

  const url = `https://api.github.com/repos/${username}/${repository}/languages`;
  const { isPending, error, data, refetch } = useQuery({
    queryKey: [`repository-${username}-${repository}`],
    queryFn: () => {
      return fetch(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: token === '' ? '' : `token ${token}`,
        },
      }).then((response) => response.json());
    },
  });

  return (
    <div className="h-screen w-screen p-4">
      <div className="flex w-full flex-col gap-y-4 rounded border border-gray-300 p-4 shadow">
        <h1 className="text-center text-xl">GitHub Repository Languages</h1>
        <form
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          onSubmit={(event) => {
            event.preventDefault();
            refetch();
          }}>
          <div className="col-span-1">
            <input
              id="username"
              name="username"
              placeholder="Username"
              className="w-full rounded border border-gray-300 px-2 py-1"
              value={username}
              onChange={(event) => {
                setState((previous) => ({
                  ...previous,
                  username: event.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="col-span-1">
            <input
              id="repository"
              name="repository"
              placeholder="Repository"
              className="w-full rounded border border-gray-300 px-2 py-1"
              value={repository}
              onChange={(event) => {
                setState((previous) => ({
                  ...previous,
                  repository: event.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="col-span-1">
            <input
              id="token"
              name="token"
              placeholder="Token"
              className="w-full rounded border border-gray-300 px-2 py-1"
              value={token}
              onChange={(event) => {
                setState((previous) => ({
                  ...previous,
                  token: event.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="w-full rounded bg-gray-900 px-2 py-1 text-gray-100"
              disabled={isPending}>
              {isPending ? 'Querying' : 'Query'}
            </button>
          </div>
        </form>
        <div
          ref={languagesRef}
          className="flex h-12 w-full items-center overflow-hidden rounded">
          {isPending && <div className="text-center">Loading</div>}
          {error && <div className="text-center">Error: {error.message}</div>}
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
                      key={languageKey}
                      className="flex h-full w-full items-center justify-center text-center text-xs text-gray-100"
                      style={{ backgroundColor: color }}>
                      {languageKey}
                    </div>
                  );
                })}
            </>
          )}
        </div>
        <button
          type="button"
          className="w-full rounded bg-gray-900 px-2 py-1 text-gray-100"
          onClick={async () => {
            if (languagesRef.current) {
              await new Promise((resolve) => requestAnimationFrame(resolve)); // Wait for rendering
              const canvas = await html2canvas(languagesRef.current, {
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
