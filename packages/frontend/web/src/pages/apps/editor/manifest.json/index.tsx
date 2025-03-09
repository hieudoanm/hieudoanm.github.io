import { downloadText } from '@web/utils/download';
import { copyToClipboard } from '@web/utils/navigator';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

type Display = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
type Orientation =
  | 'any'
  | 'natural'
  | 'landscape'
  | 'landscape-primary'
  | 'landscape-secondary'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary';

type Manifest = {
  manifest_version: number;
  version: string;
  version_name: string;
  name: string;
  short_name: string;
  description: string;
  author: string;
  default_locale: string;
  theme_color: string;
  background_color: string;
  display: Display;
  orientation: Orientation;
  scope: string;
  homepage_url: string;
  start_url: string;
  offline_enabled: boolean;
};

const ManifestPage: NextPage = () => {
  const [manifest, setManifest] = useState<Manifest>({
    manifest_version: 3,
    version: '1.0.0',
    version_name: '1.0.0-alpha',
    name: 'Nothing',
    short_name: 'Nothing is a list of mini apps',
    description: 'Nothing (Web, CLI)',
    author: 'hieumdoan@gmail.com',
    default_locale: 'en',
    theme_color: '#000000',
    background_color: '#000000',
    display: 'standalone',
    orientation: 'landscape',
    scope: '/',
    start_url: '/',
    homepage_url: 'https://example.com',
    offline_enabled: true,
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <div className="flex w-full flex-col p-8">
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="version"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Version
                </label>
                <input
                  id="version"
                  type="text"
                  name="version"
                  placeholder="Version"
                  className="w-full py-1"
                  value={manifest.version}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      version: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="version_name"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Version Name
                </label>
                <input
                  id="version_name"
                  type="text"
                  name="version_name"
                  placeholder="Version"
                  className="w-full py-1"
                  value={manifest.version_name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      version_name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="name"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full py-1"
                  value={manifest.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({ ...manifest, name: event.target.value })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="short_name"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Short Name
                </label>
                <input
                  id="short_name"
                  type="text"
                  name="short_name"
                  placeholder="Short Name"
                  className="w-full py-1"
                  value={manifest.short_name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      short_name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="description"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="w-full py-1"
                  value={manifest.description}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      description: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="author"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Author
                </label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  placeholder="Author"
                  className="w-full py-1"
                  value={manifest.author}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      author: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="default_locale"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Default Locale
                </label>
                <input
                  id="default_locale"
                  type="text"
                  name="default_locale"
                  placeholder="Default Locale"
                  className="w-full py-1"
                  value={manifest.author}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      author: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="theme_color"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Theme Color
                </label>
                <input
                  id="theme_color"
                  type="text"
                  name="theme_color"
                  placeholder="Theme Color"
                  className="w-full py-1"
                  value={manifest.theme_color}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      theme_color: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="background_color"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Background Color
                </label>
                <input
                  id="background_color"
                  type="text"
                  name="background_color"
                  placeholder="Background Color"
                  className="w-full py-1"
                  value={manifest.background_color}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      theme_color: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="display"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Display
                </label>
                <select
                  id="display"
                  name="display"
                  className="w-full appearance-none py-1"
                  value={manifest.display}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    setManifest({
                      ...manifest,
                      display: event.target.value as Display,
                    })
                  }>
                  <option disabled value={''}>
                    Display
                  </option>
                  <option value={'fullscreen'} selected>
                    fullscreen
                  </option>
                  <option value={'standalone'}>standalone</option>
                  <option value={'minimal-ui'}>minimal-ui</option>
                  <option value={'browser'}>browser</option>
                </select>
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="orientation"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Orientation
                </label>
                <select
                  id="orientation"
                  name="orientation"
                  className="w-full appearance-none py-1"
                  value={manifest.orientation}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    setManifest({
                      ...manifest,
                      orientation: event.target.value as Orientation,
                    })
                  }>
                  <option disabled>Orientation</option>
                  <option value={'any'}>any</option>
                  <option value={'natural'}>natural</option>
                  <option value={'landscape'} selected>
                    landscape
                  </option>
                  <option value={'landscape-primary'}>landscape-primary</option>
                  <option value={'landscape-secondary'}>
                    landscape-secondary
                  </option>
                  <option value={'portrait'}>portrait</option>
                  <option value={'portrait-primary'}>portrait-primary</option>
                  <option value={'portrait-secondary'}>
                    portrait-secondary
                  </option>
                </select>
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="scope"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Scope
                </label>
                <input
                  id="orientation"
                  type="text"
                  name="scope"
                  placeholder="Scope"
                  className="w-full py-1"
                  value={manifest.scope}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      scope: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="start_url"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Start URL
                </label>
                <input
                  id="start_url"
                  type="text"
                  name="start_url"
                  placeholder="Start URL"
                  className="w-full py-1"
                  value={manifest.start_url}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      start_url: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex w-full items-center border-t border-gray-300">
                <label
                  htmlFor="homepage_url"
                  className="w-60 truncate px-2 whitespace-nowrap">
                  Home Page URL
                </label>
                <input
                  id="homepage_url"
                  type="text"
                  name="homepage_url"
                  placeholder="Home Page URL"
                  className="w-full py-1"
                  value={manifest.homepage_url}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setManifest({
                      ...manifest,
                      homepage_url: event.target.value,
                    })
                  }
                />
              </div>
              <button
                type="button"
                className="w-full bg-gray-900 py-2 text-gray-100"
                onClick={() =>
                  downloadText({
                    content: JSON.stringify(manifest, null, 4),
                    format: 'json',
                    filename: 'manifest',
                  })
                }>
                Download
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <textarea
            name="manifest.json"
            placeholder="manifest.json"
            className="h-full w-full bg-gray-900 p-4 whitespace-pre text-gray-100"
            value={JSON.stringify(manifest, null, 4)}
            rows={18}
            onClick={() => {
              copyToClipboard(JSON.stringify(manifest, null, 4));
            }}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default ManifestPage;
