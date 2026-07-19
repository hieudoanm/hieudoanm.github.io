import PresenterView from './PresenterView';

export function generateStaticParams() {
  return [{ id: 'new' }];
}

export default function Page() {
  return <PresenterView />;
}
