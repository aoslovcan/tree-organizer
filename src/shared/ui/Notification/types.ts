export type NotificationType = 'SUCCESS' | 'ERROR';

export interface NotificationProps {
  title: string | null;
  show: boolean;
  type: NotificationType;
  delay: number;
}
