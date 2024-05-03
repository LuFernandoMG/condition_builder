import { useState } from 'react';
import './App.css';
import { Input, Button, Table, Alert } from 'antd';
import FilterCard from './FilterCard';

function App() {
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<any>([]);
  const [uniqueValue, setUniqueValue] = useState<boolean>(false);
  const [columns, setColumns] = useState<any>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const filtherMethods = ['equals', 'contain', 'greater than', 'less than', 'not contain', 'regex'];

  const onAdd = () => console.log('add filter or')
  const onDelete = () => console.log('delete filter')

  const defineColumns = (data: any) => {
    const keys = data.length > 0 ? Object.keys(data[0]) : Object.keys(data);
    const values = data.length > 0 ? Object.values(data[0]) : Object.values(data);
    let specialIndexes: number[] = [];
    
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
      data = [data];
      setUniqueValue(true);
    } else {
      setUniqueValue(false);
    }
    setData(data);
    setColumns(columns);
  };  

  const requestData = () => {
    fetch(value)
      .then(response => response.json())
      .then(data => defineColumns(data))
      .catch(err => console.error(err));
  }

  return (
    <div className="App">
      <Input placeholder='URL Input' value={value} onChange={onChange} />
      <Button type='primary' onClick={requestData}>Submit</Button>

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
