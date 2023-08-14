import {getToken , showSwal } from "../../funcs/utils.js"


const getShowAllCourses = async () => {

    const tableCourseContainer = document.querySelector("#table-course-container")
    const res = await fetch("http://localhost:4000/v1/courses")
    const courses= await res.json()

    tableCourseContainer.innerHTML = ""
    courses.forEach((course , index) => {

        tableCourseContainer.insertAdjacentHTML("beforeend" , `
        <tr>
            <td>${index + 1}</td>
            <td>${course.name}</td>
            <td id="name">
              <a href="#">${course.categoryID.title}</a>
            </td>
            <td id="number">${course.registers}</td>
            <td id="condition">${course.isComplete === 0 ? "در حال برگذاری" : "به اتمام رسیده"}</td>
            <td id="price">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</td>
            <td>
                <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" id="delete-btn" onclick="removeCourse('${course._id}')">حذف</button>
            </td>
        </tr>
    `)
    })


}

let categoryID = -1
let status = "start"
let courseCover = null

const preparaCreateNewCourseForm = async () => {
    const categoryList =document.querySelector(".category-list")
    const presell=document.querySelector("#presell")
    const start=document.querySelector("#start")
    const file=document.querySelector("#file")

    const res = await fetch("http://localhost:4000/v1/category") 
    const categoryes = await res.json()

    

    categoryes.forEach(category => {
        categoryList.insertAdjacentHTML("beforeend" , `
            <option value="${category._id}">${category.title}</option>
        `)
    })

    categoryList.addEventListener("change" , event => {
        categoryID = event.target.value
        console.log(categoryID);
    })

    presell.addEventListener("change", event => {
        status = event.target.value
        console.log(status);
    })

    start.addEventListener("change", event => {
        status = event.target.value
        console.log(status);
    })

    file.addEventListener("change" , event => {
        
        courseCover =event.target.files[0]
    })

}

const createNewCourse = async () => {
    const courseNameInput = document.querySelector("#course-name")
    const coursePriceInput = document.querySelector("#course-price")
    const courseDescriptionInput = document.querySelector("#course-description")
    const courseShortNameInput = document.querySelector("#course-shortName")
    const courseSupportInput = document.querySelector("#course-support")


    const formData = new FormData()

    formData.append("name" , courseNameInput.value.trim())
    formData.append("description" , courseDescriptionInput.value.trim())
    formData.append("shortName" , courseShortNameInput.value.trim())
    formData.append("categoryID" , categoryID)
    formData.append("price" , coursePriceInput.value.trim())
    formData.append("support" , courseSupportInput.value.trim())
    formData.append("status" , status)
    formData.append("cover" , courseCover)


    const res = await fetch("http://localhost:4000/v1/courses" , {
        method : "POST" , 
        headers: {
            Authorization : `Bearer ${getToken()}`
        },
        body : formData
    })

    if(res.status === 201){
        showSwal(
        "دوره با موفقیت ایجاد شد",
         "success",
          "حله",
          () => {getShowAllCourses()})
    }
    else{
        showSwal("لطفا همه فیلد هارا با دقت پر کنید !", "error" , "تصحیح اطلاعات" ,() => {})
    }


   
}

const removeCourse = async (courseID) => {

    showSwal(
        "ایا از حذف دوره مطمئن هستید ؟" ,
        "warning",
         "بله مطمئن هستم",
         async (result) => {
            if(result) {
                const res = await fetch(`http://localhost:4000/v1/courses/${courseID}` , {
                    method : "DELETE" ,
                    headers : {
                        Authorization : `Bearer ${getToken()}`
                    }
                })
            
                const result = await res.json()
                
                if(res.ok){
                    showSwal(
                        "دوره با موفقیت حذف شد",
                         "success",
                          "حله",
                          () => {getShowAllCourses()})
                }
                
            }
         }
   
     )
 
}


export{
    getShowAllCourses,
    createNewCourse,
    preparaCreateNewCourseForm,
    removeCourse
}