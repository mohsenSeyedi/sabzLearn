import { getAllShowCategories , createNewCategory , removeCategory} from "./funcs/categories.js";

window.removeCategory = removeCategory
window.addEventListener("load" , () => {

    const categoryBtn = document.querySelector("#category-btn")
    getAllShowCategories()

    categoryBtn.addEventListener("click" , event => {
        event.preventDefault()
        createNewCategory()
    })
})