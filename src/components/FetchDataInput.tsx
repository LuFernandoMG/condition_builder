import { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Row, Col } from 'antd';
import { Column } from '../containers/App';

interface FetchDataProps {
  defaultUrl: string;
  manageState: (incomingData: any[], definedColumns: Column[], uniqueValueError: boolean) => void;
}

const FetchDataInput: React.FC<FetchDataProps> = ({ defaultUrl, manageState }) => {
  const [url, setUrl] = useState(defaultUrl);

  const requestData = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => defineColumns(data))
      .catch(err => console.error(err));
  }

  const defineColumns = (data: any) => {
    const keys = data.length > 0 ? Object.keys(data[0]) : Object.keys(data);
    const values = data.length > 0 ? Object.values(data[0]) : Object.values(data);
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
        render: (value: any) => specialIndexes.includes(idx) ? JSON.stringify(value) : value
      }
    });
    
    if (data.length === undefined) {
      manageState([data], columns, true);
    } else {
      manageState(data, columns, false);
    }
  };  

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }

  return (
    <CustomRow gutter={[16, 36]}>
      <Col xs={24} sm={24} md={16} lg={16} xl={16}>
        <Input placeholder='URL Input' value={url} onChange={onChange} />
      </Col>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <StyledButton type='primary' onClick={requestData}>Request data</StyledButton>
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