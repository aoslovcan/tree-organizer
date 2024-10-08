import React from "react"
import { CloseIcon } from 'shared/assets/icons'
import { cn } from 'shared/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { getButtonStyle, getModalClass, getOverlayClass } from './Modal.styles'
import { ModalProps } from './Modal.types'

/**
 * @param title - Title of modal
 * @param closeTrigger - If provided, renders as a button
 * @param onCloseModal - If provided, renders as a button
 * @param content - If provided, renders as a button
 * @param isOpen - If true, modal is open, if close modal is closed
 * @param btnIconClass - If provided, adds classes to button
 * @param className - If provided, adds classes to modal
 * @param onOutsideClick - Add additional functionality
 */

export const Modal = ({
    title,
    closeTrigger,
    onCloseModal,
    content,
    isOpen,
    btnIconClass,
    className,
    footerComponent,
    onOutsideClick,
}: ModalProps) => {
    const ref = useRef(null)

    useOnClickOutside(ref, onOutsideClick)

    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className={cn(getOverlayClass(isOpen))} />
                <Dialog.Content
                    ref={ref}
                    className={cn(getModalClass(isOpen), className)}
                >
                    <div className="mb-[24px] flex flex-row items-center justify-between">
                        <Dialog.Title>{title}</Dialog.Title>
                        <Dialog.Close asChild>
                            <button
                                onClick={onCloseModal}
                                className={cn(getButtonStyle(), btnIconClass)}
                            >
                                {closeTrigger ? closeTrigger : <CloseIcon />}
                            </button>
                        </Dialog.Close>
                    </div>
                    {content}
                    <div className="mt-[24px] flex flex-row justify-end">
                        {footerComponent}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
