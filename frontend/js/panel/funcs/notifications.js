import { getToken } from "../../funcs/utils.js";


const insertNotificationModleListElem = (notifications) => {

    const homeNotificationModalList = document.querySelector(".home-notification-modal-list")

     homeNotificationModalList.innerHTML = ''
    if(notifications.length) {
        notifications.forEach(notification => {
            console.log(notification._id);
            homeNotificationModalList.insertAdjacentHTML("beforeend" , `
               <li class="home-notification-modal-item">
                   <span class="home-notification-modal-text">${notification.msg}</span>
                   <a onclick='seenNotification(${JSON.stringify(notifications)}, ${JSON.stringify(notification._id)})'>دیدم</a>
               </li>
            `)
        })
    }
    else{
        homeNotificationModalList.insertAdjacentHTML("beforeend" , `
           <li class="home-notification-modal-item alert alert-danger">
              <span class="home-notification-modal-text">شما اطلاعیه ندارید</span>
           </li>
        `)
    }
   
}

const seenNotification = async (notifications , notificationID) => {

    const res = await fetch(`http://localhost:4000/v1/notifications/see/${notificationID}` , {
        method : "PUT" ,
        headers : {
            Authorization : `Bearer ${getToken()}`
        }
    })

    removeNotification(notifications , notificationID)

    const result = await res.json()

}


const removeNotification = (notifications , notificationID) => {

    const filteredNotifications = notifications.filter(notification => notification._id !== notificationID)

    insertNotificationModleListElem(filteredNotifications)
}


export {
    insertNotificationModleListElem,
    seenNotification
}