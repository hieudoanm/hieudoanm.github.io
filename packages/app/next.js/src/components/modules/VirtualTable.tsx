import { FC } from 'react';
import { Column, VirtualTable } from '../common/VirtualTable';

interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
}

export const VirtualTablePreview: FC = () => {
  const data: Person[] = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    age: 20 + (i % 50),
    email: `user${i + 1}@example.com`,
  }));

  const columns: Column<Person>[] = [
    { key: 'id', label: 'ID', width: '80px' },
    { key: 'name', label: 'Name', width: '160px' },
    { key: 'age', label: 'Age', width: '80px' },
    { key: 'email', label: 'Email' },
  ];

  return (
    <div className="w-full">
      <VirtualTable columns={columns} data={data} rowHeight={40} height={400} />
    </div>
  );
};
