import { csv2sql } from '~/utils/csv';
import { copyToClipboard } from '~/utils/navigator';

import { createSignal } from 'solid-js';

const CsvToSqlPage = () => {
  const [{ csv = '', sql = '' }, setState] = createSignal<{
    csv: string;
    sql: string;
  }>({
    csv: '',
    sql: '',
  });

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <textarea
            id="csv"
            name="csv"
            placeholder="CSV"
            class="h-full w-full p-4 md:p-8"
            value={csv}
            onChange={(event) => {
              const newCSV: string = event.target.value;
              const newSQL: string = csv2sql(csv);
              setState({ csv: newCSV, sql: newSQL });
            }}
          />
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="sql"
            name="sql"
            placeholder="SQL"
            class="h-full w-full p-4 md:p-8"
            value={sql}
            onClick={() => {
              copyToClipboard(sql);
            }}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default CsvToSqlPage;
