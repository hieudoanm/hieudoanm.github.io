import type { FC } from 'react';
import type { ProjectItem } from '../../../types/resume';
import { createId } from '../../../utils/id';
import { TextAreaField, TextField } from './Field';
import { AddButton, ListItemCard } from './ListItemCard';

interface ProjectFormProps {
  value: ProjectItem[];
  onChange: (value: ProjectItem[]) => void;
}

const emptyItem = (): ProjectItem => ({
  id: createId(),
  name: '',
  link: '',
  description: '',
  technologies: '',
});

export const ProjectForm: FC<ProjectFormProps> = ({ value, onChange }) => {
  const updateItem = (id: string, patch: Partial<ProjectItem>) =>
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
          title={item.name || 'New project'}
          onRemove={() => removeItem(item.id)}>
          <TextField
            label="Name"
            value={item.name}
            onChange={(next) => updateItem(item.id, { name: next })}
          />
          <TextField
            label="Link"
            value={item.link}
            onChange={(next) => updateItem(item.id, { link: next })}
          />
          <TextField
            label="Technologies"
            value={item.technologies}
            onChange={(next) => updateItem(item.id, { technologies: next })}
          />
          <TextAreaField
            label="Description"
            value={item.description}
            rows={2}
            onChange={(next) => updateItem(item.id, { description: next })}
          />
        </ListItemCard>
      ))}
      <AddButton onClick={addItem} label="Add project" />
    </div>
  );
};

ProjectForm.displayName = 'ProjectForm';
