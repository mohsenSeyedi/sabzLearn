import {showSwal , isLogin} from "../../funcs/utils.js"
import { getMe } from "../../funcs/auth.js"

const logout = () => {

    showSwal(
        "آیا مطمئن هستید که میخواهید از حساب کاربری خود خارج شوید ؟",
        "warning",
        ["خیر","بله مطمئن"],
        (result) =>{
            if(result){
                showSwal(
                    "با موفقیت خارج شدید",
                    "success" ,
                    "رفتن به صفحه اصلی",
                    () => {
                        localStorage.removeItem("user")
                        location.href = "../../index.html"
                    }
                )
            }
        }
    )
}

const showNameUserAccount = () => {
    const sidebarName = document.querySelector(".sidebar__name")
    const isUserLogin = isLogin()
    if(isUserLogin) {
        getMe().then(data => {
            console.log(data);
            sidebarName .innerHTML = data.name
        })
    }
}

export {
    logout,
    showNameUserAccount
}