import PrintPage from './PrintPage';

export function generateStaticParams() {
  return [{ id: 'new' }];
}

export default function Page() {
  return <PrintPage />;
}
