import { render, screen, fireEvent } from '@testing-library/react';
import { FormFieldsLayer } from '@/components/molecules/FormFieldsLayer';
import type { FormField } from '@/types';

const baseField = (overrides: Partial<FormField> = {}): FormField => ({
  id: 'field-1',
  documentId: 'doc-1',
  pageNumber: 1,
  type: 'text',
  label: 'Field 1',
  value: '',
  x: 40,
  y: 50,
  width: 180,
  height: 24,
  ...overrides,
});

const renderLayer = (
  fields: FormField[],
  overrides: {
    onSelect?: (id: string | null) => void;
    onChange?: () => void;
  } = {}
) => {
  const handlers = {
    onSelect: overrides.onSelect ?? jest.fn(),
    onChange: overrides.onChange ?? jest.fn(),
    onDragStart: jest.fn(() => jest.fn()),
    onSign: jest.fn(),
  };
  const utils = render(
    <FormFieldsLayer
      fields={fields}
      zoom={100}
      editable
      selectedId={null}
      {...handlers}
    />
  );
  return { ...utils, handlers };
};

describe('FormFieldsLayer molecule', () => {
  it('unchecks a checkbox field', () => {
    const onChange = jest.fn();
    renderLayer(
      [baseField({ type: 'checkbox', value: 'true', label: 'Check me' })],
      { onChange }
    );
    fireEvent.click(screen.getByLabelText('Check me'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'field-1' }),
      ''
    );
  });

  it('checks an empty checkbox field', () => {
    const onChange = jest.fn();
    renderLayer(
      [baseField({ type: 'checkbox', value: '', label: 'Check me' })],
      { onChange }
    );
    fireEvent.click(screen.getByLabelText('Check me'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'field-1' }),
      'true'
    );
  });

  it('renders a radio field with default options when none are provided', () => {
    renderLayer([baseField({ type: 'radio', label: 'Pick' })]);
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('renders a dropdown with default options when none are provided', () => {
    renderLayer([baseField({ type: 'dropdown', label: 'Choose' })]);
    expect(screen.getByLabelText('Choose')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('renders a signature value that is a data URL as an image', () => {
    renderLayer([
      baseField({
        type: 'signature',
        label: 'Sign here',
        value: 'data:image/png;base64,iVBORw0KGgo=',
      }),
    ]);
    const img = screen.getByAltText('Sign here');
    expect(img).toHaveAttribute('src', 'data:image/png;base64,iVBORw0KGgo=');
  });

  it('renders a plain-text signature value', () => {
    renderLayer([baseField({ type: 'signature', value: 'Jane Doe' })]);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders the sign placeholder for an empty signature value', () => {
    renderLayer([baseField({ type: 'signature', value: '' })]);
    expect(screen.getByText('Sign here')).toBeInTheDocument();
  });
});
