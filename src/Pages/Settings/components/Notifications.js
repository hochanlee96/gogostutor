import React, { useState } from "react";
import classes from "./Notifications.module.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Messages",
      description: "Receive messages from other Gogos Edu users.",
      enabled: true,
    },
    {
      id: 2,
      title: "Promotions and Tips",
      description:
        "Receive coupons, promotions, product updates, and inspiration from Gogos Edu.",
      enabled: true,
    },
    {
      id: 3,
      title: "Lessons and Progress",
      description:
        "Receive lesson summaries, progress updates, and requests for lesson feedback.",
      enabled: true,
    },
    {
      id: 4,
      title: "Schedule Updates",
      description:
        "Receive reminders and notifications about your lessons and other updates to your Gogos Edu schedule.",
      enabled: true,
    },
    {
      id: 5,
      title: "Referrals",
      description:
        "Receive updates when invited users join Cambly and earn your rewards.",
      enabled: true,
    },
    {
      id: 6,
      title: "Account Updates",
      description:
        "Receive important notifications about your account, purchases, legal notification, and privacy matters. For your security, you cannot disable notifications of this category.",
      enabled: true,
      immutable: true,
    },
  ]);

  const toggleNotification = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id && !notification.immutable
        ? { ...notification, enabled: !notification.enabled }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Your Notification</h1>

      <div className={classes.notificationList}>
        {notifications.map((notification) => (
          <div key={notification.id} className={classes.notificationItem}>
            <div className={classes.notificationInfo}>
              <p className={classes.notificationTitle}>{notification.title}</p>
              <p className={classes.notificationDescription}>
                {notification.description}
              </p>
            </div>
            <div>
              <label className={classes.switch}>
                <input
                  type="checkbox"
                  checked={notification.enabled}
                  onChange={() => toggleNotification(notification.id)}
                  disabled={notification.immutable}
                />
                <span className={classes.slider}></span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <button className={classes.saveButton}>Save all changes</button>
    </div>
  );
};

export default Notifications;
