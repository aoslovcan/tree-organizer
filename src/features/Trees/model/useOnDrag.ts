import { useMoveChildTreeMutation } from 'entities/trees';
import { useCallback } from 'react';

export const useOnDrag = () => {
  const [moveChild] = useMoveChildTreeMutation();
  const findNodeById = (tree, id) => {
    for (const node of tree) {
      if (node.id === id) {
        return node; // Found the node
      }
      if (node.children && node.children.length > 0) {
        const foundNode = findNodeById(node.children, id); // Recursive call for children
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
        return acc; // Skip this node to effectively remove it
      }

      const newNode = { ...node }; // Create a shallow copy of the current node
      if (newNode.children && newNode.children.length > 0) {
        newNode.children = removeNodeById(newNode.children, id); // Recursively remove from children
      }

      acc.push(newNode); // Push the updated node into the accumulator
      return acc;
    }, []);
  };

  const findParentNode = (tree, nodeId) => {
    for (let node of tree) {
      if (node.children && node.children.some((child) => child.id === nodeId)) {
        return node; // Return the parent node of the specified child
      } else if (node.children) {
        const parentNode = findParentNode(node.children, nodeId);
        if (parentNode) return parentNode;
      }
    }
    return null; // Parent not found
  };

  const onDragAnd = useCallback((result, transformedData) => {
    if (!result.destination) {
      return; // No destination means dropped outside
    }

    // Destructure the result
    const { source, destination } = result;

    // If the item is dropped in the same place, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Extract the ID from the droppableId
    const draggedNodeId = source.droppableId.split('--')[1]; // Extract ID from `name-id`
    const destinationParentId = destination.droppableId.split('--')[1]; // Extract ID from `name-id`
    // Create a shallow copy of the current tree data
    const newTreeData = [...transformedData];

    const parentOfDraggedNode = findParentNode(newTreeData, draggedNodeId);

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
    moveChild({
      sourceRootId: parentOfDraggedNode?.id,
      childId: draggedNodeId,
      targetRootId: destinationParentId
    });
  }, []);

  return { onDragAnd };
};
