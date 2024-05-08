import { render, screen, fireEvent, within } from '@testing-library/react';
import FilterRow from './FilterRow';
import { RuleGroup } from '../utils/interfaces';
import { getColumnsFromData } from '../utils/getColumnsFromData';

describe('FilterRow', () => {
  const mockHandleRules = jest.fn();
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();

  const mockRules: RuleGroup[] = [
    {
      id: 0,
      type: 'AND',
      rules: [
        {
          id: 0,
          type: 'OR',
          column_name: 'name',
          data_type: 'string',
          condition: 'contain',
          value: 'aa',
        },
      ],
    },
  ];

  const mockDataSource: any[] = [
    {
      name: 'Aachen',
      id: '1',
      nametype: 'Valid',
      recclass: 'L5',
      mass: '21',
      fall: 'Fell',
      year: '1880-01-01T00:00:00.000',
      reclat: '50.775000',
      reclong: '6.083330',
      geolocation: {
        type: 'Point',
        coordinates: [6.08333, 50.775],
      },
    },
  ];

  const columns = getColumnsFromData(mockDataSource);

  it('renders without crashing', () => {
    render(
      <FilterRow
        columns={columns}
        onAdd={mockOnAdd}
        onDelete={mockOnRemove}
        group={mockRules[0]}
        rules={mockRules}
        id={0}
        initial
        handleRules={mockHandleRules}
      />
    );
    expect(screen.getByTestId('filter-row')).toBeInTheDocument();
  });

  it('calls handleRules when a column is selected', () => {
    render(
      <FilterRow
        columns={columns}
        onAdd={mockOnAdd}
        onDelete={mockOnRemove}
        group={mockRules[0]}
        rules={mockRules}
        id={0}
        initial
        handleRules={mockHandleRules}
      />
    );
    const select = screen.getByRole('textbox');
    fireEvent.mouseDown(select);
    const option = within(document.body).getByText('Select a column');
    fireEvent.click(option);
    fireEvent.change(select, { target: { value: 'name' } });
    expect(mockHandleRules).toHaveBeenCalled();
  });
});
