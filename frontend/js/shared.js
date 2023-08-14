import { showUserNameInNavbar , getShowNavbarMenus ,getPageInformation } from "./funcs/shared.js";


window.addEventListener("load" , () => {
  showUserNameInNavbar()
  getShowNavbarMenus()
  getPageInformation()

})