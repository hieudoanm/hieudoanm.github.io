export const INITIAL_STRING: string =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in.';

export const INITIAL_STRING_150: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel porta velit, at accumsan odio. Donec vitae blandit ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu magna sed lorem aliquet cursus. Sed consectetur sed diam nec porta. Duis placerat ligula quis nisi facilisis, in viverra risus interdum. Pellentesque blandit condimentum ex sit amet feugiat. Curabitur porttitor efficitur nisl, sed placerat eros dignissim in. Maecenas facilisis sapien in porta rutrum.

Integer pharetra nisi in est imperdiet, nec tincidunt metus hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi nec metus eu risus tempus tempus. Etiam facilisis magna at sem volutpat, id varius metus luctus. Vivamus dignissim eros sem, sed facilisis mi porta vel. Nunc vel sem ligula. Aliquam a aliquet mauris. Vestibulum vitae urna at nisl aliquam viverra. Phasellus id orci nec dolor pulvinar maximus tempor in sem. Praesent ac pellentesque felis, non eleifend est.
`;

export const INTIIAL_YAML = `openapi: 3.0.4
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
