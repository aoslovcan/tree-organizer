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

  const addTree = useCallback(async (data, id) => {
    try {
      await addNewTree({ id: id, body: data });
      showNotification('Successfully added', 'SUCCESS');
      closeModal('newTreeModal');
    } catch (error) {
      showNotification(error.message, 'ERROR');
    }
  }, []);

  const addRootTree = useCallback(async (data) => {
    try {
      await addRoot({ body: data });

      showNotification('Successfully added', 'SUCCESS');
      closeModal('newRootModal');
    } catch (error) {
      showNotification(error.message, 'ERROR');
    }
  }, []);

  const deleteChildTree = useCallback(async (id, parentId) => {
    try {
      await deleteTree({ id: id, parentId: parentId });

      showNotification('Successfully deleted', 'SUCCESS');
    } catch (error) {
      showNotification(error.message, 'ERROR');
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
