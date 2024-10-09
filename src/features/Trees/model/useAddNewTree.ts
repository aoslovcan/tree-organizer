import { useAddRootTreeMutation, useNewTreeMutation } from 'entities/trees';
import { useCallback } from 'react';
import { useModal } from 'app/modal';

export const useAddNewTree = () => {
  const [addNewTree, { isLoading }] = useNewTreeMutation();
  const [addRoot, { isLoading: loading }] = useAddRootTreeMutation();

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

  return {
    addTree,
    isLoading,
    loading,
    addRootTree
  };
};
