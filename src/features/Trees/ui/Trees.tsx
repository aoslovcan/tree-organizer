import React from 'react';
import { TreeView } from 'shared/ui';

export const Trees = ({ data }) => {
  return (
    <div>
      {data.map((rootNode) => (
        <TreeView key={rootNode.id} node={rootNode} />
      ))}
    </div>
  );
};
