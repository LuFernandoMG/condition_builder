// Dependencies
import { FC, useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

// Utils
import { FilterGroupsProps } from '../utils/interfaces';

// Components
import FilterGroup from './FilterGroup';

/**
 * FilterGroups component
 * @description This component is used to manage the different groups of rules that are going to be used to filter the data.
 * @param {FilterGroupsProps} columns - The columns to be used to filter the data.
 * @param {FilterGroupsProps} rules - The rules to be used to filter the data.
 * @param {FilterGroupsProps} handleRules - The function to handle the rules from the parent component.
 * @returns {React.FC<FilterGroupsProps>} The FilterGroups component
 */
const FilterGroups: FC<FilterGroupsProps> = ({
  columns,
  rules,
  handleRules,
}) => {
  // This state is used to generate unique IDs for each group of rules. Start with 1 because the default group had ID 0
  const [idGroup, setIdGroup] = useState<number>(1);
  
  // Function used to add a new group of rules of type AND
  const addFilterGroup = () => {
    setIdGroup(idGroup + 1);
    const newGroup = {
      id: idGroup,
      type: 'AND',
      rules: [
        {
          id: 0,
          type: 'OR',
          column_name: '',
          data_type: '',
          condition: '',
          value: '',
        },
      ],
    };
    const newRules = [...rules, newGroup];
    handleRules(newRules);
  };

  return (
    <div data-testid="filter-groups">
      {rules.map((group) => (
        <div key={group.id}>
          {group.id > 0 && <And>AND</And>}
          <FilterGroup id={group.id} columns={columns} group={group} handleRules={handleRules} rules={rules} />
        </div>
      ))}
      <StyledButton type="primary" onClick={addFilterGroup}>
        Add new Rules Group
      </StyledButton>
    </div>
  );
};

const And = styled.p`
  font-weight: bold;
  font-size: 18px;
  font-style: italic;
  color: darkgray;
  margin: 10px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

export default FilterGroups;
