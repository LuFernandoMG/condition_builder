import { useState } from 'react';
import { Table, Alert } from 'antd';
import FetchDataInput from '../components/FetchDataInput';
import FilterGroup from '../components/FilterGroup';

export interface Column {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any) => any;
  type: string;
}

export interface Filter {
  column: string;
  method: string;
  value: string;
}

function App() {
  const [data, setData] = useState<any>([]);
  const [uniqueValue, setUniqueValue] = useState<boolean>(false);
  const [columns, setColumns] = useState<Column[]>([]);

  const manageState = (incomingData: any[], definedColumns: Column[], uniqueValueError: boolean) => {
    setData(incomingData);
    setColumns(definedColumns);
    setUniqueValue(uniqueValueError);
  };

  console.log('columns', columns)
  return (
    <div className="App">
      {/*  */}

      <FetchDataInput defaultUrl='https://data.nasa.gov/resource/y77d-th95.json' manageState={manageState} />
      <FilterGroup columns={columns} />
    {
      uniqueValue &&
        <Alert message='Unique value detected, you should try with a different URL to get an array of data instead of a single object' type='error' />
    }
    {data.length > 0 && columns.length > 0 &&
      <Table dataSource={data} columns={columns} />
    }
    </div>
  );
}

export default App;
