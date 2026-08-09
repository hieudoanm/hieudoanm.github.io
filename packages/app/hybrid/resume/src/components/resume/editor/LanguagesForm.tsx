import type { FC } from 'react';
import type { LanguageItem } from '../../../types/resume';
import { createId } from '../../../utils/id';
import { TextField } from './Field';
import { AddButton, ListItemCard } from './ListItemCard';

interface LanguagesFormProps {
  value: LanguageItem[];
  onChange: (value: LanguageItem[]) => void;
}

const emptyItem = (): LanguageItem => ({
  id: createId(),
  name: '',
  proficiency: '',
});

export const LanguagesForm: FC<LanguagesFormProps> = ({ value, onChange }) => {
  const updateItem = (id: string, patch: Partial<LanguageItem>) =>
    onChange(
      value.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );

  const removeItem = (id: string) =>
    onChange(value.filter((item) => item.id !== id));

  const addItem = () => onChange([...value, emptyItem()]);

  return (
    <div className="space-y-2">
      {value.map((item) => (
        <ListItemCard
          key={item.id}
          title={item.name || 'New language'}
          onRemove={() => removeItem(item.id)}>
          <TextField
            label="Language"
            value={item.name}
            onChange={(next) => updateItem(item.id, { name: next })}
          />
          <TextField
            label="Proficiency"
            value={item.proficiency}
            placeholder="Native, Fluent, Professional"
            onChange={(next) => updateItem(item.id, { proficiency: next })}
          />
        </ListItemCard>
      ))}
      <AddButton onClick={addItem} label="Add language" />
    </div>
  );
};

LanguagesForm.displayName = 'LanguagesForm';
