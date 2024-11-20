
import { render } from '@testing-library/react';
import Dialog from './Dialog';

test('renders Dialog component', () => {
  const { getByRole } = render(<Dialog open={true}>Dialog Content</Dialog>);
  expect(getByRole('dialog')).toBeInTheDocument();
});
