import { render, fireEvent, screen } from '@testing-library/react';
import { FormatToolbar } from '../FormatToolbar';

describe('FormatToolbar', () => {
  const exec = jest.fn();
  const onStyleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders bold button', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders italic button', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    expect(screen.getByText('I')).toBeInTheDocument();
  });

  it('renders strikethrough button', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('renders heading buttons', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    expect(screen.getByText('H1')).toBeInTheDocument();
    expect(screen.getByText('H2')).toBeInTheDocument();
    expect(screen.getByText('H3')).toBeInTheDocument();
  });

  it('renders link and image buttons', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    expect(screen.getByText('Link')).toBeInTheDocument();
    expect(screen.getByText('Img')).toBeInTheDocument();
  });

  it('renders list buttons', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    expect(screen.getByText('UL')).toBeInTheDocument();
    expect(screen.getByText('OL')).toBeInTheDocument();
    expect(screen.getByText('Task')).toBeInTheDocument();
  });

  it('renders code buttons', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('{ }')).toBeInTheDocument();
  });

  it('renders quote, hr, table buttons', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    expect(screen.getByText('Quote')).toBeInTheDocument();
    expect(screen.getByText('HR')).toBeInTheDocument();
    expect(screen.getByText('Tbl')).toBeInTheDocument();
  });

  it('renders style select', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    expect(
      screen.getByTitle('Apply string transformation to selected text')
    ).toBeInTheDocument();
  });

  it('calls exec on bold click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('B'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on italic click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('I'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on heading click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('H1'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on code block click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('{ }'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on Link button click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('Link'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on Img button click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('Img'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on UL button click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('UL'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on OL button click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('OL'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on Task button click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('Task'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on Code button click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('Code'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on Quote button click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('Quote'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on HR button click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('HR'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls exec on Tbl button click', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    fireEvent.click(screen.getByText('Tbl'));
    expect(exec).toHaveBeenCalled();
  });

  it('calls onStyleChange on select change', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    const select = screen.getByTitle(
      'Apply string transformation to selected text'
    );
    fireEvent.change(select, { target: { value: '' } });
    expect(onStyleChange).toHaveBeenCalledWith('');
  });

  it('calls exec with style transformation when capitalize selected', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    const select = screen.getByTitle(
      'Apply string transformation to selected text'
    );
    fireEvent.change(select, { target: { value: 'capitalize' } });
    expect(exec).toHaveBeenCalled();
    expect(onStyleChange).toHaveBeenCalledWith('');
  });

  it('calls exec with style transformation when upperCase selected', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    const select = screen.getByTitle(
      'Apply string transformation to selected text'
    );
    fireEvent.change(select, { target: { value: 'upperCase' } });
    expect(exec).toHaveBeenCalled();
    expect(onStyleChange).toHaveBeenCalledWith('');
  });

  it('calls exec with style transformation when kebabCase selected', () => {
    render(
      <FormatToolbar exec={exec} stringStyle="" onStyleChange={onStyleChange} />
    );
    const select = screen.getByTitle(
      'Apply string transformation to selected text'
    );
    fireEvent.change(select, { target: { value: 'kebabCase' } });
    expect(exec).toHaveBeenCalled();
    expect(onStyleChange).toHaveBeenCalledWith('');
  });
});
