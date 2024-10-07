import React, { useState } from 'react';
import { Trees } from 'features/Trees';
export const HomePage = () => {
  const [treeData, setTreeData] = useState([
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
    },
    {
      id: 2905395,
      name: 'Root 2',
      children: [
        {
          id: 1432424,
          name: 'Child 1',
          children: [
            { id: 53920930, name: 'Grandchild 1', children: [] },
            { id: 695439053, name: 'Grandchild 2', children: [] }
          ]
        },
        {
          id: 343434,
          name: 'Child 2',
          children: []
        },
        {
          id: 454545,
          name: 'Child 3',
          children: [{ id: 79543950934, name: 'Grandchild 3', children: [] }]
        }
      ]
    }
  ]);
  return (
    <div>
      <h1>Simple Tree View</h1>
      <Trees data={treeData} handleData={setTreeData} />
    </div>
  );
};
