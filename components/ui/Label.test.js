
import { render } from '@testing-library/react';
import Label from './Label';

test('renders Label with text', () => {
  const { getByText } = render(<Label>Test Label</Label>);
  expect(getByText(/test label/i)).toBeInTheDocument();
});
