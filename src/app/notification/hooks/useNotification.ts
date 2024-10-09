import { NotificationContextType } from 'app/notification/provider/types';
import { useContext } from 'react';
import { NotificationContext } from '../context/NotifcationContext.ts';

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
