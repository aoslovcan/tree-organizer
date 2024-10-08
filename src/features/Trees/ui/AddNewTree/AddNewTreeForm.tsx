import { Control, Controller, DeepRequired, FieldErrorsImpl, FieldValues } from 'react-hook-form';
import { Input } from 'shared/ui';

interface AddNewTreeFormProps {
  control: Control<{ childName: '' }>;
  errors: Partial<FieldErrorsImpl<DeepRequired<FieldValues>>>;
}

export const AddNewTreeForm = ({ control, errors }: AddNewTreeFormProps) => {
  return (
    <Controller
      name="childName"
      control={control}
      render={({ field: { value, onChange } }) => (
        <Input
          type="text"
          error={!!errors['childName']?.message}
          errorMessage={errors['childName']?.message}
          value={value}
          label="Unesite naziv čvora"
          onChange={onChange}
          inputSize="md"
        />
      )}
    />
  );
};
