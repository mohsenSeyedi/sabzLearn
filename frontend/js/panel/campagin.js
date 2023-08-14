import { setCampagin } from "./funcs/campagin.js";


window.addEventListener("load" , () => {
    const setCampaginBtn = document.querySelector("#set-campagin-btn")

    setCampaginBtn.addEventListener("click" , event => {
        event.preventDefault()
        setCampagin()
    })
})