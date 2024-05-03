import React, { useState } from 'react';
import { Card, Row, Col, Select, Input, Button } from 'antd';

interface Column {
  key: string;
  title: string;
}

interface FilterCardProps {
  columns: Column[];
  onAdd: () => void;
  onDelete: () => void;
}

const filterMethods = [
  'equals',
  'contain',
  'greater than',
  'less than',
  'not contain',
  'regex',
];

const FilterCard: React.FC<FilterCardProps> = ({
  columns,
  onAdd,
  onDelete,
}) => {
  console.log('columns', columns);

  return (
    <Card title="Filter Card" style={{ width: 900 }}>
      <Row>
        <Col span={7}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a column"
            // onChange={setSelectedColumn}
          >
            {columns.map(column => (
              <Select.Option key={column.key}>{column.title}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={7}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a filter method"
            // onChange={setSelectedMethod}
          >
            {filterMethods.map(method => (
              <Select.Option key={method}>{method}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={7}>
          <Input
            placeholder="Input search text"
            // onChange={e => setInputText(e.target.value)}
          />
        </Col>
        <Col span={3}>
          <Button type="primary" onClick={onAdd}>
            Add
          </Button>
          <Button type="default" onClick={onDelete}>
            Delete
          </Button>
        </Col>
      </Row>
      <p>Filter Card Content</p>
    </Card>
  );
};

export default FilterCard;
