
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders Button and checks click event', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button onClick={handleClick}>Click Me</Button>);
  const button = getByText(/click me/i);
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
