// Dependencies
import { Col, Row, Table, Tabs, Tag } from 'antd';
import styled from 'styled-components';

// TypeScript Dependencies
import type { TabsProps } from 'antd';

// Utils
import { Rule, RuleGroup, DataTableProps } from '../utils/interfaces';
import { getConditionalFilter } from '../utils/getConditionalFilter';

const DataTable: React.FC<DataTableProps> = ({
  dataSource,
  columns,
  rules,
}) => {
  // Here we filter the current defined rules so we're only considering the rules that has been fulfilled
  const filteredRules = rules.map((group: RuleGroup) => {
    return {
      ...group,
      rules: group.rules.filter((rule: Rule) => {
        return !Object.values(rule).some(
          value => value === '' || value === undefined || value === null
        );
      }),
    };
  });

  const filteredData = dataSource.filter((data: any) => {
    return filteredRules.every((group: RuleGroup) => {
      return group.rules.some((rule: Rule) => getConditionalFilter(rule, data));
    });
  });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          Results table <Tag color="blue">{dataSource.length}</Tag>
        </span>
      ),
      children: <Table scroll={{ x: '100%' }} dataSource={dataSource} columns={columns} />,
    },
    {
      key: '2',
      label: (
        <span>
          Results filter <Tag color="blue">{filteredData.length}</Tag>
        </span>
      ),
      children: <Table scroll={{ x: '100%' }} dataSource={filteredData} columns={columns} />,
    },
  ];

  return (
    <StyledRow data-testid="data-table">
      <Col span={24}>
        <H2>Response</H2>
      </Col>
      <Col span={24}>
        <Tabs type="card" defaultActiveKey="1" items={items} />
      </Col>
    </StyledRow>
  );
};

const H2 = styled.h2`
  color: gray;
  font-weight: bold;
`;

const StyledRow = styled(Row)`
  margin: 30px 0;
`;

export default DataTable;
