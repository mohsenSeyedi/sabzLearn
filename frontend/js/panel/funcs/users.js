import {getToken , showSwal } from "../../funcs/utils.js"

const getAllShowUsers = async () => {

    const tableUsersContainer = document.querySelector("#table-users-container")
    const res = await fetch ("http://localhost:4000/v1/users" , {
        headers: {
            Authorization : `Bearer ${getToken()}`
        }
    })
    const users = await res.json()

    tableUsersContainer.innerHTML = ""
    users.forEach((user , index) => {
        tableUsersContainer.insertAdjacentHTML("beforeend" , `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.role === 
                "ADMIN"? "مدیر" : "کاربر "}</td>
          
            <td>
                <button type='button' class='btn btn-primary edit-btn' onclick="changeRoleUser('${user._id}')">تغییر نقش</button>
            </td>
            <td>
                <button type='button' class='btn btn-danger delete-btn' onclick="removeUser('${user._id}')">حذف</button>
            </td>
            <td>
                <button type='button' class='btn btn-danger ban-btn' onclick="banUser('${user._id}')">بن</button>
            </td>
        </tr>
        `)
    })

    console.log(users);
}

const addNewUser = async () => {

    const nameInput = document.querySelector("#name-input")
    const userNameInput = document.querySelector("#userName-input")
    const emailInput = document.querySelector("#email-input")
    const passwordInput = document.querySelector("#password-input")
    const phoneInput = document.querySelector("#phone-input")


    const newUserInfos= { 
        name:nameInput.value.trim(),
        phone:phoneInput.value.trim(),     
        username:userNameInput.value.trim(),
        email:emailInput.value.trim(),
        password:passwordInput.value.trim(),
        confirmPassword:passwordInput.value.trim()      
    }

    if(nameInput.value.length < 3  
        || phoneInput.value.length < 11 
          || userNameInput.value.length < 3 
            || emailInput.value.length < 11 
              || passwordInput.value.length < 8){
                showSwal("لطفا مقادیر فیلد ها را به درستی وارد کنید","error","تصحیح اطلاعات", ()=> {})
              }
              else{
                const res = await fetch("http://localhost:4000/v1/auth/register" , {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUserInfos)
                })
                const result = await res.json()
                console.log(result);
                if(res.status === 201) {
                    showSwal("کاربر جدید با موفقیت ثبت شد","success","حله",() => {getAllShowUsers()})
                       nameInput.value = ""
                       userNameInput.value = ""          
                       emailInput.value = ""
                       passwordInput.value = ""
                       phoneInput.value = ""
                }
                else if(res.status === 409) {
                    showSwal("نام کاربری یا ایمیل قبلا ثبت شده است","error","تصحیح اطلاعات", ()=> {})
                }
                else if(res.status === 403) {
                    showSwal("متاسفانه این شماره تلفن توسط مدیر بن شده است","error","تصحیح اطلاعات", ()=> {})
                }
              }

}

const removeUser = async (userId) => {
    showSwal(
        "آیا از حذف کاربر مطمئن هستید ؟",
        "warning" ,
        "بله مطمئن هستم",
        async (result) => {
            if(result) {
                const res = await fetch(`http://localhost:4000/v1/users/${userId}` , {
                    method : "DELETE",
                    headers: {
                        Authorization : `Bearer ${getToken()}`
                    }
                })
                const resultRemove = await res.json()

                console.log(res);

                if(res.ok) {
                    showSwal(
                        "کاربر مورد نظر با موفقیت حذف شد",
                        "success",
                        "حله",
                        () => {
                            getAllShowUsers()
                        }
                    )
                }
            }
        }
    )
}

const banUser = async (userId) => {

    showSwal(
        "آیا از بن کردن کاربر مطمئن هستید ؟",
        "warning" ,
        "بله مطمئن هستم",
        async (result) => {
            if(result) {
                const res = await fetch(`http://localhost:4000/v1/users/ban/${userId}` , {
                    method : "PUT",
                    headers: {
                        Authorization : `Bearer ${getToken()}`
                    }
                })
                const resultRemove = await res.json()

                console.log(res);

                if(res.ok) {
                    showSwal(
                        "کاربر مورد نظر با موفقیت بن شد",
                        "success",
                        "حله",
                        () => {
                            getAllShowUsers()
                        }
                    )
                }
            }
        }
    )
}

const changeRoleUser = async (userId) => {
    console.log(userId);
    swal({
        title : "نقش جدید را وارد کنید : USER || ADMIN",
        content : "input",
        buttons : [ "خروج", "تایید"]
    })
    .then(async body => {
        if(body) {

            const newRoleUser = {
                role : body.trim(),
                id : userId 
            }
            console.log(body);
            const res = await fetch("http://localhost:4000/v1/users/role" , {
                method : "PUT" ,
                headers : {
                    Authorization : `Bearer ${getToken()}`,
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(newRoleUser)
            })
            const result = await res.json()

            console.log(res);
            console.log(result);
        }
    })
}



export{
    getAllShowUsers,
    removeUser,
    banUser,
    addNewUser,
    changeRoleUser
}