import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from 'shared/assets/icons';
import { Button, DraggableItem, DroppableItem } from 'shared/ui';
import { useModal } from '../../../app/modal';

type TreeNode = {
  id: number;
  name: string;
  children?: TreeNode[]; // Children is an optional array of TreeNode
};

interface TreeViewProps {
  node: TreeNode;
  index: number;
  handleAddNew: ({ id: string }) => void;
}

export const TreeView = ({ node, index = 0, handleAddNew }: TreeViewProps) => {
  const [expanded, setExpanded] = useState(false); // Control expand/collapse state

  // Toggle expand/collapse
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <DroppableItem droppableId={`${node.name}--${node?.id.toString()}`} type="NODE">
      <div className="px-6 mb-2">
        {/* Node label and expand/collapse icon */}
        <DraggableItem draggableId={`first--${node.id.toString()}`} index={index}>
          <div className="flex flex-row items-center gap-4 mb-2" onClick={toggleExpand}>
            {node.children &&
              (expanded ? (
                <span className="cursor-pointer">
                  <MinusIcon />
                </span>
              ) : (
                <span className="cursor-pointer">
                  <PlusIcon />
                </span>
              ))}{' '}
            {node.name}
          </div>
        </DraggableItem>

        {expanded && node.children && (
          <>
            <Button
              label="Add new"
              onClick={() => handleAddNew(node.id)}
              className="!bg-white !text-sm !font-normal"
              size="sm"
              iconAfter={<PlusIcon />}
              shape="rounded"
              variant="contained"
            />
            <div>
              {node.children.map((childNode, childIndex) => (
                <TreeView
                  handleAddNew={handleAddNew}
                  key={childNode.id}
                  node={childNode}
                  index={childIndex}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </DroppableItem>
  );
};
