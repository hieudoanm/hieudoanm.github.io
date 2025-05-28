import { FC } from 'react';

export const Table: FC = () => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-neutral-200 shadow dark:border-neutral-800 dark:shadow-neutral-100/10">
      <table className="w-full divide-y-2 divide-neutral-200 dark:divide-neutral-800">
        <thead>
          <tr>
            <th className="px-3 py-2 whitespace-nowrap">Column 1</th>
            <th className="px-3 py-2 whitespace-nowrap">Column 2</th>
            <th className="px-3 py-2 whitespace-nowrap">Column 3</th>
            <th className="px-3 py-2 whitespace-nowrap">Column 4</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          <tr>
            <td className="px-3 py-2 whitespace-nowrap">Value 1.1</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 2.1</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 3.1</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 4.1</td>
          </tr>
          <tr>
            <td className="px-3 py-2 whitespace-nowrap">Value 1.2</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 2.2</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 3.2</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 4.2</td>
          </tr>
          <tr>
            <td className="px-3 py-2 whitespace-nowrap">Value 1.3</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 2.3</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 3.3</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 4.3</td>
          </tr>
          <tr>
            <td className="px-3 py-2 whitespace-nowrap">Value 1.4</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 2.4</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 3.4</td>
            <td className="px-3 py-2 whitespace-nowrap">Value 4.4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
