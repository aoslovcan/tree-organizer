import React from 'react';
import { NotificationContext } from '../context/NotifcationContext.ts';
import { FC, ReactNode, useState } from 'react';
import { Notification } from 'shared/ui';
import { NotificationType } from 'shared/ui/Notification';

export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    title: string | null;
    type: NotificationType;
  }>({
    isVisible: false,
    title: null,
    type: 'SUCCESS'
  });

  const showNotification = (title: string, type: NotificationType) => {
    setNotification({ isVisible: true, title, type });

    setTimeout(() => {
      setNotification({ isVisible: false, title: null, type });
    }, 2500); // Match the delay with your notification component's delay
  };

  return (
    <NotificationContext.Provider value={{ showNotification, notification }}>
      {children}
      {/* Conditionally render the notification */}
      <Notification
        type={notification.type}
        delay={2500}
        show={notification.isVisible}
        title={notification.title}
      />
    </NotificationContext.Provider>
  );
};
