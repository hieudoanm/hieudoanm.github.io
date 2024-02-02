export type SetWebhookResponse = {
  ok: boolean;
  result: boolean;
  description: string;
};

export type DeleteWebhookResponse = {
  ok: boolean;
  result: boolean;
  description: string;
};

export type WebhookResult = {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
};

export type WebhookInfo = {
  ok: boolean;
  result: WebhookResult;
};
