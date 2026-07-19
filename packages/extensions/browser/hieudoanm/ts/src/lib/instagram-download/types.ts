export interface DownloadMessage {
  action: 'download';
  url: string;
  filename: string;
}

export type ExtensionMessage = DownloadMessage;
