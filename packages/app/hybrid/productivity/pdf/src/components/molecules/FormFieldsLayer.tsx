'use client';

import { type FC } from 'react';
import type { FormField } from '@/types';

const scale = (value: number, zoom: number): number => (value * zoom) / 100;

interface FormFieldsLayerProps {
  fields: FormField[];
  zoom: number;
  editable: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onChange: (field: FormField, value: string) => void;
  onDragStart: (
    field: FormField,
    mode: 'move' | 'resize'
  ) => (e: React.MouseEvent<HTMLDivElement>) => void;
  onSign: (field: FormField) => void;
}

export const FormFieldsLayer: FC<FormFieldsLayerProps> = ({
  fields,
  zoom,
  editable,
  selectedId,
  onSelect,
  onChange,
  onDragStart,
  onSign,
}) => {
  const renderControl = (field: FormField): React.ReactNode => {
    switch (field.type) {
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={field.value === 'true'}
            onChange={(e) => onChange(field, e.target.checked ? 'true' : '')}
            disabled={!editable}
            className="checkbox checkbox-primary checkbox-xs"
            aria-label={field.label}
          />
        );
      case 'radio':
        return (
          <div className="flex flex-wrap items-center gap-2">
            {(field.options ?? ['Yes', 'No']).map((option) => (
              <label key={option} className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={field.value === option}
                  onChange={() => onChange(field, option)}
                  disabled={!editable}
                  className="radio radio-primary radio-xs"
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'dropdown':
        return (
          <select
            value={field.value}
            onChange={(e) => onChange(field, e.target.value)}
            disabled={!editable}
            className="select select-bordered select-xs w-full text-xs"
            aria-label={field.label}>
            <option value="">Select...</option>
            {(field.options ?? ['Option A', 'Option B']).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'date':
        return (
          <input
            type="date"
            value={field.value}
            onChange={(e) => onChange(field, e.target.value)}
            disabled={!editable}
            className="input input-bordered input-xs w-full text-xs"
            aria-label={field.label}
          />
        );
      case 'signature':
        if (field.value.startsWith('data:')) {
          return (
            <img
              src={field.value}
              alt={field.label}
              className="h-full w-full object-contain"
            />
          );
        }
        if (field.value) {
          return (
            <span
              className="flex h-full w-full items-center justify-center text-2xl text-slate-800"
              style={{ fontFamily: "'Satisfy', cursive" }}>
              {field.value}
            </span>
          );
        }
        return (
          <span className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            Sign here
          </span>
        );
      default:
        return (
          <input
            type="text"
            value={field.value}
            onChange={(e) => onChange(field, e.target.value)}
            disabled={!editable}
            placeholder={field.label}
            className="input input-bordered input-xs w-full text-xs"
            aria-label={field.label}
          />
        );
    }
  };

  return (
    <>
      {fields.map((field) => (
        <div
          key={field.id}
          data-field-id={field.id}
          className={`pointer-events-auto absolute ${selectedId === field.id ? 'ring-primary ring-2' : ''}`}
          style={{
            left: `${scale(field.x, zoom)}px`,
            top: `${scale(field.y, zoom)}px`,
            width: `${scale(field.width, zoom)}px`,
            height: `${scale(field.height, zoom)}px`,
          }}
          onClick={() => onSelect(field.id)}>
          <div
            className={`bg-base-100/70 flex h-full w-full items-center rounded border border-gray-300 ${editable && field.type === 'signature' ? 'cursor-pointer' : ''}`}>
            {renderControl(field)}
          </div>
          {field.type === 'signature' && editable && (
            <button
              type="button"
              onClick={() => onSign(field)}
              className="text-primary absolute -top-2 right-1 text-[9px] underline"
              aria-label={`Re-sign ${field.label}`}>
              re-sign
            </button>
          )}
          {editable && (
            <div
              className="bg-primary absolute -top-1 -left-1 size-3 cursor-move"
              onMouseDown={onDragStart(field, 'move')}
              aria-label={`Move ${field.label} field`}
            />
          )}
          {editable && selectedId === field.id && (
            <div
              className="bg-primary absolute -right-1 -bottom-1 size-3 cursor-se-resize"
              onMouseDown={onDragStart(field, 'resize')}
              aria-label={`Resize ${field.label} field`}
            />
          )}
        </div>
      ))}
    </>
  );
};
