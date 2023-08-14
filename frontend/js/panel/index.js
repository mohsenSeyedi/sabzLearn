import { getAdminInfos , logout } from "./funcs/utils.js";
import { insertNotificationModleListElem , seenNotification } from "./funcs/notifications.js";
import { getToken } from "../funcs/utils.js";

window.seenNotification = seenNotification

window.addEventListener("load" , () => {
    const adminName = document.querySelector("#admin-name")
    const adminWelcomeName = document.querySelector("#admin-welcome-name")
    const notificationIcon = document.querySelector("#notification-icon")
    const homeNotificationModalElem = document.querySelector(".home-notification-modal")
    const logoutBtn = document.querySelector("#logout-btn")
    
    getAdminInfos().then(admin => {
        

        if(admin.role === "ADMIN") {
            adminName.innerHTML = admin.name
            adminWelcomeName.innerHTML = admin.name
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
    adminPanelHomePageInformation()
})


const adminPanelHomePageInformation = async () =>{

    const tableListUser = document.querySelector("#table-list-user")
    const infosPageContainer = document.querySelector("#infos-page-container")
    const res = await fetch("http://localhost:4000/v1/infos/p-admin" , {
        headers : {
            Authorization : `Bearer ${getToken()}`
        }
    })
    const infos = await res.json()

    console.log(infos);
    infos.lastUsers.forEach((user , index) => {
        tableListUser.insertAdjacentHTML("beforeend" , `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${user.role}</td>
            </tr>
        `)
    })

    infos.infos.forEach(info => {
        infosPageContainer.insertAdjacentHTML("beforeend" , `
            <div class="col-4">
                <div class="home-content-revanue box">
                    <div class="home-box">
                        <div class="home-box-left">
                            <div class="home-box-title">
                                <span>${info.title}</span>
                            </div>
                            <div class="home-box-value">
                                <div class="home-box-price">
                                    <span>${info.count}</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    })
}