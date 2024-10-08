import { useNewTreeMutation } from 'entities/trees';
import { useCallback } from 'react';
import { useModal } from 'app/modal';

export const useAddNewTree = () => {
  const [addNewTree, { isLoading }] = useNewTreeMutation();

  const { closeModal } = useModal();

  const addTree = useCallback((data, id) => {
    const response = addNewTree({ id: id, body: data });

    if (!response.error) {
      closeModal('newTreeModal');
    }
  }, []);

  return {
    addTree,
    isLoading
  };
};
