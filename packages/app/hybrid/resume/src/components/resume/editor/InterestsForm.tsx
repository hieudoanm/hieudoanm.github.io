import type { FC } from 'react';
import { TextAreaField } from './Field';

interface InterestsFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const InterestsForm: FC<InterestsFormProps> = ({ value, onChange }) => (
  <TextAreaField
    label="Interests (comma separated)"
    value={value}
    rows={3}
    placeholder="Open source, hiking, photography"
    onChange={onChange}
  />
);

InterestsForm.displayName = 'InterestsForm';
