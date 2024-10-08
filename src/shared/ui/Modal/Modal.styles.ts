import { cn } from 'shared/utils'

export const getButtonStyle = () => {
    return 'hover:bg-background-hover-light inline-flex h-10 w-10 items-center justify-center gap-2.5 rounded-full p-1.5 shadow-light'
}

export const getModalClass = (isOpen: boolean) => {
    return cn(
        'bg-white shadow-md absolute left-1/2 top-[35vh] flex w-full max-w-md -translate-x-1/2 flex-col rounded-[15px] p-10',
        `${isOpen ? 'animate-fade-in' : 'animate-fade-out'}`
    )
}

export const getOverlayClass = (isOpen: boolean) => {
    return cn(
        'backdrop-blur-xs inset-0 fixed',
        `${isOpen ? 'animate-fade-in' : 'animate-fade-out'}`
    )

}
