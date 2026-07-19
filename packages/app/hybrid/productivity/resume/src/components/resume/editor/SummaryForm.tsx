import type { FC } from 'react';
import { TextAreaField } from './Field';

interface SummaryFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const SummaryForm: FC<SummaryFormProps> = ({ value, onChange }) => (
  <TextAreaField
    label="Professional summary"
    value={value}
    rows={5}
    placeholder="Senior Frontend Engineer with 8+ years of experience…"
    onChange={onChange}
  />
);

SummaryForm.displayName = 'SummaryForm';
