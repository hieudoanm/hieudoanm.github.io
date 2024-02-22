'use client';

import { useSearchParameter } from '@broca/common/hooks/use-search-param';
import { Language } from '@prisma/client';
import Link from 'next/link';

type LanguagesTemplateProperties = {
  languages: Language[];
};

export const LanguagesTemplate: React.FC<LanguagesTemplateProperties> = ({
  languages = [],
}) => {
  const [category, setCategory] = useSearchParameter('category');
  const [duolingo, setDuolingo] = useSearchParameter('duolingo', 'false');

  return (
    <div className="card border border-gray-200">
      <div className="border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">Languages ({languages.length})</h1>
          <div className="flex items-center gap-x-2 md:gap-x-4">
            <input
              type="checkbox"
              id="duolingo"
              name="duolingo"
              title="duolingo"
              className="toggle toggle-success"
              checked={duolingo === 'true'}
              onChange={() => setDuolingo((duolingo !== 'true').toString())}
            />
            <div>
              <select
                id="category"
                name="category"
                className="select select-bordered"
                value={category}
                onChange={(event) => setCategory(event.target.value)}>
                <option>Category</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table className="table">
          <caption className="border-b py-4">
            Languages ({languages.length})
          </caption>
          <thead>
            <tr>
              <th>Code</th>
              <th align="right" className="w-8">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {languages.map(({ cca3, name }) => {
              return (
                <tr key={cca3}>
                  <td>
                    <Link href={`/languages/${encodeURIComponent(cca3)}`}>
                      {cca3}
                    </Link>
                  </td>
                  <td align="right">{name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

LanguagesTemplate.displayName = 'LanguagesTemplate';
