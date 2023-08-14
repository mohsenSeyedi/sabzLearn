import { getShowCategoryCourses  } from "./funcs/shared.js";
// import { pagination } from "./funcs/utils.js";

window.addEventListener("load" , () => {
    getShowCategoryCourses().then(date => {
        console.log(date);
        const paginationNumbersWrapper = document.querySelector(".pagination-numbers")
        
        // console.log(pagination([...data] , 3 , paginationNumbersWrapper , 1)); 

    })
})
