import { Container } from '@hieudoanm/components/Container';
import type React from 'react';
import { useState } from 'react';

export type NewsletterSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
};

const submit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export const NewsletterSection: React.FC<NewsletterSectionProperties> = ({
  id,
  title,
  subtitle,
}) => {
  const [email, setEmail] = useState('');

  return (
    <div id={id} className="bg-gray-900">
      <Container>
        <div className="items-center justify-between gap-8 py-16 md:flex">
          <div className="mb-8 text-white md:mb-0">
            <h2 className="text-xl uppercase md:text-2xl">{title}</h2>
            <p className="text-justify">{subtitle}</p>
          </div>
          <form onSubmit={submit} className="flex items-center gap-8">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered w-full md:w-auto"
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              required
            />
            <button
              type="submit"
              className="btn-white w-full uppercase md:w-auto">
              Notify
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};
