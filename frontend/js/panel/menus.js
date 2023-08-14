import { getAllShowMenus , createNewMenu , preparaCreateNewMenuForm , removeMenu} from "./funcs/menus.js";

window.removeMenu = removeMenu

window.addEventListener("load" , () => {
    const createMenuBtn=document.querySelector("#create-menu-btn")
    getAllShowMenus()
    preparaCreateNewMenuForm()

    createMenuBtn.addEventListener("click" , event => {
        event.preventDefault()
        createNewMenu()
    })
})