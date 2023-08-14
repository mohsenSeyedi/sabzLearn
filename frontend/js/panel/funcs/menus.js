import {getToken , showSwal } from "../../funcs/utils.js"

const getAllShowMenus = async () => {

    const tableMenusContainer=document.querySelector("#table-menus-container")
    
    const res = await fetch("http://localhost:4000/v1/menus/all")
    const menus = await res.json()

    

    tableMenusContainer.innerHTML = ""
    menus.forEach((menu , index) => {
        tableMenusContainer.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${index + 1}</td>
                <td>${menu.title}</td>
                <td><a href="#">${menu.href}</a></td>
                ${menu.parent === undefined ?
                `<td>__</td>`:
                `<td>${menu.parent.title}</td>`}
                
                <td>
                    <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                    <button type='button' class='btn btn-danger delete-btn' onclick="removeMenu('${menu._id}')">حذف</button>
                </td>
            </tr>
        `)
    })


}

let parentMenu = undefined
const preparaCreateNewMenuForm = async () => {
    const menuList =document.querySelector("#menu-list")

    const res = await fetch("http://localhost:4000/v1/menus")
    const menus = await res.json()

    console.log(menus);

    menus.forEach(menu => {
        menuList.insertAdjacentHTML("beforeend" , `
           <option value="${menu._id}">${menu.title}</option>
        `)
    })

    menuList.addEventListener("change", event => {
        parentMenu = event.target.value
    })
}

const createNewMenu = async () => {

    const titleMenuInput = document.querySelector("#input-title-menu")
    const hrefMenuInput = document.querySelector("#input-href-menu")


    const newAddMune = {
        title : titleMenuInput.value.trim(),
        href : hrefMenuInput.value.trim(),
        parent : parentMenu     
    }

    console.log(newAddMune);

    const res = await fetch("http://localhost:4000/v1/menus" , {
        method : "POST" , 
        headers: {
            Authorization : `Bearer ${getToken()}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(newAddMune)
    })
    const result = await res.json()

    if(res.ok) {
        showSwal(
            "منو با موفقیت ایجاد شد",
            "success",
            "حله",
            () => {
                getAllShowMenus()
                titleMenuInput.value = ""
                hrefMenuInput.value = ""
            }
        )
    }
    else{
        showSwal(
            "لطفا فیلد ها را خالی نفرستید",
            "error",
            "تصحیح اطلاعات",
            () => {}
        )
    }
    console.log(res);
    console.log(result);
}

const removeMenu = async (menuId) => {

    showSwal(
        "ایا از حذف دوره منو هستید ؟" ,
        "warning",
         "بله مطمئن هستم",
          async (result) => {
            if(result){
                const res = await fetch(`http://localhost:4000/v1/menus/${menuId}` , {
                    method : "DELETE" , 
                    headers : {
                        Authorization : `Bearer ${getToken()}`
                    }
                })
            
                const result = await res.json()
             
                if(res.ok) {
                    showSwal(
                        "منو با موفقیت حذف شد",
                        "success",
                        "حله",
                        () => {
                            getAllShowMenus()
                        }
                    )
                }
            }
         })

  
}

export{
    getAllShowMenus,
    createNewMenu,
    preparaCreateNewMenuForm,
    removeMenu
}