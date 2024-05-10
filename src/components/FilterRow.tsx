// Dependencies
import { useState } from 'react';
import { Row, Col, Select, Input, Button } from 'antd';
import styled from 'styled-components';

// Utils
import { FilterGroupProps } from '../utils/interfaces';
import { Rule } from '../utils/interfaces';

// Assets
import { PlusOutlined, DeleteFilled } from '@ant-design/icons';

// Function to filter the methods based on the data type, so we're not showing methods that are not applicable to the data type.
const filterMethods = (dataType: string | undefined) => {
  switch (dataType) {
    case 'number':
      return [
        'equals',
        'less than',
        'greater than',
        'contain',
        'not contain',
        'regex',
      ];
    default:
      return ['equals', 'contain', 'not contain', 'regex'];
  }
};

/**
 * FilterRow component
 * @description This component is used to manage the specific row of rules that are going to be used to filter the data.
 * @param {FilterGroupProps} columns - The columns to be used to filter the data.
 * @param {FilterGroupProps} onAdd - The function to add a new rule to the group.
 * @param {FilterGroupProps} handleRules - The function to handle the rules from the parent component.
 * @param {FilterGroupProps} rules - The rules to be used to filter the data.
 * @param {FilterGroupProps} group - The group of rules to be used to filter the data.
 * @param {FilterGroupProps} onDelete - The function to delete the group of rules.
 * @param {FilterGroupProps} id - The ID of the group of rules.
 * @param {FilterGroupProps} initial - The flag to check if the group is the initial group.
 * @returns {React.FC<FilterGroupProps>} The FilterRow component
 */
const FilterRow: React.FC<FilterGroupProps> = ({
  columns,
  onAdd,
  handleRules,
  rules,
  group,
  onDelete,
  id,
  initial,
}) => {
  const [hover, setHover] = useState<boolean>(false);

  // Function to handle the change of the rules, so we're updating the rules based on the user input.
  const onChangeRule = (value: string, key: string) => {
    handleRules(
      rules.map(ruleGroup => {
        const columnDataType = columns.find(
          column => column.key === value
        )?.type;
        if (ruleGroup.id === group.id) {
          return {
            ...ruleGroup,
            rules: ruleGroup.rules.map((rule: Rule) => {
              if (rule.id === id) {
                if (key === 'column_name') {
                  return {
                    ...rule,
                    [key]: value,
                    condition: undefined,
                    value: undefined,
                    data_type: columnDataType,
                  };
                } else {
                  return {
                    ...rule,
                    [key]: value,
                  };
                }
              }
              return rule;
            }),
          };
        }
        return ruleGroup;
      })
    );
  };

  // Function to get the current rule based on the ID so we can have relevant information to display some sections of the UI
  const currentRule = group.rules.find((rule: Rule) => rule.id === id);

  // Function to handle the click on the add button, so we're adding a new rule to the group
  const onAddClick = () => {
    if (onAdd) {
      onAdd();
    }
    setHover(false);
  }

  return (
    <StyledRow data-testid="filter-row">
      <StyledCol span={24}>
        {initial ? null : <Or>OR</Or>}
        <Select
          onChange={(e: string) => onChangeRule(e, 'column_name')}
          showSearch
          placeholder="Select a column"
        >
          {columns.map(column => (
            <Select.Option role='option' data-testid="select-column" key={column.key}>{column.title}</Select.Option>
          ))}
        </Select>
        <Select
          onChange={(e: string) => onChangeRule(e, 'condition')}
          showSearch
          value={currentRule?.condition}
          placeholder="Select a filter method"
        >
          {filterMethods(currentRule?.data_type).map(method => (
            <Select.Option key={method}>{method}</Select.Option>
          ))}
        </Select>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeRule(e.target.value, 'value')
          }
          placeholder={
            currentRule?.data_type === 'number'
              ? 'Ex: 123'
              : 'Input search text'
          }
          value={currentRule?.value}
          type={currentRule?.data_type === 'number' ? 'number' : 'text'}
        />{' '}
        <Button type="primary" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} name="add rule" onClick={onAddClick}>
          <PlusOutlined />
        </Button>
        {initial ? null : (
          <Button type="text" danger onClick={onDelete}>
            <DeleteFilled />
          </Button>
        )}
      </StyledCol>
      {hover && <CustomHoveCol span={24} />}
    </StyledRow>
  );
};

const CustomHoveCol = styled(Col)`
  width: 100%;
  margin: 24px 0;
  height: 32px;
  background-color: lightGrey;
`;

const StyledRow = styled(Row)`
  margin: 24px 0;
`;

const Or = styled.p`
  font-weight: bold;
  font-size: 18px;
  font-style: italic;
  color: lightGrey;
  margin: 0;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  .ant-select {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default FilterRow;
