import React, { useCallback, useState } from 'react';
import { TreeView } from 'shared/ui';
import { DragAndDrop } from 'shared/ui';
import { AddNewTreePopup, useOnDrag, useTreesData } from 'features/Trees';
import { useModal } from 'app/modal';

export const Trees = () => {
  const { transformedData } = useTreesData();
  const { onDragAnd } = useOnDrag();

  const [currentId, setCurrentId] = useState(null);

  const { modals, closeModal, openModal } = useModal();

  const handleAdd = useCallback((id) => {
    setCurrentId(id);
    openModal('newTreeModal');
  }, []);
  return (
    <>
      <DragAndDrop handleOnDragEnd={onDragAnd}>
        <div>
          {transformedData &&
            transformedData?.map((rootNode, index) => (
              <TreeView handleAddNew={handleAdd} key={rootNode.id} node={rootNode} index={index} />
            ))}
        </div>
      </DragAndDrop>

      {modals.newTreeModal && (
        <AddNewTreePopup
          isRoot={false}
          isOpen={modals.newTreeModal}
          onCloseModal={() => closeModal('newTreeModal')}
          currentId={currentId}
        />
      )}
    </>
  );
};
