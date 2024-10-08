import { useNewTreeMutation } from 'entities/trees';
import { useCallback } from 'react';

export const useAddNewTree = () => {
  const [addNewTree, { isLoading }] = useNewTreeMutation();

  const addTree = useCallback((data, id) => {
    const response = addNewTree({ id: id, body: data });
  }, []);

  return {
    addTree,
    isLoading
  };
};
