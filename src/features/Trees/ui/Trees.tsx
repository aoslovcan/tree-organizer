import React from 'react';
import { TreeView } from 'shared/ui';
import { DragAndDrop } from 'shared/ui';

export const Trees = ({ data, handleData }) => {
  const findNodeById = (tree, id) => {
    for (const node of tree) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const foundNode = findNodeById(node.children, id);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null; // Node not found
  };

  const removeNodeById = (tree, id) => {
    return tree.reduce((acc, node) => {
      if (node.id === id) {
        return acc; // Skip the node to remove it
      }
      const newNode = { ...node };
      if (newNode.children) {
        newNode.children = removeNodeById(newNode.children, id);
      }
      acc.push(newNode);
      return acc;
    }, []);
  };

  const onDragAnd = (result) => {
    if (!result.destination) {
      return; // No destination means dropped outside
    }

    // Destructure the result
    const { source, destination } = result;

    // Log the source and destination for debugging
    console.log(source);
    console.log(destination);

    // If the item is dropped in the same place, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Extract the ID from the droppableId
    const draggedNodeId = parseInt(source.droppableId.split('-')[1]); // Extract ID from `name-id`
    const destinationParentId = parseInt(destination.droppableId.split('-')[1]); // Extract ID from `name-id`

    // Create a shallow copy of the current tree data
    const newTreeData = [...data];

    // Remove the dragged node from its original position
    const draggedNode = findNodeById(newTreeData, draggedNodeId);
    const updatedSourceTree = removeNodeById(newTreeData, draggedNodeId);

    // Find the destination parent node
    const destinationParentNode = findNodeById(updatedSourceTree, destinationParentId);

    // If the destination parent exists, insert the node at the new position
    if (destinationParentNode) {
      destinationParentNode.children.splice(destination.index, 0, draggedNode);
    }

    // Update state with the modified tree
    handleData(updatedSourceTree);
  };

  return (
    <DragAndDrop handleOnDragEnd={onDragAnd}>
      <div>
        {data.map((rootNode, index) => (
          <TreeView key={rootNode.id} node={rootNode} index={index} />
        ))}
      </div>
    </DragAndDrop>
  );
};
