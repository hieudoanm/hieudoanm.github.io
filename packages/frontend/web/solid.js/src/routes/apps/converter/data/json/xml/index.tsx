import { copyToClipboard } from '~/utils/navigator';
import { toXML } from 'jstoxml';

import { createSignal } from 'solid-js';

const JsonToXmlPage = () => {
  const [{ json = '', xml = '' }, setState] = createSignalgnal<{
    json: string;
    xml: string;
  }>({
    json: '',
    xml: '',
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
                const config = {
                  indent: '  ',
                };
                const newXML: string = toXML(JSON.parse(newJSON), config);
                setState({ xml: newXML, json: newJSON });
              } catch (error) {
                console.error(error);
                setState((previous) => ({
                  ...previous,
                  json: newJSON,
                  xml: (error as Error).message,
                }));
              }
            }}
          />
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="xml"
            name="xml"
            placeholder="XML"
            class="h-full w-full p-4 md:p-8"
            value={xml}
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

export default JsonToXmlPage;
