import { getShowAllCourses , createNewCourse , preparaCreateNewCourseForm , removeCourse } from "./funcs/courses.js"

window.removeCourse = removeCourse

window.addEventListener("load" , () => {
    const createCourseBtn =document.querySelector("#create-course-btn")
    getShowAllCourses()
    preparaCreateNewCourseForm()
   

    createCourseBtn.addEventListener("click" , event => {
        event.preventDefault()
        createNewCourse()
    })
})



