import { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Row, Col } from 'antd';
import { Column } from '../containers/App';

interface FetchDataProps {
  defaultUrl: string;
  manageState: (
    incomingData: any[],
    definedColumns: Column[],
    uniqueValueError: boolean
  ) => void;
}

const FetchDataInput: React.FC<FetchDataProps> = ({
  defaultUrl,
  manageState,
}) => {
  const [url, setUrl] = useState(defaultUrl);

  const requestData = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => defineColumns(data))
      .catch(err => console.error(err));
  };

  // This is an example of the structure of the data that we're going to generate from the condition builder.

  // const structureExample = [
  //   [
  //     {
  //       column_name: 'name',
  //       data_type: 'text',
  //       condition: 'equals',
  //       value: 'John Doe',
  //     },
  //     {
  //       column_name: 'age',
  //       data_type: 'number',
  //       condition: 'greater than',
  //       value: 25,
  //     },
  //   ],
  //   [
  //     {
  //       column_name: 'name',
  //       data_type: 'text',
  //       condition: 'equals',
  //       value: 'Jane Doe',
  //     },
  //     {
  //       column_name: 'age',
  //       data_type: 'number',
  //       condition: 'greater than',
  //       value: 25,
  //     },
  //   ],
  // ];

  const defineColumns = (data: any) => {
    const keys = data.length > 0 ? Object.keys(data[0]) : Object.keys(data);
    const values =
      data.length > 0 ? Object.values(data[0]) : Object.values(data);
    const specialIndexes: number[] = [];

    values.map((value: any, idx: number) => {
      if (typeof value === 'object') {
        specialIndexes.push(idx);
      } else {
        return null;
      }
    });

    const columns = keys.map((key: string, idx: number) => {
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key: key,
        render: (value: any) =>
          specialIndexes.includes(idx) ? JSON.stringify(value) : value,
        // We're using the "isNaN" function to check if the value is a number or not. If it's
        // not a number, we're returning the type of the value. If it's a n umber, we're returning
        // the string 'number'. This way, we can define the type of the column in the table.
        type: isNaN(Number(values[idx])) ? typeof values[idx] : 'number',
      };
    });

    if (data.length === undefined) {
      manageState([data], columns, true);
    } else {
      manageState(data, columns, false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <CustomRow gutter={[16, 36]}>
      <Col xs={24} sm={24} md={16} lg={16} xl={16}>
        <Input placeholder="URL Input" value={url} onChange={onChange} />
      </Col>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <StyledButton type="primary" onClick={requestData}>
          Request data
        </StyledButton>
      </Col>
    </CustomRow>
  );
};

const CustomRow = styled(Row)`
  margin: 36px 0;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export default FetchDataInput;
