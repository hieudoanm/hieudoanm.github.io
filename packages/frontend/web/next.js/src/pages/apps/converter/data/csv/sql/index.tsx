import { csv2sql } from '@web/utils/csv';
import { copyToClipboard } from '@web/utils/navigator';
import { NextPage } from 'next';
import { useState } from 'react';

const CsvToSqlPage: NextPage = () => {
  const [{ csv = '', sql = '' }, setState] = useState<{
    csv: string;
    sql: string;
  }>({
    csv: '',
    sql: '',
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <textarea
            id="csv"
            name="csv"
            placeholder="CSV"
            className="h-full w-full p-4 md:p-8"
            value={csv}
            onChange={(event) => {
              const newCSV: string = event.target.value;
              const newSQL: string = csv2sql(csv);
              setState({ csv: newCSV, sql: newSQL });
            }}
          />
        </div>
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="sql"
            name="sql"
            placeholder="SQL"
            className="h-full w-full p-4 md:p-8"
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
