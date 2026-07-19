import PresentPage from './PresentPage';

export function generateStaticParams() {
  return [{ id: 'new' }];
}

export default function Page() {
  return <PresentPage />;
}
