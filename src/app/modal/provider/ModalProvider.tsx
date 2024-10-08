import React, { ReactNode, useState } from 'react'
import { ModalContext } from '../context'
import { ModalState } from './types.ts'

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [modals, setModals] = useState<ModalState>({})

    const openModal = (modalName: string) => {
        setModals((prevState) => ({
            ...prevState,
            [modalName]: true,
        }))
    }

    const closeModal = (modalName: string) => {
        setModals((prevState) => ({
            ...prevState,
            [modalName]: false,
        }))
    }

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}
