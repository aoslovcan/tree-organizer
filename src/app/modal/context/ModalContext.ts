import { createContext } from 'react'
import { ModalContextProps } from '../provider/types.ts'

export const ModalContext = createContext<ModalContextProps | undefined>(
    undefined
)
