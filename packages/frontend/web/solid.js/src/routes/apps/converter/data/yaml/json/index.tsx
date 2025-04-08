import { copyToClipboard } from '~/utils/navigator';

import { createSignal } from 'solid-js';
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

const YamlToJsonPage = () => {
  const [
    { yaml = init, json = JSON.stringify(parse(init), null, 2) },
    setState,
  ] = createSignal<{
    yaml: string;
    json: string;
  }>({
    yaml: init,
    json: JSON.stringify(parse(init), null, 2),
  });

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <textarea
            id="yaml"
            name="yaml"
            placeholder="YAML"
            class="h-full w-full p-4 md:p-8"
            value={yaml}
            onChange={(event) => {
              const newYaml: string = event.target.value;
              const newJson: string = JSON.stringify(parse(newYaml), null, 2);
              setState({ yaml: newYaml, json: newJson });
            }}
          />
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="json"
            name="json"
            placeholder="JSON"
            class="h-full w-full p-4 md:p-8"
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
