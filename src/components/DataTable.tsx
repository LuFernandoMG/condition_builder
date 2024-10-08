// Dependencies
import { Col, Row, Table, Tabs, Tag } from 'antd';
import styled from 'styled-components';

// TypeScript Dependencies
import type { TabsProps } from 'antd';

// Utils
import { Rule, RuleGroup, DataTableProps } from '../utils/interfaces';
import { getConditionalFilter } from '../utils/getConditionalFilter';

/**
 * DataTable component
 * @description This component is responsible for rendering the data tables based on the rules defined by the user.
 * @param {DataTableProps} dataSource - The data source to be rendered in the tables.
 * @param {DataTableProps} columns - The columns to be rendered in the tables.
 * @param {DataTableProps} rules - The rules defined by the user to filter the data.
 * @returns {React.FC<DataTableProps>} The DataTable component
 */

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

  // Here's were we filter the data based on the rules defined by the user,
  // being used the 'every' for the AND condition and 'some' for the OR condition.
  const filteredData = dataSource.filter((data: any) => {
    return filteredRules.every((group: RuleGroup) => {
      return group.rules.some((rule: Rule) => getConditionalFilter(rule, data));
    });
  });

  // Setting the items for the Tabs component for Antd, including both tables with the data
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
