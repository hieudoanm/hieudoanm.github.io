import { Title } from '@solidjs/meta';
import { HttpStatusCode } from '@solidjs/start';

export default function ServerError() {
  return (
    <main>
      <Title>500 - Server Error</Title>
      <HttpStatusCode code={500} />
      <h1>500 - Server Error</h1>
      <p>Something went wrong on our end.</p>
    </main>
  );
}
