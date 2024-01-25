export class SetWebhookResponse {
  ok: boolean;
  result: boolean;
  description: string;
}

export class DeleteWebhookResponse {
  ok: boolean;
  result: boolean;
  description: string;
}

export class WebhookResult {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
}

export class WebhookInfo {
  ok: boolean;
  result: WebhookResult;
}
