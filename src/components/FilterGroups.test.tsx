import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterGroups from './FilterGroups';
import { RuleGroup } from '../utils/interfaces';
import { getColumnsFromData } from '../utils/getColumnsFromData';

describe('FilterGroups', () => {
  const mockHandleRules = jest.fn();

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
    }
  ];

  const columns = getColumnsFromData(mockDataSource);

  it('renders without crashing', () => {
    render(<FilterGroups  columns={columns} rules={mockRules} handleRules={mockHandleRules}/>);
    expect(screen.getByTestId('filter-groups')).toBeInTheDocument();
  });

  it('renders the correct number of FilterGroup components', () => {
    render(<FilterGroups  columns={columns} rules={mockRules} handleRules={mockHandleRules}/>);
    const filterGroups = screen.getAllByTestId('filter-group');
    expect(filterGroups.length).toBe(mockRules.length);
  });

  it('calls addFilterGroup when add new rules group button is clicked', () => {
    render(<FilterGroups  columns={columns} rules={mockRules} handleRules={mockHandleRules}/>);
    const button = screen.getByRole('button', { name: /plus/i });
    fireEvent.click(button);
    expect(mockHandleRules).toHaveBeenCalled();
  });
});