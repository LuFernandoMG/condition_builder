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

  export interface FetchDataProps {
    defaultUrl: string;
    manageState: (
      incomingData: any[],
      definedColumns: Column[],
    ) => void;
  }

  export interface FilterGroupsProps {
    columns: Column[];
    rules: RuleGroup[];
    handleRules: (rules: RuleGroup[]) => void;
  }
  
  export interface FilterGroupProps {
    columns: Column[];
    onAdd?: () => void;
    id: number;
    onDelete?: () => void;
    initial?: boolean;
    group: RuleGroup;
    handleRules: (value: any) => void;
    rules: RuleGroup[];
  }

  export interface DataTableProps {
    dataSource: any;
    columns: Column[];
    rules: RuleGroup[];
  }