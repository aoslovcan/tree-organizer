import { createContext } from 'react';
import { NotificationContextType } from '../provider/types';

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
