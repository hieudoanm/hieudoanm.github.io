import { MetaProvider, Title, Meta } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import '@hieudoanm/styles/globals.css';

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Hieu Doan</Title>
          <Meta name="description" content="Hieu Doan" />
          <div
            class="font-sans"
            style="font-family: 'Be Vietnam Pro', sans-serif">
            <Suspense>{props.children}</Suspense>
          </div>
        </MetaProvider>
      )}>
      <FileRoutes />
    </Router>
  );
}
