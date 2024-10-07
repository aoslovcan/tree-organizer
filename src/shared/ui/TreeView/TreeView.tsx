import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from 'shared/assets/icons';

type TreeNode = {
  id: number;
  name: string;
  children?: TreeNode[]; // Children is an optional array of TreeNode
};

interface TreeViewProps {
  node: TreeNode;
}

export const TreeView = ({ node }: TreeViewProps) => {
  const [expanded, setExpanded] = useState(false); // Control expand/collapse state

  // Toggle expand/collapse
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="px-6">
      {/* Node label and expand/collapse icon */}
      <div className="flex flex-row items-center gap-2" onClick={toggleExpand}>
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
      {expanded && node.children && (
        <div>
          {node.children.map((childNode) => (
            <TreeView key={childNode.id} node={childNode} />
          ))}
        </div>
      )}
    </div>
  );
};
