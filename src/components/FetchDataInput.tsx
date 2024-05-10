// Dependencies
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Row, Col, Alert } from 'antd';

// Utils
import { FetchDataProps } from '../utils/interfaces';
import { getColumnsFromData } from '../utils/getColumnsFromData';


/**
 * FetchDataInput component
 * @description This component is used to request data from an API and manage the state of the parent component.
 * @param {FetchDataProps} defaultUrl - The default URL to be requested.
 * @param {FetchDataProps} manageState - The function to manage the state of the parent component.
 * @returns {React.FC<FetchDataProps>} The FetchDataInput component
 */
const FetchDataInput: FC<FetchDataProps> = ({
  defaultUrl,
  manageState,
}) => {
  const [url, setUrl] = useState(defaultUrl);
  const [uniqueValue, setUniqueValue] = useState<boolean>(false);
  const [errorOnRequest, setErrorOnRequest] = useState<boolean>(false);

  // Simple function to request data from an API and manage the state of the parent component.
  const requestData = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => defineColumns(data))
      .catch(err => {
        setErrorOnRequest(true);
        console.error(err);
      });
  };

  // In order to use the Tables from Antd, we need to define the columns that we're going
  // to use in the table, this is done by the function getColumnsFromData that we're importing
  // from the utils folder. This function will return an array of columns based on the data that
  // we're passing to it, so we can use it to define the columns of the table.
  const defineColumns = (data: any) => {
    const columns = getColumnsFromData(data);

    if (data.length === undefined) {
      setUniqueValue(true);
      manageState([data], columns);
    } else {
      setErrorOnRequest(false);
      setUniqueValue(false);
      manageState(data, columns);
    }
  };

  // Regular function to handle the change of the input
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <CustomRow gutter={[16, 12]} data-testid="fetch-data-input">
      <Col span={24}>
        <H2>URL Requested</H2>
      </Col>
      <Col xs={24} sm={24} md={16} lg={16} xl={16}>
        <Input placeholder="URL Input" value={url} onChange={onChange} />
      </Col>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <StyledButton type="primary" name='Request data' onClick={requestData}>
          Request data
        </StyledButton>
      </Col>
      <Col span={24}>
        {/* Here we're managing some errors that could happen when requesting the data */}
        {errorOnRequest && (
          <Alert
            message="It seems like you're trying to call an invalid URL, this is not returning JSON data, give it a review! You can have more information in the console :)"
            type="error"
          />
        )}
        {uniqueValue && (
          <Alert
            message="Unique value detected, you should try with a different URL to get an array of data instead of a single object"
            type="error"
          />
        )}
      </Col>
    </CustomRow>
  );
};

const CustomRow = styled(Row)`
  margin: 36px 0 50px;
`;

const H2 = styled.h2`
  color: gray;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export default FetchDataInput;
