import { Droppable } from 'react-beautiful-dnd';
import { DroppableItemProps } from './types.ts';

/**
 *
 * @param droppableId - The droppable id
 * @param type - The type of the droppable item
 * @param children - The content of the droppable item
 * @param className - The class name of the droppable item
 *
 */
export const DroppableItem = ({ droppableId, type, children, className }: DroppableItemProps) => {
  return (
    <Droppable droppableId={droppableId} type={type}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className={className}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
