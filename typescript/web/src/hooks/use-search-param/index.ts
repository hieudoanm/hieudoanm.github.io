import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useSearchParameter = (
  key: string,
  defaultValue = ''
): [string, (value: string) => void] => {
  const router = useRouter();
  const pathname: string = usePathname();
  const searchParameters = useSearchParams();
  const searchParamter = searchParameters.get(key) ?? defaultValue;

  const setSearchParameter = (value = '') => {
    const newSearchParameters = new URLSearchParams(searchParameters);
    newSearchParameters.set(key, value);
    const href: string = `${pathname}?${newSearchParameters.toString()}`;
    router.replace(href, { scroll: true });
  };

  return [searchParamter, setSearchParameter];
};
