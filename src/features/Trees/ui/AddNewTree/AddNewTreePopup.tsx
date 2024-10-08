import { Modal } from 'shared/ui';

interface AddNewTreePopupProps {
  isOpen: boolean;
  onCloseModal: () => void;
  currentId: string;
}
export const AddNewTreePopup = ({ isOpen, onCloseModal, currentId }: AddNewTreePopupProps) => {
  return <Modal content={<p>I am new tree</p>} isOpen={isOpen} onCloseModal={onCloseModal} />;
};
