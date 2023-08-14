import { editAdmin } from "./funcs/editAdmin.js";


window.addEventListener("load" , () => {
   
    const editAdminBtn = document.querySelector("#edit-admin-btn")

    editAdminBtn.addEventListener("click" , event => {
        event.preventDefault()
        editAdmin()
    })
})