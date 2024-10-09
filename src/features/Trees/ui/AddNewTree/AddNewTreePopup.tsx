import { Button, Modal } from 'shared/ui';
import { AddNewTreeForm } from './AddNewTreeForm.tsx';
import { useTreeForm } from './useTreeForm.ts';

interface AddNewTreePopupProps {
  isOpen: boolean;
  onCloseModal: () => void;
  currentId?: string;
  isRoot?: boolean;
}

export const AddNewTreePopup = ({
  isOpen,
  onCloseModal,
  currentId,
  isRoot = false
}: AddNewTreePopupProps) => {
  const { control, errors, handleAdd, isLoading, isValid, handleAddRoot } = useTreeForm(isRoot);

  return (
    <Modal
      className="fixed left-2/4 top-2/4 z-[9999] max-h-[90vh] max-w-[600px] -translate-x-2/4 -translate-y-2/4 transform"
      content={<AddNewTreeForm control={control} errors={errors} />}
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      footerComponent={
        <div className="flex flex-row w-full justify-center">
          <Button
            isLoading={isLoading}
            shape="square"
            className="mb-4 w-full"
            disabled={!isValid}
            onClick={() => (isRoot ? handleAddRoot() : handleAdd(currentId))}
            label="Dodaj"
            variant="contained"
            color="primary"
            size="base"
          />
        </div>
      }
    />
  );
};
