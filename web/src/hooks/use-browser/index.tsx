export const useBrowser = () => {
  if (typeof window === 'undefined' || !window.navigator.userAgent) {
    return 'Unknown';
  }
  if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
    return 'Google Chrome';
  }
  if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
    return 'Mozilla Firefox';
  }
  if (window.navigator.userAgent.indexOf('MSIE') !== -1) {
    return 'Internet Exployer';
  }
  if (window.navigator.userAgent.indexOf('Edge') !== -1) {
    return 'Edge';
  }
  if (window.navigator.userAgent.indexOf('Safari') !== -1) {
    return 'Safari';
  }
  if (window.navigator.userAgent.indexOf('Opera') !== -1) {
    return 'Opera';
  }
  if (window.navigator.userAgent.indexOf('YaBrowser') !== -1) {
    return 'YaBrowser';
  }
  return 'Unknown';
};
