import { useIsOnline } from '@web/hooks/use-is-online';
import { Layout } from '@web/layout';
import { trpc } from '@web/utils/trpc';
import { NextPage } from 'next';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

const Status: FC<{ error: any; data: any; loading: boolean }> = ({
  data,
  error,
  loading,
}) => {
  if (loading) return <div className='h-4 w-4 rounded-full bg-gray-500' />;
  if (error) return <div className='h-4 w-4 rounded-full bg-red-500' />;
  if (!data) return <div className='h-4 w-4 rounded-full bg-red-500' />;
  return <div className='h-4 w-4 rounded-full bg-teal-500' />;
};

const Language: FC<{ error: any; data: any; loading: boolean }> = ({
  data,
  error,
  loading,
}) => {
  if (loading) return <></>;
  if (error) return <></>;
  if (!data) return <></>;
  if (data.language.length === 0) return <></>;
  return <p className='text-center'>The sentence is in {data.language}</p>;
};

const LanguagesPage: NextPage = () => {
  const isOnline: boolean = useIsOnline();
  const [text, setText] = useState('');

  const {
    isPending: healthLoading,
    error: healthError,
    data: healthData,
  } = trpc.languages.health.useQuery();

  const { mutate, data, error, isPending } =
    trpc.languages.predict.useMutation();

  const predict = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    mutate({ text });
  };

  if (!isOnline) {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl uppercase'>
            Service is Offline
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <form onSubmit={predict}>
            <div className='flex flex-col gap-y-8'>
              <label htmlFor='text' className='form-control'>
                <div className='label'>
                  <span className='label-text'>Text</span>
                  <span className='label-text-alt'>
                    <Status
                      data={healthData}
                      error={healthError}
                      loading={healthLoading}
                    />
                  </span>
                </div>
                <textarea
                  id='text'
                  name='text'
                  placeholder='Write a text'
                  className='textarea textarea-bordered w-full'
                  rows={4}
                  value={text}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setText(event?.target.value)
                  }
                  required
                />
              </label>
              <button type='submit' className='btn btn-outline w-full'>
                Detect
              </button>
              <Language data={data} error={error} loading={isPending} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LanguagesPage;
