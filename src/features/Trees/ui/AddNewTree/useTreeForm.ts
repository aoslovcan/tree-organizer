import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddNewTree } from '../../model/useAddNewTree.ts';
import { useCallback } from 'react';

const defaultValues = {
  childName: ''
};

export const schema = yup.object().shape({
  childName: yup.string().min(5, 'It must contain at least 5 characters!')
});

export const useTreeForm = () => {
  const {
    control,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const childName = watch('childName');

  const { addTree, isLoading, addRootTree } = useAddNewTree();

  const handleAdd = useCallback(
    (id: string) => {
      if (childName) {
        const body = {
          childName: childName
        };

        addTree(body, id);
      }
    },
    [childName]
  );

  const handleAddRoot = useCallback(() => {
    if (childName) {
      const body = {
        childName: childName
      };

      addRootTree(body);
    }
  }, [childName]);

  const isValid = childName && Object.keys(errors).length === 0; // Ensure errors object is empty

  return {
    control,
    errors,
    handleAdd,
    handleAddRoot,
    isLoading,
    isValid
  };
};
