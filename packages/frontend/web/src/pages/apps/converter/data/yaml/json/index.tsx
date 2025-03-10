import { copyToClipboard } from '@web/utils/navigator';
import { NextPage } from 'next';
import { useState } from 'react';
import { parse } from 'yaml';

const init = `openapi: 3.0.4
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9

servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing

paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        "200": # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
`;

const YamlToJsonPage: NextPage = () => {
  const [
    { yaml = init, json = JSON.stringify(parse(init), null, 2) },
    setState,
  ] = useState<{
    yaml: string;
    json: string;
  }>({
    yaml: init,
    json: JSON.stringify(parse(init), null, 2),
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
