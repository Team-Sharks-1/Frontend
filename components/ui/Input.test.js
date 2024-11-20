
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

test('renders Input and changes value', () => {
  const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
  const input = getByPlaceholderText(/enter text/i);
  fireEvent.change(input, { target: { value: 'test' } });
  expect(input.value).toBe('test');
});
