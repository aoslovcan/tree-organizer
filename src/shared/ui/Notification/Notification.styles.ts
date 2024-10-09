import { NotificationType } from './types.ts';
import { VariantClassesProps } from 'shared/utils';
export const baseClass =
  'font-sans fixed flex flex-col items-center z-50 top-2 left-0 right-0 mx-auto p-4 rounded-lg max-w-[200px]';
export const showNotificationClass = 'animate-slideIn';
// Slide-out animation for hiding notification
export const hideNotificationClass = 'animate-slideOut';
export const notificationContent = 'p-2 text-white';

export const getNotificationType = (type: NotificationType) => {
  const map: VariantClassesProps = {
    SUCCESS: 'bg-background-success',
    ERROR: 'bg-color-error'
  };

  return map[type];
};
