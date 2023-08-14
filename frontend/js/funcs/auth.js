import { showSwal , saveIntoLocalStorage , getToken  } from "./utils.js"

const register = () => {
    const nameInput=document.querySelector("#name")
    const phoneInput=document.querySelector("#phone")
    const usernameInput=document.querySelector("#username")    
    const emailInput=document.querySelector("#email")
    const passwordInput=document.querySelector("#password")
   
    const newUserInfos= { 
        name:nameInput.value.trim(),
        phone:phoneInput.value.trim(),     
        username:usernameInput.value.trim(),
        email:emailInput.value.trim(),
        password:passwordInput.value.trim(),
        confirmPassword:passwordInput.value.trim()      
    }

    if(nameInput.value.length < 3  
        || phoneInput.value.length < 11 
          || usernameInput.value.length < 3 
            || emailInput.value.length < 11 
              || passwordInput.value.length < 8) {
                showSwal("لطفا مقادیر فیلد ها را به درستی وارد کنید","error","تصحیح اطلاعات", ()=> {})
    }
    else{

        fetch("http://localhost:4000/v1/auth/register" , {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserInfos)
    })
    .then(res => {
        console.log(res);
        if(res.status === 201) {
          showSwal("با موفقیت ثبت نام شدید","success","ورد به پنل کاربری",() => {window.location.href="index.html"})
        }
        else if(res.status === 409) {
            showSwal("نام کاربری یا ایمیل قبلا وارد شده است","error","تصحیح اطلاعات", ()=> {})
        }
        else if(res.status === 403) {
            showSwal("متاسفانه این شماره تلفن توسط مدیر بن شده است","error","تصحیح اطلاعات", ()=> {})
        }
        return res.json()
    })
    .then(result => {
        console.log(result);
        saveIntoLocalStorage("user", {token : result.accessToken})
    })

    }


    
}


const login = () => {
    
    const identifierInput=document.querySelector("#identifier")
    const passwordInput=document.querySelector("#password")


    const userInfos = {
        identifier : identifierInput.value.trim(),
        password : passwordInput.value.trim()
    }

    if(identifierInput.value.length < 5 || passwordInput.value.length < 8) {
        showSwal("لطفا مقادیر فیلد ها را به درستی وارد کنید","error","تصحیح اطلاعات", ()=> {})
    }
    else{
        fetch("http://localhost:4000/v1/auth/login" , {

        method : "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body : JSON.stringify(userInfos)
    })
    .then(res => {
        console.log(res);
        if(res.status === 200) {
            showSwal("با موفقیت وارد شدید","success","ورد به پنل کاربری",() => {window.location.href="index.html"})
        }
        else if(res.status === 401) {
            showSwal("نام کاربری یا ایمیل وجود ندارد","error","تصحیح اطلاعات",() => {})
        }
       return res.json()
    })
    .then(result => {
        console.log(result);
        saveIntoLocalStorage("user", {token : result.accessToken})
    })

    }



}


const getMe = async () => {

    const token = getToken()

    if(!token) {
        return false
    }

    const res = await fetch(`http://localhost:4000/v1/auth/me` , {
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    
    const data = await res.json()
    return data
}



export {register , login , getMe }