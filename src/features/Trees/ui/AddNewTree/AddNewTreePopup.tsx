import { Modal } from 'shared/ui';
import { AddNewTreeForm } from './AddNewTreeForm.tsx';
import { useTreeForm } from './useTreeForm.ts';

interface AddNewTreePopupProps {
  isOpen: boolean;
  onCloseModal: () => void;
  currentId: string;
}
export const AddNewTreePopup = ({ isOpen, onCloseModal, currentId }: AddNewTreePopupProps) => {
  const { control, errors, handleKeyUp } = useTreeForm();

  return (
    <Modal
      content={<AddNewTreeForm control={control} errors={errors} />}
      isOpen={isOpen}
      onCloseModal={onCloseModal}
    />
  );
};
