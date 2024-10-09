import React from 'react';
import { AddNewTreePopup, Trees } from 'features/Trees';
import { PlusIcon } from '../../shared/assets/icons';
import { Button } from '../../shared/ui';
import { useModal } from '../../app/modal';
export const HomePage = () => {
  const { openModal, modals, closeModal } = useModal();
  return (
    <div>
      <h1>Simple Tree View</h1>
      <Button
        label="Add new root"
        onClick={() => openModal('newRootModal')}
        className="!bg-white !text-sm !font-normal"
        size="sm"
        iconAfter={<PlusIcon />}
        shape="rounded"
        variant="contained"
      />
      <Trees />

      {modals.newRootModal && (
        <AddNewTreePopup
          isRoot={true}
          isOpen={modals.newRootModal}
          onCloseModal={() => closeModal('newRootModal')}
        />
      )}
    </div>
  );
};
