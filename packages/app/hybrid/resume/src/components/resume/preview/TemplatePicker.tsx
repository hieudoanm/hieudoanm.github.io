'use client';

import type { FC } from 'react';
import { LuCheck } from 'react-icons/lu';
import { RESUME_TEMPLATES } from '../templates';
import { TemplateThumbnail } from './TemplateThumbnail';

interface TemplatePickerProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const TemplatePicker: FC<TemplatePickerProps> = ({
  selectedId,
  onSelect,
}) => (
  <div className="grid grid-cols-1 gap-2">
    {RESUME_TEMPLATES.map((template) => {
      const isSelected = template.id === selectedId;
      return (
        <button
          key={template.id}
          type="button"
          onClick={() => onSelect(template.id)}
          className={[
            'relative flex items-start gap-3 rounded-xl border p-2 text-left transition-colors',
            isSelected
              ? 'border-primary bg-primary/10'
              : 'border-base-300 hover:border-base-content/30',
          ].join(' ')}
          aria-pressed={isSelected}>
          <TemplateThumbnail component={template.component} width={60} />
          <span className="flex min-w-0 flex-col pt-0.5">
            <span className="text-xs font-bold">{template.name}</span>
            <span className="text-base-content/50 line-clamp-2 text-[10px]">
              {template.description}
            </span>
          </span>
          {isSelected && (
            <span className="bg-primary text-primary-content absolute top-1 right-1 rounded-full p-0.5">
              <LuCheck className="h-3 w-3" />
            </span>
          )}
        </button>
      );
    })}
  </div>
);

TemplatePicker.displayName = 'TemplatePicker';
