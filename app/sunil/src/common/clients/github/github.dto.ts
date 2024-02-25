export type Language = {
  language_id: number;
  language: string;
  type: string;
  color: string;
  tm_scope: string;
  ace_mode: string;
  extensions: string[];
};

export type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  mode_id: string;
  html_url: string;
  description: string;
  implementation: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
  body: string;
  featured: boolean;
};
