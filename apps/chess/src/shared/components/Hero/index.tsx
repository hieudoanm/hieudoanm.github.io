'use client';

import hero from '@chess/common/assets/hero.jpg';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

export const Hero: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');

  return (
    <div
      className="h-screen bg-cover bg-right-top"
      style={{ backgroundImage: `url(${hero.src})` }}>
      <div className="flex h-full items-center justify-center border-b bg-teal-500/50">
        <div className="card border border-gray-200 shadow">
          <div className="px-8 py-4">
            <p className="text-center text-xl md:text-3xl">{APP_NAME}</p>
          </div>
          <div className="divider m-0" />
          <div className="card-body">
            <div className="flex flex-col gap-4 text-center">
              <form
                onSubmit={(event: FormEvent) => {
                  event.preventDefault();
                  router.push(`/${encodeURIComponent(username)}`);
                }}>
                <label htmlFor="username" className="truncate">
                  Search with chess.com username
                </label>
                <div className="flex items-center justify-between gap-x-2 md:gap-x-4">
                  <input
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="input input-bordered"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                  <button
                    aria-label="search"
                    type="submit"
                    className="btn bg-teal-500 text-white">
                    <FaSearch />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="divider m-0" />
          <div className="px-8 py-4">
            <ScrollLink to="demo" smooth={true} spy={true} duration={500}>
              <button
                type="button"
                className="btn w-full bg-teal-500 text-white">
                View Demo
              </button>
            </ScrollLink>
          </div>
        </div>
      </div>
    </div>
  );
};
