import { getAdminInfos  , logout} from "./funcs/utils.js";
import { insertNotificationModleListElem , seenNotification } from "./funcs/notifications.js";

window.seenNotification = seenNotification

window.addEventListener("load" , () => {
    const adminName = document.querySelector("#admin-name")
    const notificationIcon = document.querySelector("#notification-icon")
    const homeNotificationModalElem = document.querySelector(".home-notification-modal")
    const logoutBtn = document.querySelector("#logout-btn")

    getAdminInfos().then(admin => {
        console.log(admin);

        if(admin.role === "ADMIN") {
            adminName.innerHTML = admin.name
        }
        else{
            location.replace("../../login.html")
        }


        // handling-notification

        notificationIcon.addEventListener("mouseenter" , () => {
            homeNotificationModalElem.classList.add("active-modal-notfication")
        })
        homeNotificationModalElem.addEventListener("mouseleave" , () => {
            homeNotificationModalElem.classList.remove("active-modal-notfication")
        })

       insertNotificationModleListElem(admin.notifications)
     
    })

    
    logoutBtn.addEventListener("click" , () => {
        logout()
    })
})

