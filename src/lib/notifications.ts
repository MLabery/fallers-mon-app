export const scheduleNotification = (title: string, body: string, time: string, minutesBefore: number = 15) => {
  if (!("Notification" in window)) {
    console.warn("This browser does not support desktop notification");
    return;
  }

  const scheduleTime = new Date(time).getTime() - (minutesBefore * 60 * 1000);
  const now = new Date().getTime();
  
  const delay = scheduleTime - now;

  if (delay > 0) {
    setTimeout(() => {
      new Notification(title, { body });
    }, delay);
    return true;
  }
  return false;
};

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return false;
  
  if (Notification.permission === "granted") return true;
  
  const permission = await Notification.requestPermission();
  return permission === "granted";
};
