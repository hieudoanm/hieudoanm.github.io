export type Platform = 'linkedin' | 'facebook' | 'twitter' | 'instagram';

export const PLATFORMS: {
  id: Platform;
  label: string;
  size: number;
  desc: string;
}[] = [
  { id: 'linkedin', label: 'LinkedIn', size: 400, desc: '400×400 px' },
  { id: 'facebook', label: 'Facebook', size: 320, desc: '320×320 px' },
  { id: 'twitter', label: 'Twitter', size: 400, desc: '400×400 px' },
  { id: 'instagram', label: 'Instagram', size: 320, desc: '320×320 px' },
];

export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};
