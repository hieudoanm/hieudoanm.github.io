import React, { useState } from 'react';
import Button from '../../atoms/Button';
import Container from '../../atoms/Container';
import Input from '../../atoms/Input';

export type NewsletterSectionProps = {
  id: string;
  title: string;
  subtitle: string;
};

const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  id,
  title,
  subtitle,
}) => {
  const [email, setEmail] = useState('');

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div id={id} className="bg-gray-900">
      <Container>
        <div className="md:flex justify-between items-center py-16 gap-8">
          <div className="text-white mb-8 md:mb-0">
            <h2 className="text-xl uppercase text-2xl">{title}</h2>
            <p className="text-justify">{subtitle}</p>
          </div>
          <form onSubmit={submit} className="flex items-center gap-8">
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full md:w-auto"
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              required
            />
            <Button
              type="submit"
              bg="bg-white"
              color="black"
              className="uppercase w-full md:w-auto"
            >
              Notify
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default NewsletterSection;
