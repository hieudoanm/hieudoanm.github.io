import { NextRouter, useRouter } from 'next/router';

const convertToObject = (entries: IterableIterator<[string, string]>) => {
  const result: Record<string, string> = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
};

const getQueryFromClient = (): URLSearchParams => {
  const search: string = window.location.search;
  const queryParams: string[] = search.includes('?') ? search.split('?') : [];
  const init: string =
    queryParams.length > 0 ? queryParams[queryParams.length - 1] : '';
  return new URLSearchParams(init);
};

const getQueryFromServer = (router: NextRouter): URLSearchParams => {
  const { asPath } = router;
  const queryParams: string[] = asPath.includes('?') ? asPath.split('?') : [];
  const init: string =
    queryParams.length > 0 ? queryParams[queryParams.length - 1] : '';
  return new URLSearchParams(init);
};

export const useQuery = (
  key: string,
  defaultValue: string
): [value: string, (newValue: string) => void] => {
  const router: NextRouter = useRouter();
  const { basePath, pathname } = router;
  const urlSearchParams =
    typeof window === 'undefined'
      ? getQueryFromServer(router)
      : getQueryFromClient();
  const value: string = urlSearchParams.get(key) ?? defaultValue;

  const setValue = (newValue: string) => {
    const query = convertToObject(urlSearchParams.entries());
    const newQuery = { ...query, [key]: newValue };
    router.push(`${basePath}${pathname}`, { query: newQuery });
  };

  return [value, setValue];
};
