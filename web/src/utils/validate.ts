export const validate = (url: string): boolean => {
  const pattern: RegExp =
    /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/[a-zA-Z0-9_-]+\/?$/;
  return pattern.test(url);
};
