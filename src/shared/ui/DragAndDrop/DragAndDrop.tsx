import { DragDropContext } from 'react-beautiful-dnd';
import { DragAndDropProps } from './types.ts';

/**
 *
 * @param children - The content of the tab
 * @param handleOnDragEnd - On drag end handler
 *
 */
export const DragAndDrop = ({ children, handleOnDragEnd }: DragAndDropProps) => {
  return <DragDropContext onDragEnd={handleOnDragEnd}>{children}</DragDropContext>;
};
