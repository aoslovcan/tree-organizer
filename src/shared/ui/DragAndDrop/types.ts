import React from 'react';

export interface DragAndDropProps {
  children: React.ReactNode;
  handleOnDragEnd: () => void;
}

export interface DraggableItemProps {
  draggableId: string;
  type?: string;
  children?: React.ReactNode;
  className?: string;
  index: number;
}

export interface DroppableItemProps {
  droppableId: string;
  type: string;
  children: React.ReactNode;
  className?: string;
}
