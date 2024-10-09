import React, { useState } from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from 'shared/assets/icons';
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
  handleDelete: ({ id: string }) => void;
  isParent: boolean;
}

export const TreeView = ({
  node,
  index = 0,
  handleAddNew,
  isParent,
  handleDelete
}: TreeViewProps) => {
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
              node.children.length > 0 &&
              // Show + or - icon only if children exist
              (expanded ? (
                <span className="cursor-pointer">
                  <MinusIcon />
                </span>
              ) : (
                <span className="cursor-pointer">
                  <PlusIcon />
                </span>
              ))}
            {node.name}{' '}
            {!isParent && (
              <span
                className="z-50"
                onClick={() => {
                  handleDelete(node.id, node.id);
                }}>
                <TrashIcon />
              </span>
            )}
          </div>
        </DraggableItem>

        {expanded && node.children && (
          <>
            <div className="flex flex-row items-center gap-2">
              <Button
                label="New"
                onClick={() => handleAddNew(node.id)}
                className="border-none !bg-white !text-xs !font-normal mb-2"
                size="sm"
                iconAfter={<PlusIcon />}
                shape="rounded"
                variant="contained"
              />
            </div>

            <div className="flex flex-row">
              <div className="flex flex-col">
                {node.children.map((childNode, childIndex) => (
                  <TreeView
                    handleDelete={() => handleDelete(childNode.id.toString(), node.id.toString())}
                    isParent={false}
                    handleAddNew={handleAddNew}
                    key={childNode.id}
                    node={childNode}
                    index={childIndex}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DroppableItem>
  );
};
