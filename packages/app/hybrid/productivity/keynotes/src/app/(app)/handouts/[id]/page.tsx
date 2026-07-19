import HandoutsPage from './HandoutsPage';

export function generateStaticParams() {
  return [{ id: 'new' }];
}

export default function Page() {
  return <HandoutsPage />;
}
