export type Download = {
  id: string;
  label: string;
  url: string;
  emoji: string;
  color: string;
  description: string;
  downloads: { label: string; url: string }[];
};
