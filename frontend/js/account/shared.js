import { logout , showNameUserAccount} from "./funcs/shared.js"


window.addEventListener("load" , () => {
    const logoutUser = document.querySelector("#logout-user")

    logoutUser.addEventListener("click" , event => {
        event.preventDefault()
        logout()
    })
    
    showNameUserAccount()
})