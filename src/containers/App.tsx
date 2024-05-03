import { useState } from 'react';
import { Table, Alert } from 'antd';
import FilterCard from '../components/FilterBlock';
import FetchDataInput from '../components/FetchDataInput';

export interface Column {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any) => any;
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


  const onAdd = () => console.log('add filter or')
  const onDelete = () => console.log('delete filter')

  const manageState = (incomingData: any[], definedColumns: Column[], uniqueValueError: boolean) => {
    setData(incomingData);
    setColumns(definedColumns);
    setUniqueValue(uniqueValueError);
  };

  return (
    <div className="App">
      {/*  */}

      <FetchDataInput defaultUrl='https://data.nasa.gov/resource/y77d-th95.json' manageState={manageState} />
    <FilterCard columns={columns} onAdd={onAdd} onDelete={onDelete} />
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
