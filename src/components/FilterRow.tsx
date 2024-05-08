// Dependencies
import { Row, Col, Select, Input, Button } from 'antd';
import styled from 'styled-components';

// Utils
import { FilterGroupProps } from '../utils/interfaces';
import { Rule } from '../utils/interfaces';

// Assets
import { PlusOutlined, DeleteFilled } from '@ant-design/icons';

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

  const currentRule = group.rules.find((rule: Rule) => rule.id === id);

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
          type={currentRule?.data_type === 'number' ? 'number' : 'text'}
        />{' '}
        <Button type="primary" name="add rule" onClick={onAdd}>
          <PlusOutlined />
        </Button>
        {initial ? null : (
          <Button type="text" danger onClick={onDelete}>
            <DeleteFilled />
          </Button>
        )}
      </StyledCol>
    </StyledRow>
  );
};

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
