const admin = require('../config/firebase');

exports.sendNotification = async (token, title, body, data = {}) => {
  try {
    if (!token) {
      console.log("❌ No FCM token");
      return;
    }

    const message = {
      token,
      notification: {
        title,
        body,
      },
      data: Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, String(v)])
      ),
    };

    const response = await admin.messaging().send(message);

    console.log("✅ Notification sent:", response);
    return response;

  } catch (error) {
    console.log("❌ Notification error:", error.message);
  }
};