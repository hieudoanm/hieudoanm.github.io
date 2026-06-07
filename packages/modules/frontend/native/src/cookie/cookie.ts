export interface CookieAPI {
  set: (name: string, value: string, days?: number) => void;
  get: (name: string) => string | null;
  remove: (name: string) => void;
  isSupported: () => boolean;
}

const getDocument = (): Document | null => {
  if (typeof document === 'undefined') return null;
  return document;
};

export const createCookie = (): CookieAPI => {
  const doc = getDocument();

  const isSupported = (): boolean => doc !== null;

  const set = (name: string, value: string, days?: number): void => {
    if (!doc) return;

    let expires = '';
    if (days !== undefined) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }

    doc.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
  };

  const get = (name: string): string | null => {
    if (!doc) return null;

    const regex = new RegExp('(^| )' + name + '=([^;]+)');
    const result = regex.exec(doc.cookie);
    return result ? decodeURIComponent(result[2] ?? '') : null;
  };

  const remove = (name: string): void => {
    if (!doc) return;
    set(name, '', -1);
  };

  return {
    set,
    get,
    remove,
    isSupported,
  };
};
