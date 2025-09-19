import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input Component', () => {
  const user = userEvent.setup();

  test('renders input with label', () => {
    render(<Input label="Email" />);
    
    // Buscar por rol de textbox y verificar que tiene el label accesible
    const input = screen.getByRole('textbox', { name: /email/i });
    expect(input).toBeInTheDocument();
  });

  test('shows required asterisk when required', () => {
    render(<Input label="Email" required />);
    
    // Verificar que el asterisco está presente
    expect(screen.getByText('*')).toBeInTheDocument();
    
    // Verificar que el input es required
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  test('does not show required asterisk when not required', () => {
    render(<Input label="Email" required={false} />);
    
    expect(screen.queryByText('*')).not.toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).not.toBeRequired();
  });

  test('shows error message when error prop is provided', () => {
    render(<Input label="Email" error="Invalid email" />);
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input-error');
  });

  test('does not show error message when no error prop', () => {
    render(<Input label="Email" />);
    
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveClass('input-error');
  });

  test('forwards ref to input element', () => {
    const ref = { current: null };
    render(<Input label="Email" ref={ref} />);
    
    const input = screen.getByRole('textbox');
    expect(ref.current).toBe(input);
  });

  test('passes through all input props', () => {
    render(
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        defaultValue="test@example.com"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter your email');
    expect(input).toHaveValue('test@example.com');
  });

  test('handles user input correctly', async () => {
    render(<Input label="Email" />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'hello@example.com');
    
    expect(input).toHaveValue('hello@example.com');
  });

  test('applies custom className', () => {
    render(<Input label="Email" className="custom-class" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
    expect(input).toHaveClass('input-field');
  });

  test('handles disabled state', () => {
    render(<Input label="Email" disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  test('renders with different input types', () => {
    render(<Input label="Password" type="password" />);
    
    // Para password inputs, usamos getByLabelText ya que no son textboxes
    const input = screen.getByLabelText(/password/i);
    expect(input).toHaveAttribute('type', 'password');
  });
});