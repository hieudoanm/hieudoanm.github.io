import { Command } from '@oclif/core';
import { readlineSync } from '../../../utils/readline';
import { getWebhookInfo, setWebhook } from '../../../utils/telegram';

export default class SetWebhook extends Command {
  public async run(): Promise<void> {
    const telegramToken: string = await readlineSync('Telegram Token');
    const telegramWebhook: string = await readlineSync('Telegram Webhook');
    const setWebhookResponse = await setWebhook(telegramToken, telegramWebhook);
    console.info(setWebhookResponse);
    const getWebhookInfoResponse = await getWebhookInfo(telegramToken);
    console.info(getWebhookInfoResponse);
  }
}
