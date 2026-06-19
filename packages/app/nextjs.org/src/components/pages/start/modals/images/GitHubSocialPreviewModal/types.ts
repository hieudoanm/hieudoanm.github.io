export type Language = { name: string; color: string };

export type RepoData = {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  owner: { login: string; avatar_url: string };
  license: { spdx_id: string } | null;
  open_issues_count: number;
};
