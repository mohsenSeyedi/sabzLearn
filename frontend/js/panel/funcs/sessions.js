import {getToken , showSwal } from "../../funcs/utils.js"

const getAllShowCoursesSessions = async () => {

    const tableSessionsContainer = document.querySelector("#table-sessions-container")

    const res = await fetch("http://localhost:4000/v1/courses/sessions")

    const sessions = await res.json()

    console.log(sessions);
    sessions.forEach((session , index) => {
        tableSessionsContainer.insertAdjacentHTML("beforeend" , `
           <tr>
               <td >${index + 1}</td>
               <td >${session.title}</td>
               <td >${session.time}</td>
               <td >${session.course === null ? "__" :session.course.name}</td>
               <td>
                   <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
               </td>
               <td>
                   <button type="button" class="btn btn-danger" id="delete-btn">حذف</button>
               </td>
           </tr>
        `)
    })
}

let courseId = null
let isFree = 0
let sessionVideo = null
const preparaCreateNewSessionForm = async () => {
    const courseList =document.querySelector("#course-list")
    const free = document.querySelector("#free")
    const nonFree = document.querySelector("#non-free") 
    const fileSession = document.querySelector("#file-session") 

    const res = await fetch("http://localhost:4000/v1/courses")
    const courses = await res.json()

    console.log(courses);

    courses.forEach(course => {
        courseList.insertAdjacentHTML("beforeend" , `
           <option value="${course._id}">${course.name}</option>
        `)
    })

    courseList.addEventListener("change" , event => {
        courseId = event.target.value
    })

    free.addEventListener("change" , event => {
        isFree = event.target.value
    })

    nonFree.addEventListener("change" , event => {
        isFree = event.target.value
    })

    fileSession.addEventListener("change", event => {
        sessionVideo = event.target.files[0]
    })
    
}
   

const addNewCourseSession = async  () => {

    
    
    const sessionTitleInput = document.querySelector("#session-title-input")  
    const sessionTimeInput = document.querySelector("#session-time-input")    
     
    const formData = new FormData()

    formData.append("title" , sessionTitleInput.value.trim())
    formData.append("time" , sessionTimeInput.value.trim())
    formData.append("video" , sessionVideo)
    formData.append("free" , isFree)



    const res = await fetch(`http://localhost:4000/v1/courses/${courseId}/sessions` , {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
    })

    const result = await res.json()

    console.log(result);
    console.log(res);
    if(res.ok) {
        showSwal(
            "جلسه جدید با موفقیت ساخته شد",
            "success",
            "حله" ,
            () =>{
                console.log(res.status);
            }
           
        )
    }
    else if(res.status === 400){
        showSwal(
            "مشکلی پیش آمد",
            "error",
            "حله" ,
            () =>{}
        )
    }

}

export {
    getAllShowCoursesSessions,
    preparaCreateNewSessionForm,
    addNewCourseSession
}
