import {
  useAddRootTreeMutation,
  useDeleteChildTreeMutation,
  useNewTreeMutation
} from 'entities/trees';
import { useCallback } from 'react';
import { useModal } from 'app/modal';
import { useNotification } from 'app/notification';

export const useAddNewTree = () => {
  const [addNewTree, { isLoading }] = useNewTreeMutation();
  const [addRoot, { isLoading: loading }] = useAddRootTreeMutation();
  const [deleteTree, { isLoading: isDeleting }] = useDeleteChildTreeMutation();

  const { closeModal } = useModal();
  const { showNotification } = useNotification();

  const addTree = useCallback((data, id) => {
    const response = addNewTree({ id: id, body: data });

    if (!response.error) {
      showNotification('Successfully added', 'SUCCESS');
      closeModal('newTreeModal');
    }
  }, []);

  const addRootTree = useCallback((data) => {
    const response = addRoot({ body: data });

    if (!response.error) {
      showNotification('Successfully added', 'SUCCESS');
      closeModal('newRootModal');
    }
  }, []);

  const deleteChildTree = useCallback((id, parentId) => {
    const res = deleteTree({ id: id, parentId: parentId });

    if (!res.error) {
      showNotification('Successfully deleted', 'SUCCESS');
    }
  }, []);

  return {
    addTree,
    isLoading,
    loading,
    addRootTree,
    deleteChildTree
  };
};
