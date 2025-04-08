import { copyToClipboard } from '~/utils/navigator';

import { createSignal } from 'solid-js';
import { json2csv } from '~/utils/json';

const JsonToYamlPage = () => {
  const [{ json = '[]', csv = '' }, setState] = createSignal<{
    json: string;
    csv: string;
  }>({
    json: '[]',
    csv: '',
  });

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <textarea
            id="json"
            name="json"
            placeholder="JSON"
            class="h-full w-full p-4 md:p-8"
            value={json}
            onChange={(event) => {
              const newJSON: string = event.target.value;
              try {
                const newCSV: string = json2csv(JSON.parse(newJSON));
                setState({ csv: newCSV, json: newJSON });
              } catch (error) {
                console.error('error', error);
                setState((previous) => ({ ...previous, json: newJSON }));
              }
            }}
          />
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="csv"
            name="csv"
            placeholder="CSV"
            class="h-full w-full p-4 md:p-8"
            value={csv}
            onClick={() => {
              copyToClipboard(json);
            }}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default JsonToYamlPage;
