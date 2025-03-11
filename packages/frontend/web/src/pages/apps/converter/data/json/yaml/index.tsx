import { copyToClipboard } from '@web/utils/navigator';
import { NextPage } from 'next';
import { useState } from 'react';
import { stringify } from 'yaml';

const JsonToYamlPage: NextPage = () => {
  const [{ json = '', yaml = '' }, setState] = useState<{
    json: string;
    yaml: string;
  }>({
    json: '',
    yaml: '',
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 h-full">
          <textarea
            id="json"
            name="json"
            placeholder="JSON"
            className="h-full w-full p-4 md:p-8"
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
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="yaml"
            name="yaml"
            placeholder="YAML"
            className="h-full w-full p-4 md:p-8"
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
