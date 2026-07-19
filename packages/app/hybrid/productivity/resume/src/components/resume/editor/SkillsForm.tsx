import type { FC } from 'react';
import type { SkillGroup } from '../../../types/resume';
import { createId } from '../../../utils/id';
import { TextField } from './Field';
import { AddButton, ListItemCard } from './ListItemCard';
import { SortableList } from './SortableList';

interface SkillsFormProps {
  value: SkillGroup[];
  onChange: (value: SkillGroup[]) => void;
}

const emptyItem = (): SkillGroup => ({
  id: createId(),
  category: '',
  items: '',
});

export const SkillsForm: FC<SkillsFormProps> = ({ value, onChange }) => {
  const updateItem = (id: string, patch: Partial<SkillGroup>) =>
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
            title={item.category || 'New skill group'}
            onRemove={() => removeItem(item.id)}>
            <TextField
              label="Category"
              value={item.category}
              placeholder="Frontend"
              onChange={(next) => updateItem(item.id, { category: next })}
            />
            <TextField
              label="Skills (comma separated)"
              value={item.items}
              placeholder="React, Next.js, TypeScript"
              onChange={(next) => updateItem(item.id, { items: next })}
            />
          </ListItemCard>
        )}
      />
      <div className="mt-2">
        <AddButton onClick={addItem} label="Add skill group" />
      </div>
    </div>
  );
};

SkillsForm.displayName = 'SkillsForm';
