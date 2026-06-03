import { FC } from 'react';

interface ModelOption {
  company: string;
  label: string;
  value: string;
}

interface ChatModelSelectProps {
  models: ModelOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ChatModelSelect: FC<ChatModelSelectProps> = ({
  models,
  value,
  onChange,
  disabled,
}) => {
  const grouped = models.reduce<{ company: string; models: ModelOption[] }[]>(
    (acc, model) => {
      const existing = acc.find((g) => g.company === model.company);
      if (existing) {
        existing.models.push(model);
      } else {
        acc.push({ company: model.company, models: [model] });
      }
      return acc;
    },
    []
  );

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="select select-ghost select-sm text-base-content/60 hover:text-base-content text-xs">
      {grouped.map(({ company, models: groupModels }) => (
        <optgroup key={company} label={company}>
          {groupModels.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};
