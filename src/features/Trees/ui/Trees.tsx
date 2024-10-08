import React from 'react';
import { TreeView } from 'shared/ui';
import { DragAndDrop } from 'shared/ui';
import { useOnDrag, useTreesData } from 'features/Trees';

export const Trees = () => {
  const { transformedData } = useTreesData();
  const { onDragAnd } = useOnDrag();

  return (
    <DragAndDrop handleOnDragEnd={onDragAnd}>
      <div>
        {transformedData &&
          transformedData?.map((rootNode, index) => (
            <TreeView key={rootNode.id} node={rootNode} index={index} />
          ))}
      </div>
    </DragAndDrop>
  );
};
