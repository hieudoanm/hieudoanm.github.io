import { useMutation } from '@tanstack/solid-query';

import { createSignal } from 'solid-js';

type Result = {
  has_custom_certificate: boolean;
  ip_address: string;
  max_connections: number;
  pending_update_count: number;
  url: string;
  description: string;
};

const TelegramWebhookPage = () => {
  const [signal, setSignal] = createSignal<{
    token: string;
    webhook: string;
    result: Result;
  }>({
    token: '',
    webhook: '',
    result: {} as Result,
  });

  const setWebhookMutation = useMutation(() => ({
    mutationFn: () => {
      return fetch(`https://api.telegram.org/bot${signal().token}/setWebhook`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: signal().webhook }),
      }).then((response) => response.json());
    },
    onSuccess: async (data) => {
      if (data.ok) {
        const url = `https://api.telegram.org/bot${signal().token}/getWebhookInfo`;
        const getWebhookInfoData: { ok: boolean; result: Result } = await fetch(
          url
        ).then((response) => response.json());
        if (getWebhookInfoData.ok) {
          setSignal((previous) => ({
            ...previous,
            result: {
              ...previous.result,
              ...getWebhookInfoData.result,
              description: data.description,
            },
          }));
        }
      } else {
        console.error(data);
      }
    },
  }));

  const deleteWebhookMutation = useMutation(() => ({
    mutationFn: () => {
      return fetch(
        `https://api.telegram.org/bot${signal().token}/deleteWebhook`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ url: signal().webhook }),
        }
      ).then((response) => response.json());
    },
    onSuccess: async (data) => {
      if (data.ok) {
        setSignal((previous) => ({
          ...previous,
          result: {
            has_custom_certificate: false,
            ip_address: '',
            max_connections: 0,
            pending_update_count: 0,
            url: '',
            description: data.description,
          },
        }));
      }
    },
  }));

  return (
    <div class="h-screen w-screen">
      <div class="container mx-auto h-full p-8">
        <div class="flex h-full w-full items-center justify-center">
          <div class="flex w-full max-w-lg flex-col gap-y-4 rounded border border-gray-300 p-4 shadow">
            <h1 class="text-center text-xl">Telegram Webhook</h1>
            <form
              class="grid grid-cols-1 gap-4 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setWebhookMutation.mutate();
              }}>
              <div class="col-span-1 md:col-span-2">
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
                <input
                  id="webhook"
                  name="webhook"
                  placeholder="Webhook"
                  class="w-full rounded border border-gray-300 px-2 py-1"
                  value={signal().webhook}
                  onChange={(event) => {
                    setSignal((previous) => ({
                      ...previous,
                      webhook: event.target.value,
                    }));
                  }}
                  required
                />
              </div>
              <div class="col-span-1">
                <button
                  type="submit"
                  class="w-full rounded bg-gray-900 px-2 py-1 text-gray-100"
                  disabled={setWebhookMutation.isPending}>
                  {setWebhookMutation.isPending
                    ? 'Setting Webhook'
                    : 'Set Webhook'}
                </button>
              </div>
              <div class="col-span-1 md:col-span-2">
                <button
                  type="button"
                  class="w-full rounded bg-gray-900 px-2 py-1 text-gray-100"
                  disabled={deleteWebhookMutation.isPending}
                  onClick={() => {
                    deleteWebhookMutation.mutate();
                  }}>
                  {deleteWebhookMutation.isPending
                    ? 'Deleting Webhook'
                    : 'Delete Webhook'}
                </button>
              </div>
            </form>
            <div>
              {setWebhookMutation.isError && (
                <div class="text-center">
                  Error: {setWebhookMutation.error.message}
                </div>
              )}
              {JSON.stringify(signal().result) !== '{}' ? (
                <div class="rounded border border-gray-300 p-4">
                  {Boolean(signal().result.description) && (
                    <div class="flex items-center justify-between">
                      <p>Description:</p>
                      <p>{signal().result.description}</p>
                    </div>
                  )}
                  {signal().result.has_custom_certificate && (
                    <div class="flex items-center justify-between">
                      <p>Has Custom Certificate:</p>
                      <p>{signal().result.has_custom_certificate}</p>
                    </div>
                  )}
                  {signal().result.ip_address && (
                    <div class="flex items-center justify-between">
                      <p>IP Address:</p>
                      <p>{signal().result.ip_address}</p>
                    </div>
                  )}
                  {Boolean(signal().result.max_connections) && (
                    <div class="flex items-center justify-between">
                      <p>Max Connections:</p>
                      <p>{signal().result.max_connections}</p>
                    </div>
                  )}
                  {Boolean(signal().result.pending_update_count) && (
                    <div class="flex items-center justify-between">
                      <p>Pending Update Count</p>
                      <p>{signal().result.pending_update_count}</p>
                    </div>
                  )}
                  {Boolean(signal().result.url) && (
                    <div class="flex items-center justify-between">
                      <p>URL:</p>
                      <p>{signal().result.url}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div class="rounded border border-gray-300 p-4">
                  <p class="text-center">No Result</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramWebhookPage;
