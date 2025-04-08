import { copyToClipboard } from '~/utils/navigator';

import { createSignal } from 'solid-js';
import { stringify } from 'yaml';

const JsonToYamlPage = () => {
  const [{ json = '', yaml = '' }, setState] = createSignal<{
    json: string;
    yaml: string;
  }>({
    json: '',
    yaml: '',
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
                const newYAML: string = stringify(JSON.parse(newJSON));
                setState({ yaml: newYAML, json: newJSON });
              } catch (error) {
                console.error(error);
                setState((previous) => ({
                  ...previous,
                  json: newJSON,
                  yaml: (error as Error).message,
                }));
              }
            }}
          />
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="yaml"
            name="yaml"
            placeholder="YAML"
            class="h-full w-full p-4 md:p-8"
            value={yaml}
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
