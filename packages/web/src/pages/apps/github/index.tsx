import { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import { Oleo_Script } from 'next/font/google';
import html2canvas from 'html2canvas';

const oleoScript = Oleo_Script({ weight: '400', subsets: ['latin'] });

const GitHubPage: NextPage = () => {
  const coverRef = useRef(null);
  const [{ name, username, repository }, setState] = useState({
    name: 'GitHub',
    username: 'hieudoanm',
    repository: 'hieudoanm',
  });

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col gap-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="col-span-1">
            <input
              id="name"
              name="name"
              placeholder="Name"
              className="w-full rounded border border-gray-300 px-2 py-1"
              value={name}
              onChange={(event) => {
                setState((previous) => ({
                  ...previous,
                  name: event.target.value,
                }));
              }}
            />
          </div>
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
            />
          </div>
          <div className="col-span-1">
            <button
              type="button"
              className="w-full rounded bg-gray-900 px-2 py-1 text-gray-100"
              onClick={async () => {
                if (coverRef.current) {
                  setState((previous) => ({
                    ...previous,
                    loading: true,
                  }));
                  await new Promise((resolve) =>
                    requestAnimationFrame(resolve)
                  ); // Wait for rendering
                  const canvas = await html2canvas(coverRef.current, {
                    width: 1280,
                    height: 640,
                    scale: 20,
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
        <div
          className={`aspect-[2/1] w-full border border-gray-300 ${oleoScript.className}`}>
          <div
            ref={coverRef}
            className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col gap-y-16">
              <h1 className="text-9xl">{name}</h1>
              <p className="text-center text-4xl">
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
