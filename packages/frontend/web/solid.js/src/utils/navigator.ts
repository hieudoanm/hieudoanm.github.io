export const copyToClipboard = (text: string) => {
  if (!navigator?.clipboard) return alert('Incompatible');
  navigator.clipboard.writeText(text);
  alert(`Copy "${text}" to Clipboard`);
};
