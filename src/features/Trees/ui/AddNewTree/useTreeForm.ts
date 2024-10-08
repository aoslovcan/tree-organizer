import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

  return {
    control,
    errors
  };
};
