import {
  useAddRootTreeMutation,
  useDeleteChildTreeMutation,
  useNewTreeMutation
} from 'entities/trees';
import { useCallback } from 'react';
import { useModal } from 'app/modal';

export const useAddNewTree = () => {
  const [addNewTree, { isLoading }] = useNewTreeMutation();
  const [addRoot, { isLoading: loading }] = useAddRootTreeMutation();
  const [deleteTree, { isLoading: isDeleting }] = useDeleteChildTreeMutation();

  const { closeModal } = useModal();

  const addTree = useCallback((data, id) => {
    const response = addNewTree({ id: id, body: data });

    if (!response.error) {
      closeModal('newTreeModal');
    }
  }, []);

  const addRootTree = useCallback((data) => {
    const response = addRoot({ body: data });

    if (!response.error) {
      closeModal('newRootModal');
    }
  }, []);

  const deleteChildTree = useCallback((id, parentId) => {
    const res = deleteTree({ id: id, parentId: parentId });
  }, []);

  return {
    addTree,
    isLoading,
    loading,
    addRootTree,
    deleteChildTree
  };
};
