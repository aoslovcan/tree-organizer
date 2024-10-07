import { Draggable } from 'react-beautiful-dnd';
import { DraggableItemProps } from './types.ts';

/**
 *
 * @param children - The content of the tab
 * @param draggableId - The draggable id
 * @param index - The index of the draggable item
 * @param className - The class name of the draggable item
 *
 */
export const DraggableItem = ({ draggableId, children, index, className }: DraggableItemProps) => {
  return (
    <Draggable draggableId={String(draggableId)} index={index}>
      {(provided) => (
        <div
          className={className}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {children}
        </div>
      )}
    </Draggable>
  );
};
