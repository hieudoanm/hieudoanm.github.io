import { copyToClipboard } from '@web/utils/navigator';
import { toXML } from 'jstoxml';
import { NextPage } from 'next';
import { useState } from 'react';

const JsonToXmlPage: NextPage = () => {
  const [{ json = '', xml = '' }, setState] = useState<{
    json: string;
    xml: string;
  }>({
    json: '',
    xml: '',
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
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="xml"
            name="xml"
            placeholder="XML"
            className="h-full w-full p-4 md:p-8"
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
