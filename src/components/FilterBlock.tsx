import React from 'react';
import { Row, Col, Select, Input, Button, Card, Form } from 'antd';
import { PlusOutlined, DeleteFilled } from '@ant-design/icons';
import styled from 'styled-components';

interface Column {
  key: string;
  title: string;
}

interface FilterBlockProps {
  columns: Column[];
  onAdd?: () => void;
  onDelete?: () => void;
  initial?: boolean;
}

const filterMethods = [
  'equals',
  'contain',
  'not contain',
  'regex',
];

// const filterMethodsNumber = [
//   'equals',
//   'contain',
//   'greater than',
//   'less than',
//   'not contain',
//   'regex',
// ]

const FilterRow: React.FC<FilterBlockProps> = ({
  columns,
  onAdd,
  onDelete,
  initial,
}) => {
  return (
    <StyledRow>
      <StyledCol span={24}>
        {initial ? null : <Or>OR</Or>}
        <Select showSearch placeholder="Select a column">
          {columns.map(column => (
            <Select.Option key={column.key}>{column.title}</Select.Option>
          ))}
        </Select>
        <Select showSearch placeholder="Select a filter method">
          {filterMethods.map(method => (
            <Select.Option key={method}>{method}</Select.Option>
          ))}
        </Select>
        <Input placeholder="Input search text" />
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

const FilterBlock: React.FC<FilterBlockProps> = ({ columns }) => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const [form] = Form.useForm();

  return (
    <Card>
      <Form
        form={form}
        name="filter-block"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="filter_row">
          {(fields, { add, remove }) => (
            <>
              <FilterRow columns={columns} onAdd={add} initial />
              {fields.map(({ key, name }) => (
                <FilterRow
                  key={key}
                  columns={columns}
                  onAdd={add}
                  onDelete={() => remove(name)}
                />
              ))}
            </>
          )}
        </Form.List>
      </Form>
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

export default FilterBlock;
