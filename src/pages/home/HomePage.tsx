import React from 'react';
import { Trees } from 'features/Trees';
export const HomePage = () => {
  const treeData = [
    {
      id: 1,
      name: 'Root',
      children: [
        {
          id: 2,
          name: 'Child 1',
          children: [
            { id: 5, name: 'Grandchild 1', children: [] },
            { id: 6, name: 'Grandchild 2', children: [] }
          ]
        },
        {
          id: 3,
          name: 'Child 2',
          children: []
        },
        {
          id: 4,
          name: 'Child 3',
          children: [{ id: 7, name: 'Grandchild 3', children: [] }]
        }
      ]
    }
  ];
  return (
    <div>
      <h1>Simple Tree View</h1>
      <Trees data={treeData} />
    </div>
  );
};
