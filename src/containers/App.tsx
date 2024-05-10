// Dependencies
import { useState } from 'react';

// Utils
import { Column, RuleGroup } from '../utils/interfaces';

// Components
import FetchDataInput from '../components/FetchDataInput';
import FilterGroup from '../components/FilterGroups';
import DataTable from '../components/DataTable';

// Template of the Rules data structure
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

/**
 * App component
 * @description This component is the main component of the application, responsible for managing the state of the data and the rules.
 * @returns {React.FC} The App component
 */
function App() {
  const [data, setData] = useState<any>([]);
  const [rules, setRules] = useState<RuleGroup[]>(initialRules);
  const [columns, setColumns] = useState<Column[]>([]);

  // Function to manage the state of the data and the columns from the parent component
  const manageState = (incomingData: any[], definedColumns: Column[]) => {
    setData(incomingData);
    setColumns(definedColumns);
  };

  // Function to handle the rules from the upper component
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
