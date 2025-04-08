import { csv2md } from '~/utils/csv';
import { copyToClipboard } from '~/utils/navigator';

import { createSignal } from 'solid-js';

const CsvToMdPage = () => {
  const [{ csv = '', md = '' }, setState] = createSignal<{
    csv: string;
    md: string;
  }>({
    csv: '',
    md: '',
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
              const newMD: string = csv2md(csv);
              setState({ csv: newCSV, md: newMD });
            }}
          />
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="md"
            name="md"
            placeholder="MD"
            class="h-full w-full p-4 md:p-8"
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
