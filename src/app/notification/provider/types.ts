import { NotificationType } from 'shared/ui/Notification/types.ts';

export interface NotificationContextType {
  showNotification: (title: string, type: NotificationType) => void;
  notification: {
    isVisible: boolean;
    title: string | null;
    type: NotificationType;
  };
}
