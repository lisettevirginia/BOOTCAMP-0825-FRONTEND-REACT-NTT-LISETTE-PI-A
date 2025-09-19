import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with text content', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies primary variant class by default', () => {
    const { container } = render(<Button>Test</Button>);
    const button = container.firstChild;
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('button-primary');
  });

  test('applies secondary variant class when specified', () => {
    const { container } = render(<Button variant="secondary">Test</Button>);
    const button = container.firstChild;
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('button-secondary');
  });

  test('sets correct button type', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('uses button type by default', () => {
    render(<Button>Click</Button>);
    const button = screen.getByText('Click');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });

  test('is not disabled when disabled prop is false', () => {
    render(<Button disabled={false}>Enabled Button</Button>);
    const button = screen.getByText('Enabled Button');
    expect(button).not.toBeDisabled();
  });

  test('is not disabled by default', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByText('Default Button');
    expect(button).not.toBeDisabled();
  });

  test('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    
    const button = screen.getByText('Disabled');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders with children content', () => {
    render(<Button><span>Icon</span> Text</Button>);
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});