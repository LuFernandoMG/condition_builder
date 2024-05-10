// Dependencies
import { useState } from 'react';
import { Button, Card } from 'antd';
import styled from 'styled-components';

// Utils
import { FilterGroupProps, RuleGroup} from '../utils/interfaces';

// Assets
import { CloseCircleOutlined } from '@ant-design/icons';

// Components
import FilterRow from './FilterRow';

/**
 * FilterGroup component
 * @description This component is used to manage and specific group of rules that are going to be used to filter the data.
 * @param {FilterGroupProps} columns - The columns to be used to filter the data.
 * @param {FilterGroupProps} group - The group of rules to be used to filter the data.
 * @param {FilterGroupProps} handleRules - The function to handle the rules from the parent component.
 * @param {FilterGroupProps} rules - The rules to be used to filter the data.
 * @param {FilterGroupProps} id - The ID of the group of rules.
 * @returns {React.FC<FilterGroupProps>} The FilterGroup component
 */
const FilterGroup: React.FC<FilterGroupProps> = ({
  columns,
  group,
  handleRules,
  rules,
  id,
}) => {
  const [rulesId, setRulesId] = useState<number>(1);

  // Function used to add a new object Rule for the OR section of the current group
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

  // Function used to remove a rule from the group
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

  // Function used to delete the group entirely, it only works if the group is not the first one
  const onDeleteGroup = () => {
    const newRules = rules.filter(ruleGroup => ruleGroup.id !== group.id);
    handleRules(newRules);
  };

  return (
    <StyledCard
      title="Filter Group"
      data-testid="filter-group"
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
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  .ant-card-head-title {
    color: gray;
  }
`;

export default FilterGroup;
