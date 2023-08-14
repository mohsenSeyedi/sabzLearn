import {getToken, showSwal} from "../../funcs/utils.js"


const getAndShowUserInfosEditPage = async () => {

    const editPhoneInput = document.querySelector("#edit-phone")
    const editNameInput = document.querySelector("#edit-name")    
    const editUserNameInput = document.querySelector("#edit-userName")
    const editEmailInput = document.querySelector("#edit-email")

    const res = await fetch("http://localhost:4000/v1/auth/me" , {
        headers : {
            Authorization : `Bearer ${getToken()}`
        },
    })
    const infos = await res.json()

    console.log(infos);

   editPhoneInput.value = infos.phone
   editNameInput.value = infos.name
   editUserNameInput.value = infos.username
   editEmailInput.value = infos.email
}


const editUser = async () => {
    const editPhoneInput = document.querySelector("#edit-phone")
    const editNameInput = document.querySelector("#edit-name")    
    const editUserNameInput = document.querySelector("#edit-userName")
    const editPasswordInput = document.querySelector("#edit-password")
    const editEmailInput = document.querySelector("#edit-email")

    const editUserInfos = {       
        name : editNameInput.value.trim(),
        username : editUserNameInput.value.trim(),
        email : editEmailInput.value.trim(),
        password : editPasswordInput.value.trim(),
        phone : editPhoneInput.value.trim(),
    }


    const res = await fetch("http://localhost:4000/v1/users" ,{
        method :   "PUT" ,
        headers : {
            Authorization : `Bearer ${getToken()}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(editUserInfos)
    })
    const result = await res.json()

    console.log(result);
    console.log(res);
    if(res.ok) {
        showSwal(
            "مشخصات کاربری شما با موفقیت تغییر یافت",
            "success",
            "حله",
            () => {
                location.href = "../account/index.html"
            }
        )
    }
    else{
        showSwal(
            "لطفا فیلد ها را خالی نفرستید",
            "error",
            "باشه",
            () => {}
        )
    }
}

export {
    getAndShowUserInfosEditPage,
    editUser
}