import { useState } from 'react';
import { Table, Alert } from 'antd';
import FetchDataInput from '../components/FetchDataInput';
import FilterGroup from '../components/FilterGroups';

export interface Column {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any) => any;
  type: string;
}

export interface Rule {
  id: number,
  type: string;
  column_name: string;
  data_type: string;
  condition: string;
  value: string | number;
}

export interface RuleGroup {
  id: number;
  type: string;
  rules: Rule[];
};

// This is an example of the structure of the data that we're going to generate from the condition builder.

// const structureExample = [
//   {
//     id: 0,
//     type: 'AND',
//     rules: [
//       {
//         id: 0
//         type: 'OR',
//         column_name: 'name',
//         data_type: 'text',
//         condition: 'equals',
//         value: 'John Doe',
//       },
//       {
//         id: 1
//         type: 'OR',
//         column_name: 'age',
//         data_type: 'number',
//         condition: 'greater than',
//         value: 25,
//       },
//     ],
//   },
//   {
//     id: 1,
//     type: 'AND',
//     rules: [
//       {
//         id: 3
//         type: 'OR',
//         column_name: 'name',
//         data_type: 'text',
//         condition: 'equals',
//         value: 'Jane Doe',
//       },
//       {
//         id: 4
//         type: 'OR',
//         column_name: 'age',
//         data_type: 'number',
//         condition: 'less than',
//         value: 30,
//       },
//     ],
//   },
// ];

const initialRules: RuleGroup[] = [
  {
    id: 0,
    type: 'AND',
    rules: [
      {
        id: 0,
        type: 'OR',
        column_name: '',
        data_type: '',
        condition: '',
        value: '',
      }
    ],
  },
];

function App() {
  const [data, setData] = useState<any>([]);
  const [rules, setRules] = useState<RuleGroup[]>(initialRules);
  const [uniqueValue, setUniqueValue] = useState<boolean>(false);
  const [columns, setColumns] = useState<Column[]>([]);

  const manageState = (
    incomingData: any[],
    definedColumns: Column[],
    uniqueValueError: boolean
  ) => {
    setData(incomingData);
    setColumns(definedColumns);
    setUniqueValue(uniqueValueError);
  };

  const handleRules = (value: RuleGroup[]) => {
    setRules(value);
  }

  console.log('rules ', rules);

  return (
    <div className="App">
      {/*  */}

      <FetchDataInput
        defaultUrl="https://data.nasa.gov/resource/y77d-th95.json"
        manageState={manageState}
      />
      <FilterGroup columns={columns} rules={rules} handleRules={handleRules} />
      {uniqueValue && (
        <Alert
          message="Unique value detected, you should try with a different URL to get an array of data instead of a single object"
          type="error"
        />
      )}
      {data.length > 0 && columns.length > 0 && (
        <Table dataSource={data} columns={columns} />
      )}
    </div>
  );
}

export default App;
