import React, { useState } from 'react';
import FilterBlock from './FilterBlock';
import styled from 'styled-components';
import { Button } from 'antd';
import { Column } from '../containers/App';

interface FilterGroupProps {
  columns: Column[];
}

const FilterGroup: React.FC<FilterGroupProps> = ({ columns }) => {
  const [filterBlocks, setFilterBlocks] = useState<number[]>([0]);

  const addFilterBlock = () => {
    setFilterBlocks(prevBlocks => {
        console.log('prevBlocks', prevBlocks)
        return [...prevBlocks, prevBlocks.length]});
  };

  return (
    <div>
      {filterBlocks.map((block, index) => (
        <div key={block}>
          {index > 0 && <And>AND</And>}
          <FilterBlock columns={columns} />
        </div>
      ))}
      <StyledButton type="primary" onClick={addFilterBlock}>
        And
      </StyledButton>
    </div>
  );
};

const And = styled.p`
  font-weight: bold;
  font-size: 18px;
  font-style: italic;
  margin: 10px 0;
  font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

export default FilterGroup;
