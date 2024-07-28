import { Layout } from '@web/layout';
import { copyToClipboard } from '@web/utils/copy';
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
  name: string;
  short_name: string;
  description: string;
  theme_color: string;
  background_color: string;
  display: Display;
  orientation: Orientation;
  scope: string;
  start_url: string;
  offline_enabled: boolean;
};

const ManifestPage: NextPage = () => {
  const [manifest, setManifest] = useState<Manifest>({
    manifest_version: 3,
    version: '1.0.0',
    name: 'Name',
    short_name: 'Short Name',
    description: 'Description',
    theme_color: '#000000',
    background_color: '#000000',
    display: 'standalone',
    orientation: 'landscape',
    scope: '/',
    start_url: '/',
    offline_enabled: true,
  });
  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <div className='col-span-1'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='col-span-1'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>Version</span>
                    </div>
                    <input
                      type='text'
                      name='version'
                      placeholder='Version'
                      className='input input-bordered'
                      value={manifest.version}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setManifest({
                          ...manifest,
                          version: event.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className='col-span-1'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>Name</span>
                    </div>
                    <input
                      type='text'
                      name='name'
                      placeholder='Name'
                      className='input input-bordered'
                      value={manifest.name}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setManifest({ ...manifest, name: event.target.value })
                      }
                    />
                  </label>
                </div>
                <div className='col-span-1'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>Short Name</span>
                    </div>
                    <input
                      type='text'
                      name='short_name'
                      placeholder='Short Name'
                      className='input input-bordered'
                      value={manifest.short_name}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setManifest({
                          ...manifest,
                          short_name: event.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className='col-span-1'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>Description</span>
                    </div>
                    <input
                      type='text'
                      name='description'
                      placeholder='Description'
                      className='input input-bordered'
                      value={manifest.description}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setManifest({
                          ...manifest,
                          description: event.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className='col-span-1'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>Theme Color</span>
                    </div>
                    <div className='join w-full'>
                      <input
                        type='text'
                        name='theme_color'
                        placeholder='Theme Color'
                        className='input join-item input-bordered grow'
                        value={manifest.theme_color}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setManifest({
                            ...manifest,
                            theme_color: event.target.value,
                          })
                        }
                      />
                      <input
                        type='color'
                        name='theme_color'
                        placeholder='Theme Color'
                        className='input join-item input-bordered'
                        value={manifest.theme_color}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setManifest({
                            ...manifest,
                            theme_color: event.target.value,
                          })
                        }
                      />
                    </div>
                  </label>
                </div>
                <div className='col-span-1'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>Background Color</span>
                    </div>
                    <div className='join'>
                      <input
                        type='text'
                        name='background_color'
                        placeholder='Background Color'
                        className='input join-item input-bordered grow'
                        value={manifest.background_color}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setManifest({
                            ...manifest,
                            background_color: event.target.value,
                          })
                        }
                      />
                      <input
                        type='color'
                        name='background_color'
                        placeholder='Background Color'
                        className='input join-item input-bordered'
                        value={manifest.background_color}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setManifest({
                            ...manifest,
                            background_color: event.target.value,
                          })
                        }
                      />
                    </div>
                  </label>
                </div>
                <div className='col-span-1'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>Display</span>
                    </div>
                    <select
                      name='display'
                      className='select select-bordered'
                      value={manifest.display}
                      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                        setManifest({
                          ...manifest,
                          display: event.target.value as Display,
                        })
                      }>
                      <option disabled>Display</option>
                      <option value={'fullscreen'} selected>
                        fullscreen
                      </option>
                      <option value={'standalone'}>standalone</option>
                      <option value={'minimal-ui'}>minimal-ui</option>
                      <option value={'browser'}>browser</option>
                    </select>
                  </label>
                </div>
                <div className='col-span-1'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>Orientation</span>
                    </div>
                    <select
                      name='orientation'
                      className='select select-bordered'
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
                      <option value={'landscape-primary'}>
                        landscape-primary
                      </option>
                      <option value={'landscape-secondary'}>
                        landscape-secondary
                      </option>
                      <option value={'portrait'}>portrait</option>
                      <option value={'portrait-primary'}>
                        portrait-primary
                      </option>
                      <option value={'portrait-secondary'}>
                        portrait-secondary
                      </option>
                    </select>
                  </label>
                </div>
                <div className='col-span-1'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>Scope</span>
                    </div>
                    <input
                      type='text'
                      name='scope'
                      placeholder='Scope'
                      className='input input-bordered'
                      value={manifest.scope}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setManifest({
                          ...manifest,
                          scope: event.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className='col-span-1'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>Start URL</span>
                    </div>
                    <input
                      type='text'
                      name='start_url'
                      placeholder='Start URL'
                      className='input input-bordered'
                      value={manifest.start_url}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setManifest({
                          ...manifest,
                          start_url: event.target.value,
                        })
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className='col-span-1'>
              <div className='flex flex-col gap-y-4'>
                <label className='form-control'>
                  <div className='label'>
                    <span className='label-text'>manifest.json</span>
                  </div>
                  <textarea
                    name='manifest'
                    placeholder='manifest.json'
                    className='textarea textarea-bordered w-full'
                    value={JSON.stringify(manifest, null, 4)}
                    rows={14}
                    disabled
                  />
                </label>
                <button
                  type='button'
                  className='btn btn-outline w-full'
                  onClick={() =>
                    copyToClipboard(JSON.stringify(manifest, null, 4))
                  }>
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManifestPage;
