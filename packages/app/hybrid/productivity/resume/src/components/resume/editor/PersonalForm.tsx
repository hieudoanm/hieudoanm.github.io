import type { FC } from 'react';
import type { PersonalDetails } from '../../../types/resume';
import { FieldRow, TextField } from './Field';

interface PersonalFormProps {
  value: PersonalDetails;
  onChange: (value: PersonalDetails) => void;
}

const PERSONAL_FIELDS: {
  key: keyof PersonalDetails;
  label: string;
  placeholder?: string;
}[] = [
  { key: 'fullName', label: 'Full name', placeholder: 'John Smith' },
  {
    key: 'jobTitle',
    label: 'Job title',
    placeholder: 'Senior Frontend Engineer',
  },
  { key: 'email', label: 'Email', placeholder: 'john@example.com' },
  { key: 'phone', label: 'Phone', placeholder: '+1 (555) 123-4567' },
  { key: 'address', label: 'Address', placeholder: 'San Francisco, CA' },
  { key: 'website', label: 'Website', placeholder: 'johnsmith.dev' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'linkedin.com/in/johnsmith',
  },
  { key: 'github', label: 'GitHub', placeholder: 'github.com/johnsmith' },
];

export const PersonalForm: FC<PersonalFormProps> = ({ value, onChange }) => (
  <div className="grid grid-cols-2 gap-2">
    {PERSONAL_FIELDS.map(({ key, label, placeholder }) => (
      <div
        key={key}
        className={
          key === 'fullName' || key === 'jobTitle' ? 'col-span-2' : undefined
        }>
        <TextField
          label={label}
          value={value[key]}
          placeholder={placeholder}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
      </div>
    ))}
  </div>
);

PersonalForm.displayName = 'PersonalForm';
