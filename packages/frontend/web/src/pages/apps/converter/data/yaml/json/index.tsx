import { copyToClipboard } from '@nothing/utils/navigator';
import { NextPage } from 'next';
import { useState } from 'react';
import { parse } from 'yaml';

const YamlToJsonPage: NextPage = () => {
  const [{ yaml = '', json = '' }, setState] = useState<{
    yaml: string;
    json: string;
  }>({
    yaml: '',
    json: '',
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 h-full">
          <textarea
            id="yaml"
            name="yaml"
            placeholder="YAML"
            className="h-full w-full p-4 md:p-8"
            value={yaml}
            onChange={(event) => {
              const newYaml: string = event.target.value;
              const newJson: string = JSON.stringify(parse(newYaml), null, 2);
              setState({ yaml: newYaml, json: newJson });
            }}
          />
        </div>
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="json"
            name="json"
            placeholder="JSON"
            className="h-full w-full p-4 md:p-8"
            value={json}
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

export default YamlToJsonPage;
