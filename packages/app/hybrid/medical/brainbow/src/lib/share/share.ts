export interface SharePayload {
  title: string;
  text?: string;
  files?: File[];
}

export const canShare = (): boolean =>
  typeof navigator !== 'undefined' && typeof navigator.share === 'function';

export const canShareFiles = (files: File[]): boolean =>
  canShare() &&
  typeof navigator.canShare === 'function' &&
  navigator.canShare({ files });

export const share = async (payload: SharePayload): Promise<boolean> => {
  if (!canShare()) return false;
  try {
    if (
      payload.files &&
      payload.files.length > 0 &&
      !canShareFiles(payload.files)
    ) {
      return false;
    }
    await navigator.share(payload);
    return true;
  } catch {
    return false;
  }
};

export const shareText = async (
  title: string,
  text: string
): Promise<boolean> => share({ title, text });

export const shareFiles = async (
  title: string,
  files: File[]
): Promise<boolean> => share({ title, files });

export const blobToFile = (blob: Blob, name: string): File =>
  new File([blob], name, { type: blob.type });
