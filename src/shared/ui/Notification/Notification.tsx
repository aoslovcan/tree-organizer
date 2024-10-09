import React, { useEffect, useState } from 'react';
import {
  baseClass,
  notificationContent,
  getNotificationType,
  hideNotificationClass,
  showNotificationClass
} from './Notification.styles.ts';
import { cn } from 'shared/utils';
import type { NotificationProps } from './types.ts';

export const Notification = ({ title, show = false, delay = 2500, type }: NotificationProps) => {
  const [isOpen, setOpen] = useState(show);
  const [isClosing, setIsClosing] = useState(false); // Tracks whether the notification is closing (for the slideOut animation)

  useEffect(() => {
    if (show) {
      setOpen(true);
      setIsClosing(false);

      const hideTimeout = setTimeout(() => setIsClosing(true), delay);
      return () => clearTimeout(hideTimeout);
    } else {
      setIsClosing(true);
      const closeTimeout = setTimeout(() => setOpen(false), 500); // Matches slide-out duration
      return () => clearTimeout(closeTimeout);
    }
  }, [show, delay]);

  return (
    <div>
      {isOpen ? (
        <div
          className={cn(
            baseClass,
            getNotificationType(type),
            isClosing ? hideNotificationClass : showNotificationClass
          )}>
          <span className={notificationContent}>{title}</span>
        </div>
      ) : null}
    </div>
  );
};
