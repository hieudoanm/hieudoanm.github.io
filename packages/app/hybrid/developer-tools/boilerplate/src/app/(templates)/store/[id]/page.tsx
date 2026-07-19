import { StoreItemTemplate } from '@/components/templates/store';

const PRODUCT_IDS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];

const StoreItem = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <StoreItemTemplate />;
};

export function generateStaticParams() {
  return PRODUCT_IDS.map((id) => ({ id }));
}

export default StoreItem;
