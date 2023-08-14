import { getAllShowCoursesSessions , preparaCreateNewSessionForm , addNewCourseSession } from "./funcs/sessions.js";


window.addEventListener("load" , () => {

    const addSessionBtn = document.querySelector("#add-session-btn")

    getAllShowCoursesSessions()
    preparaCreateNewSessionForm()

    addSessionBtn.addEventListener("click" , event => {
        event.preventDefault()
        addNewCourseSession()
    })
})