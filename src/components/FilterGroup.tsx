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
