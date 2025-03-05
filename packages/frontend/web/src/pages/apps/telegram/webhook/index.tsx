import { useMutation } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useState } from 'react';

type Result = {
  has_custom_certificate: boolean;
  ip_address: string;
  max_connections: number;
  pending_update_count: number;
  url: string;
  description: string;
};

const TelegramWebhookPage: NextPage = () => {
  const [{ token, webhook, result }, setState] = useState<{
    token: string;
    webhook: string;
    result: Result;
  }>({
    token: '',
    webhook: '',
    result: {} as Result,
  });

  const setWebhookMutation = useMutation({
    mutationFn: () => {
      return fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: webhook }),
      }).then((response) => response.json());
    },
    onSuccess: async (data) => {
      if (data.ok) {
        const url = `https://api.telegram.org/bot${token}/getWebhookInfo`;
        const getWebhookInfoData: { ok: boolean; result: Result } = await fetch(
          url
        ).then((response) => response.json());
        if (getWebhookInfoData.ok) {
          setState((previous) => ({
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
  });

  const deleteWebhookMutation = useMutation({
    mutationFn: () => {
      return fetch(`https://api.telegram.org/bot${token}/deleteWebhook`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: webhook }),
      }).then((response) => response.json());
    },
    onSuccess: async (data) => {
      if (data.ok) {
        setState((previous) => ({
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
  });

  return (
    <div className="h-screen w-screen">
      <div className="container mx-auto h-full p-8">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-lg flex-col gap-y-4 rounded border border-gray-300 p-4 shadow">
            <h1 className="text-center text-xl">Telegram Webhook</h1>
            <form
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setWebhookMutation.mutate();
              }}>
              <div className="col-span-1 md:col-span-2">
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
                <input
                  id="webhook"
                  name="webhook"
                  placeholder="Webhook"
                  className="w-full rounded border border-gray-300 px-2 py-1"
                  value={webhook}
                  onChange={(event) => {
                    setState((previous) => ({
                      ...previous,
                      webhook: event.target.value,
                    }));
                  }}
                  required
                />
              </div>
              <div className="col-span-1">
                <button
                  type="submit"
                  className="w-full rounded bg-gray-900 px-2 py-1 text-gray-100"
                  disabled={setWebhookMutation.isPending}>
                  {setWebhookMutation.isPending
                    ? 'Setting Webhook'
                    : 'Set Webhook'}
                </button>
              </div>
              <div className="col-span-1 md:col-span-2">
                <button
                  type="button"
                  className="w-full rounded bg-gray-900 px-2 py-1 text-gray-100"
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
                <div className="text-center">
                  Error: {setWebhookMutation.error.message}
                </div>
              )}
              {JSON.stringify(result) !== '{}' ? (
                <div className="rounded border border-gray-300 p-4">
                  {Boolean(result.description) && (
                    <div className="flex items-center justify-between">
                      <p>Description:</p>
                      <p>{result.description}</p>
                    </div>
                  )}
                  {result.has_custom_certificate && (
                    <div className="flex items-center justify-between">
                      <p>Has Custom Certificate:</p>
                      <p>{result.has_custom_certificate}</p>
                    </div>
                  )}
                  {result.ip_address && (
                    <div className="flex items-center justify-between">
                      <p>IP Address:</p>
                      <p>{result.ip_address}</p>
                    </div>
                  )}
                  {Boolean(result.max_connections) && (
                    <div className="flex items-center justify-between">
                      <p>Max Connections:</p>
                      <p>{result.max_connections}</p>
                    </div>
                  )}
                  {Boolean(result.pending_update_count) && (
                    <div className="flex items-center justify-between">
                      <p>Pending Update Count</p>
                      <p>{result.pending_update_count}</p>
                    </div>
                  )}
                  {Boolean(result.url) && (
                    <div className="flex items-center justify-between">
                      <p>URL:</p>
                      <p>{result.url}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded border border-gray-300 p-4">
                  <p className="text-center">No Result</p>
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
