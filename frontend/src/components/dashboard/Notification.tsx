import { NotificationType } from "@/types/notification";
import { useState } from "react";
import notificationExample from "@/examples/notifications.json";

const NoNotification = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-sm">No notification!</p>
    </div>
  );
};

const NotificationList = ({
  notification,
}: {
  notification: NotificationType[];
}) => {
  return (
    <div className="w-full h-full py-5 flex flex-col gap-y-2">
      {notification.map((item: any, index: number) => {
        return (
          <div className="relative w-full flex gap-x-2 border border-tertiary rounded-2xl px-2">
            <div
              className="w-full py-2 flex flex-1 flex-col gap-y-2"
              key={index}
            >
              <h3>{item.title}</h3>
              <p className="text-sm line-clamp-2">{item.description}</p>
            </div>
            <button className="h-full pl-2 pb-2 text-xs flex items-center">
              Dismiss
            </button>
          </div>
        );
      })}
    </div>
  );
};

const Notification = () => {
  const [notification, setNotification] = useState<NotificationType[]>([]);

  // TODO: remove later
  const handleClick = () => {
    if (notification.length) setNotification([]);
    else setNotification(notificationExample);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* // TODO: remove later */}
      <button
        className="absolute top-2 left-2 w-5 h-5 rounded-full bg-red-400"
        onClick={handleClick}
      />
      <h2>Notifications</h2>
      {notification.length ? (
        <NotificationList notification={notification} />
      ) : (
        <NoNotification />
      )}
    </div>
  );
};

export default Notification;
