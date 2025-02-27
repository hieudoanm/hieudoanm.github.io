import { csv2md } from '@nothing/utils/csv';
import { copyToClipboard } from '@nothing/utils/navigator';
import { NextPage } from 'next';
import { useState } from 'react';

const CsvToMdPage: NextPage = () => {
  const [{ csv = '', md = '' }, setState] = useState<{
    csv: string;
    md: string;
  }>({
    csv: '',
    md: '',
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 h-full">
          <textarea
            id="csv"
            name="csv"
            placeholder="CSV"
            className="h-full w-full p-4 md:p-8"
            value={csv}
            onChange={(event) => {
              const newCSV: string = event.target.value;
              const newMD: string = csv2md(csv);
              setState({ csv: newCSV, md: newMD });
            }}
          />
        </div>
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="md"
            name="md"
            placeholder="MD"
            className="h-full w-full p-4 md:p-8"
            value={md}
            onClick={() => {
              copyToClipboard(md);
            }}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default CsvToMdPage;
