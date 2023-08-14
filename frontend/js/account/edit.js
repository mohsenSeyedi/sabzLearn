import {getAndShowUserInfosEditPage, editUser } from "./funcs/edit.js";

window.addEventListener("load" , () => {

    const editBtn = document.querySelector(".edit__btn")

    getAndShowUserInfosEditPage()
    
    editBtn.addEventListener("click" , event => {
        event.preventDefault()
        editUser()
    })
})