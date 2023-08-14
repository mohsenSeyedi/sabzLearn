import { getToken, showSwal } from "../../funcs/utils.js"

const getAdminInfos = async () => {

    const res = await fetch("http://localhost:4000/v1/auth/me" , {
        headers: {
            Authorization : `Bearer ${getToken()}`
        }
    })

    const admin = await res.json()
    return admin
    
}

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
    // localStorage.clear()  
}


export {
    getAdminInfos,
    logout
}