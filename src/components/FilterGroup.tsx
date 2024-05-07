import { useState } from 'react';
import { Row, Col, Select, Input, Button, Card } from 'antd';
import {
  PlusOutlined,
  DeleteFilled,
  CloseCircleOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { RuleGroup, Column } from '../containers/App';

interface FilterGroupProps {
  columns: Column[];
  onAdd?: () => void;
  id: number;
  onDelete?: () => void;
  initial?: boolean;
  group: RuleGroup;
  handleRules: (value: any) => void;
  rules: RuleGroup[];
}

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
            rules: ruleGroup.rules.map(rule => {
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

  const currentRule = group.rules.find(rule => rule.id === id);

  return (
    <StyledRow>
      <StyledCol span={24}>
        {initial ? null : <Or>OR</Or>}
        <Select
          onChange={(e: string) => onChangeRule(e, 'column_name')}
          showSearch
          placeholder="Select a column"
        >
          {columns.map(column => (
            <Select.Option key={column.key}>{column.title}</Select.Option>
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
        <Button type="primary" onClick={onAdd}>
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

const FilterGroup: React.FC<FilterGroupProps> = ({
  columns,
  group,
  handleRules,
  rules,
  id,
}) => {
  const [rulesId, setRulesId] = useState<number>(1);

  const addRules = (group: RuleGroup) => {
    setRulesId(rulesId + 1);
    const newRuleTemplate = {
      id: rulesId,
      type: 'OR',
      column_name: '',
      data_type: '',
      condition: '',
      value: '',
    };

    const newRules = rules.map(ruleGroup => {
      if (ruleGroup.id === group.id) {
        return {
          ...ruleGroup,
          rules: [...ruleGroup.rules, newRuleTemplate],
        };
      }
      return ruleGroup;
    });
    handleRules(newRules);
  };

  const removeRule = (id: number) => {
    const newRules = rules.map(ruleGroup => {
      if (ruleGroup.id === group.id) {
        return {
          ...ruleGroup,
          rules: ruleGroup.rules.filter(rule => rule.id !== id),
        };
      }
      return ruleGroup;
    });
    handleRules(newRules);
  };

  const onDeleteGroup = () => {
    const newRules = rules.filter(ruleGroup => ruleGroup.id !== group.id);
    handleRules(newRules);
  };

  return (
    <Card
      title="Filter Group"
      extra={
        id > 0 ? (
          <Button type="text" danger onClick={onDeleteGroup}>
            <CloseCircleOutlined />
          </Button>
        ) : null
      }
    >
      {group.rules.map(({ id }) => (
        <FilterRow
          key={id}
          id={id}
          group={group}
          initial={id === 0}
          rules={rules}
          handleRules={handleRules}
          columns={columns}
          onAdd={() => addRules(group)}
          onDelete={() => removeRule(id)}
        />
      ))}
    </Card>
  );
};

const Or = styled.p`
  font-weight: bold;
  font-size: 18px;
  font-style: italic;
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

const StyledRow = styled(Row)`
  margin: 24px 0;
`;

export default FilterGroup;
