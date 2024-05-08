import { render, screen, fireEvent } from '@testing-library/react';
import FetchDataInput from './FetchDataInput';

describe('FetchDataInput', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders input with default URL', () => {
    render(<FetchDataInput defaultUrl="http://test.com" manageState={jest.fn()} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('http://test.com');
  });

  it('updates input value on change', () => {
    render(<FetchDataInput defaultUrl="http://test.com" manageState={jest.fn()} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'http://new-url.com' } });
    expect(input).toHaveValue('http://new-url.com');
  });
});