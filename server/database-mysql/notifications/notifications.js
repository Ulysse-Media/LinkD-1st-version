const { sql } = require("../config/db");


// Database function to insert new notification  //
const pushNotification = async (req) => {
    var query = `INSERT INTO notifications (notification_name, notification_sender, notification_recipient) values ('${req.notification_name}', ${req.notification_sender}, ${req.notification_recipient})`;
    try {
        let notification = await sql(query);
        return notification;
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve all notifications //
const getnotifications = async () => {
    var query = `Select * from notifications`;
    try {
        let notifications = await sql(query);
        return notifications;
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve all notifications //
const getnotificationByUserId = async (notification_recipient) => {
    var query = `Select * from notifications where notification_recipient='${notification_recipient}'`;
    try {
        let notifications = await sql(query);
        return notifications;
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    pushNotification,
    getnotifications,
    getnotificationByUserId,
}