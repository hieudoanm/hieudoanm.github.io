import {
  deleteWebhook,
  getWebhookInfo,
  setWebhook,
} from '@web/clients/telegram/telegram.client';
import { WebhookResult } from '@web/clients/telegram/telegram.dto';
import { useIsOnline } from '@web/hooks/use-is-online';
import { Layout } from '@web/layout';
import { NextPage } from 'next';
import { useState } from 'react';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const NGROK = process.env.NGROK ?? '';

const TelegramPage: NextPage = () => {
  const isOnline: boolean = useIsOnline();

  const [token, setToken] = useState<string>('');
  const [webhookResult, setWebhookResult] = useState<WebhookResult>({
    has_custom_certificate: false,
    pending_update_count: 0,
    url: '',
  });

  const origin: string =
    typeof window !== 'undefined' ? window.location.origin : '';
  const base: string = NODE_ENV === 'production' ? origin : NGROK;
  const webhook: string = `${base}/api/telegram/${token === '' ? '{token}' : token}/webhook`;

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
          <div className='flex flex-col gap-y-8'>
            <label
              htmlFor='token'
              className='input input-bordered flex w-full items-center gap-2'>
              <span className='uppercase'>Token</span>
              <input
                type='text'
                id='token'
                name='token'
                placeholder='Token'
                className='grow'
                value={token}
                onChange={(event) => setToken(event.target.value)}
              />
            </label>
            <div className='flex w-full items-center gap-x-2'>
              <input
                type='text'
                id='webhook'
                name='webhook'
                placeholder='Webhook'
                className='input input-bordered w-full'
                value={webhook}
                readOnly
              />
              <details className='dropdown dropdown-end'>
                <summary className='btn btn-outline m-1'>Actions</summary>
                <ul className='menu dropdown-content z-[1] w-52 rounded bg-base-100 p-2 shadow'>
                  <li>
                    <button
                      type='button'
                      className='btn'
                      onClick={async () => {
                        try {
                          const webhookInfo = await getWebhookInfo(token);
                          setWebhookResult(webhookInfo.result);
                        } catch (error) {
                          alert((error as Error).message);
                        }
                      }}>
                      Get Info
                    </button>
                  </li>
                  <hr className='border-primary' />
                  <li>
                    <button
                      type='button'
                      className='btn'
                      onClick={async () => {
                        try {
                          const response = await setWebhook(token, webhook);
                          alert(response.description);
                          const webhookInfo = await getWebhookInfo(token);
                          setWebhookResult(webhookInfo.result);
                        } catch (error) {
                          alert((error as Error).message);
                        }
                      }}>
                      Set Webhook
                    </button>
                  </li>
                  <hr />
                  <li>
                    <button
                      type='button'
                      className='btn'
                      onClick={async () => {
                        try {
                          const response = await deleteWebhook(token, webhook);
                          alert(response.description);
                          const webhookInfo = await getWebhookInfo(token);
                          setWebhookResult(webhookInfo.result);
                        } catch (error) {
                          alert((error as Error).message);
                        }
                      }}>
                      Delete Webhook
                    </button>
                  </li>
                </ul>
              </details>
            </div>
            {webhookResult.url !== '' ? (
              <div className='rounded-lg bg-secondary p-4'>
                <p className='truncate'>URL: {webhookResult.url}</p>
                <p>
                  Custom Certicate:{' '}
                  {webhookResult.has_custom_certificate.toString()}
                </p>
                <p>Pending Update: {webhookResult.pending_update_count}</p>
              </div>
            ) : (
              <div className='rounded-lg bg-secondary p-4 text-center'>
                No Info
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TelegramPage;
