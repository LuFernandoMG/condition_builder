// Dependencies
import { useState } from 'react';

// Utils
import { Column, RuleGroup } from '../utils/interfaces';

// Components
import FetchDataInput from '../components/FetchDataInput';
import FilterGroup from '../components/FilterGroups';
import DataTable from '../components/DataTable';

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
      },
    ],
  },
];

function App() {
  const [data, setData] = useState<any>([]);
  const [rules, setRules] = useState<RuleGroup[]>(initialRules);
  const [columns, setColumns] = useState<Column[]>([]);

  const manageState = (incomingData: any[], definedColumns: Column[]) => {
    setData(incomingData);
    setColumns(definedColumns);
  };

  const handleRules = (value: RuleGroup[]) => {
    setRules(value);
  };

  return (
    <div className="App">
      <FetchDataInput
        defaultUrl="https://data.nasa.gov/resource/y77d-th95.json"
        manageState={manageState}
      />
      <FilterGroup columns={columns} rules={rules} handleRules={handleRules} />
        <DataTable dataSource={data} columns={columns} rules={rules} />
    </div>
  );
}

export default App;
