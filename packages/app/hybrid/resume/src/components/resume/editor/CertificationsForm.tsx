import type { FC } from 'react';
import type { CertificationItem } from '../../../types/resume';
import { createId } from '../../../utils/id';
import { TextField } from './Field';
import { AddButton, ListItemCard } from './ListItemCard';
import { SortableList } from './SortableList';

interface CertificationsFormProps {
  value: CertificationItem[];
  onChange: (value: CertificationItem[]) => void;
}

const emptyItem = (): CertificationItem => ({
  id: createId(),
  name: '',
  issuer: '',
  date: '',
});

export const CertificationsForm: FC<CertificationsFormProps> = ({
  value,
  onChange,
}) => {
  const updateItem = (id: string, patch: Partial<CertificationItem>) =>
    onChange(
      value.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );

  const removeItem = (id: string) =>
    onChange(value.filter((item) => item.id !== id));

  const addItem = () => onChange([...value, emptyItem()]);

  return (
    <div>
      <SortableList
        items={value}
        getKey={(item) => item.id}
        onReorder={onChange}
        renderItem={(item) => (
          <ListItemCard
            title={item.name || 'New certification'}
            onRemove={() => removeItem(item.id)}>
            <TextField
              label="Name"
              value={item.name}
              onChange={(next) => updateItem(item.id, { name: next })}
            />
            <TextField
              label="Issuer"
              value={item.issuer}
              onChange={(next) => updateItem(item.id, { issuer: next })}
            />
            <TextField
              label="Date"
              value={item.date}
              placeholder="2023"
              onChange={(next) => updateItem(item.id, { date: next })}
            />
          </ListItemCard>
        )}
      />
      <div className="mt-2">
        <AddButton onClick={addItem} label="Add certification" />
      </div>
    </div>
  );
};

CertificationsForm.displayName = 'CertificationsForm';
