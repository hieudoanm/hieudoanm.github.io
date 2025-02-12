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
      <div className="grid h-full grid-cols-2 gap-4 p-4 md:gap-8 md:p-8">
        <div className="col-span-1 h-full">
          <textarea
            id="yaml"
            name="yaml"
            placeholder="YAML"
            className="h-full w-full rounded border border-gray-300 p-2"
            value={yaml}
            onChange={(event) => {
              const newYaml: string = event.target.value;
              const newJson: string = JSON.stringify(parse(newYaml), null, 2);
              setState({ yaml: newYaml, json: newJson });
            }}
          />
        </div>
        <div className="col-span-1 h-full">
          <textarea
            id="json"
            name="json"
            placeholder="JSON"
            className="h-full w-full rounded border border-gray-300 p-2"
            value={json}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default YamlToJsonPage;
