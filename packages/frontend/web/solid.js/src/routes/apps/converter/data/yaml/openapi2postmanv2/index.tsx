import { createSignal, onMount } from 'solid-js';

const init: string = `openapi: 3.0.4
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

const OpenAPI2PostmanV2Page = () => {
  const [signal, setSignal] = createSignal<{
    openapi: string;
    postman: string;
    loading: boolean;
  }>({
    openapi: init,
    postman: '',
    loading: false,
  });

  onMount(() => {
    convert(signal().openapi);
  });

  const convert = async (openapi: string) => {
    try {
      setSignal((previous) => ({
        ...previous,
        loading: true,
      }));
      const headers = {
        'Content-Type': 'application/json', // Specify content type
      };
      const downloadUrl: string =
        'https://nothing-openapi-to-postmanv2.onrender.com/api/convert';
      const response = await fetch(downloadUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ openapi }),
      });
      const data = await response.json();
      const { data: result } = data;
      console.info('postman', signal().postman);
      const output = result.output.at(0);
      setSignal((previous) => ({
        ...previous,
        postman: JSON.stringify(output, null, 2),
        loading: false,
      }));
    } catch (error) {
      console.error('error', error);
    } finally {
      setSignal((previous) => ({
        ...previous,
        loading: false,
      }));
    }
  };

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <div class="h-full w-full bg-gray-100 text-gray-900">
            <textarea
              id="openapi"
              name="openapi"
              placeholder="OpenAPI"
              class="h-full w-full p-8"
              value={signal().openapi}
              onChange={async (event) => {
                const newOpenAPI = event.target.value;
                setSignal((previous) => ({ ...previous, openapi: newOpenAPI }));
                await convert(newOpenAPI);
              }}
            />
          </div>
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <div class="h-full w-full bg-gray-900 text-gray-100">
            <textarea
              id="postman"
              name="postman"
              placeholder="Postman V2"
              class="h-full w-full p-8"
              value={signal().loading ? 'Loading' : signal().postman}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenAPI2PostmanV2Page;
