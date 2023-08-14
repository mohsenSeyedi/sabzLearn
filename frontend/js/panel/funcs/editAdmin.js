import {getToken , showSwal } from "../../funcs/utils.js"

const editAdmin = async () => {

    const nameEditInput= document.querySelector("#name-edit")    
    const userNameEditInput= document.querySelector("#userName-edit")
    const eamilEditInput= document.querySelector("#eamil-edit")
    const passwordEditInput= document.querySelector("#password-edit")
    const phoneEditInput= document.querySelector("#phone-edit")
    
    const editAdminInfo = {
        name : nameEditInput.value.trim(),
        username : userNameEditInput.value.trim(), 
        email : eamilEditInput.value.trim(),
        password : passwordEditInput.value.trim(),
        phone : phoneEditInput.value.trim(),
    }

    const res = await fetch("http://localhost:4000/v1/users/" , {
        method : "PUT",
        headers : {
            Authorization : `Bearer ${getToken()}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(editAdminInfo)
    })

    const result = await res.json()

    console.log(res);
    console.log(result);
    if(res.ok) {
        showSwal(
            "مشخصات ادمین با موفقیت تغییر یافت",
            "success",
            "حله",
            () => {
                nameEditInput.value = ""
                userNameEditInput.value = ""
                eamilEditInput.value = ""
                passwordEditInput.value = ""               
                phoneEditInput.value = ""
                location.href = "../main/index.html"
            }
        )
    }
    else{
        showSwal(
            "لطفا فیلد ها را کامل پر کنید",
            "error",
            "باشه",
            () => {}
        )
    }
}

export{
    editAdmin
}