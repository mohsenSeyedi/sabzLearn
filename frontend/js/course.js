import { getShowCourseDetails , getShowRelatedCourses ,submitComment , registerCourse} from "./funcs/shared.js";


window.registerCourse = registerCourse
window.addEventListener("load" , () => {
    getShowCourseDetails()
    getShowRelatedCourses()

    const commentBtn = document.querySelector(".comment-btn")
    commentBtn.addEventListener("click" , event => {
        event.preventDefault()
        submitComment()
    })
    
})

