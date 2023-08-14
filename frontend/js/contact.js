import { submitContactUsMes } from "./funcs/shared.js";


const messageBtn=document.querySelector(".message-btn")

messageBtn.addEventListener("click" , event => {
    event.preventDefault()
    submitContactUsMes()
})