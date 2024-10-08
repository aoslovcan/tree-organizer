import React from "react";
export interface ModalProps {
    title?: string | React.ReactNode
    closeTrigger?: React.ReactNode
    content: React.ReactNode
    isOpen: boolean
    btnIconClass?: string | undefined
    className?: string | undefined
    footerComponent?: React.ReactNode
    onOutsideClick?: () => void
    onCloseModal: () => void
}
