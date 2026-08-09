import type { FC } from 'react';
import type { ExperienceItem } from '../../../types/resume';
import { createId } from '../../../utils/id';
import { FieldRow, TextAreaField, TextField } from './Field';
import { AddButton, ListItemCard } from './ListItemCard';

interface ExperienceFormProps {
  value: ExperienceItem[];
  onChange: (value: ExperienceItem[]) => void;
}

const emptyItem = (): ExperienceItem => ({
  id: createId(),
  company: '',
  role: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
});

export const ExperienceForm: FC<ExperienceFormProps> = ({
  value,
  onChange,
}) => {
  const updateItem = (id: string, patch: Partial<ExperienceItem>) =>
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
          title={item.role || item.company || 'New experience'}
          onRemove={() => removeItem(item.id)}>
          <TextField
            label="Role"
            value={item.role}
            onChange={(next) => updateItem(item.id, { role: next })}
          />
          <TextField
            label="Company"
            value={item.company}
            onChange={(next) => updateItem(item.id, { company: next })}
          />
          <TextField
            label="Location"
            value={item.location}
            onChange={(next) => updateItem(item.id, { location: next })}
          />
          <FieldRow>
            <TextField
              label="Start date"
              value={item.startDate}
              placeholder="Jan 2022"
              onChange={(next) => updateItem(item.id, { startDate: next })}
            />
            <TextField
              label="End date"
              value={item.endDate}
              placeholder="Present"
              onChange={(next) => updateItem(item.id, { endDate: next })}
            />
          </FieldRow>
          <TextAreaField
            label="Description (one bullet per line)"
            value={item.description}
            rows={4}
            onChange={(next) => updateItem(item.id, { description: next })}
          />
        </ListItemCard>
      ))}
      <AddButton onClick={addItem} label="Add experience" />
    </div>
  );
};

ExperienceForm.displayName = 'ExperienceForm';
