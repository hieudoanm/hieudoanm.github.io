import { log } from '../../libs/log';

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    log.error(error);
  }
};

export default copyToClipboard;
