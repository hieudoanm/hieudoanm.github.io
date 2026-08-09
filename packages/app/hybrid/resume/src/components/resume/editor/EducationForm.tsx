import type { FC } from 'react';
import type { EducationItem } from '../../../types/resume';
import { createId } from '../../../utils/id';
import { FieldRow, TextAreaField, TextField } from './Field';
import { AddButton, ListItemCard } from './ListItemCard';

interface EducationFormProps {
  value: EducationItem[];
  onChange: (value: EducationItem[]) => void;
}

const emptyItem = (): EducationItem => ({
  id: createId(),
  school: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  description: '',
});

export const EducationForm: FC<EducationFormProps> = ({ value, onChange }) => {
  const updateItem = (id: string, patch: Partial<EducationItem>) =>
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
          title={item.school || item.degree || 'New education'}
          onRemove={() => removeItem(item.id)}>
          <TextField
            label="School"
            value={item.school}
            onChange={(next) => updateItem(item.id, { school: next })}
          />
          <TextField
            label="Degree"
            value={item.degree}
            onChange={(next) => updateItem(item.id, { degree: next })}
          />
          <TextField
            label="Field of study"
            value={item.field}
            onChange={(next) => updateItem(item.id, { field: next })}
          />
          <FieldRow>
            <TextField
              label="Start year"
              value={item.startDate}
              placeholder="2013"
              onChange={(next) => updateItem(item.id, { startDate: next })}
            />
            <TextField
              label="End year"
              value={item.endDate}
              placeholder="2017"
              onChange={(next) => updateItem(item.id, { endDate: next })}
            />
          </FieldRow>
          <TextAreaField
            label="Description"
            value={item.description}
            rows={2}
            onChange={(next) => updateItem(item.id, { description: next })}
          />
        </ListItemCard>
      ))}
      <AddButton onClick={addItem} label="Add education" />
    </div>
  );
};

EducationForm.displayName = 'EducationForm';
