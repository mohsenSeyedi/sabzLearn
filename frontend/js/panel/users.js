import { getAllShowUsers , removeUser , banUser , addNewUser , changeRoleUser} from "./funcs/users.js";

window.removeUser = removeUser
window.banUser = banUser
window.changeRoleUser = changeRoleUser
window.addEventListener("load", () => {

    const addUserBtn = document.querySelector("#add-User-btn")
    getAllShowUsers()

    addUserBtn.addEventListener("click" , event => {
        event.preventDefault()
        addNewUser()
    })
})