import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders FetchDataInput component', () => {
    render(<App />);
    const fetchDataInput = screen.getByTestId('fetch-data-input');
    console.log()
    expect(fetchDataInput).toBeInTheDocument();
  });

  it('renders FilterGroup component', () => {
    render(<App />);
    const filterGroup = screen.getByTestId('filter-groups');
    expect(filterGroup).toBeInTheDocument();
  });

  it('renders DataTable component', () => {
    render(<App />);
    const dataTable = screen.getByTestId('data-table');
    expect(dataTable).toBeInTheDocument();
  });
});