import {getShowAllCourses , getShowAllArticles } from "./funcs/shared.js";

const titleSectionContent=document.querySelector(".title-section-content")


window.addEventListener("load" , () => {
    typeWrite()
    getShowAllCourses()
    getShowAllArticles()

    // Handling-Search
    const searchInput = document.querySelector("#input-search-large")
    const searchBtn = document.querySelector(".box-search .fa-magnifying-glass")
    searchBtn.addEventListener("click" , () => {
        window.location.href = `search.html?value=${searchInput.value.trim()}`
        searchInput.value = ""
     })

})


function typeWrite() {
    let titleIndex=-1
    let titleLandig="با آکادمی سبزلرن برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن"  
    let interval=setInterval(() => {
        titleIndex++
        titleSectionContent.innerHTML+=titleLandig[titleIndex]
        if(titleIndex === titleLandig.length-1) {
            clearInterval(interval)
        }
    },100)
}










