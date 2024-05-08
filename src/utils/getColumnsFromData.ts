export const getColumnsFromData = (data: any) => {
    const keys = data.length > 0 ? Object.keys(data[0]) : Object.keys(data);
    const values =
      data.length > 0 ? Object.values(data[0]) : Object.values(data);
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
        render: (value: any) =>
          specialIndexes.includes(idx) ? JSON.stringify(value) : value,
        // We're using the "isNaN" function to check if the value is a number or not. If it's
        // not a number, we're returning the type of the value. If it's a n umber, we're returning
        // the string 'number'. This way, we can define the type of the column in the table.
        type: isNaN(Number(values[idx])) ? typeof values[idx] : 'number',
      };
    });

    return columns
};