import React from 'react';

const TableComponent = ({ data, columns }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.key} style={{ border: '1px solid #ddd', padding: '8px' }}>{col.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id || item.name}>
          {columns.map((col) => (
            <td key={col.key} style={{ border: '1px solid #ddd', padding: '8px' }}>{item[col.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableComponent;