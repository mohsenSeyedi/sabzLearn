import { getToken , showSwal } from "../../funcs/utils.js"


const getAllShowCategories = async () => {

    const tableCategoriesContainer = document.querySelector("#table-categories-container")

    const res = await fetch("http://localhost:4000/v1/category")
    const categories = await res.json()
    

    tableCategoriesContainer.innerHTML = ""
    categories.forEach((category , index )=> {

        tableCategoriesContainer.insertAdjacentHTML("beforeend" , `
             <tr>
                 <td>${index + 1}</td>
                 <td>${category.name}</td>
                 <td id="name">
                   <a href="#">${category.title}</a>
                 </td>
                 <td>
                     <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                 </td>
                 <td>
                     <button type="button" class="btn btn-danger" id="delete-btn" onclick="removeCategory('${category._id}')">حذف</button>
                 </td>
             </tr>
        `)

    })
    console.log(categories);
}


const createNewCategory = async () => {

    const categoryTitleInput = document.querySelector("#category-title-input")
    const categoryNameInput = document.querySelector("#category-name-input")
    

    const newCategory = {
        title : categoryTitleInput.value.trim(),
        name : categoryNameInput.value.trim()
    }

    const res = await fetch("http://localhost:4000/v1/category" , {
        method : "POST",
        headers : {
            Authorization : `Bearer ${getToken()}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(newCategory)
    })

    const result = await res.json()

    if(res.ok) {
        showSwal(
            "دسته بندی جدید با موفقیت ساخته شد",
            "success" , 
            "حله" ,
            () => {
                getAllShowCategories()
                categoryNameInput.value = ""
                categoryTitleInput.value = ""
            }
        )
    }
    else{
        showSwal(
            "لطفا فیلد ها را خالی نگذارید !",
            "error" , 
            "تصحیح اطلاعات" ,
            () => {}
        )
    }

    console.log(res);
    console.log(result);
}


const removeCategory = async (categoryId) => {
    showSwal(
        "ایا از حذف دسته بندی مورد نظر اطمینان دارید ؟",
        "warning" ,
        "بله اطمینان دارم",
        async (result) => {
            if(result) {
                const res = await fetch(`http://localhost:4000/v1/category/${categoryId}` , {
                    method : "DELETE" ,
                    headers : {
                        Authorization : `Bearer ${getToken()}`
                    }
                })
                

                if(res.ok) {
                    showSwal(
                        "دسته بندی مورد نظر با موفقیت حذف شد",
                        "success" , 
                        "حله" ,
                        () => {
                            getAllShowCategories()
                        }
                    )
                }
               
            }
        }
    )
}

export {getAllShowCategories , createNewCategory , removeCategory}