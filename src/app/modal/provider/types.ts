export interface ModalState {
    [key: string]: boolean
}

export interface ModalContextProps {
    modals: ModalState
    openModal: (modalName: string) => void
    closeModal: (modalName: string) => void
}
