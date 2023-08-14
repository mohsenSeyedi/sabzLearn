import {getToken} from "../../funcs/utils.js"


const getShowUserBuyedCourses = async () => {

    const coursesUserContainer = document.querySelector("#courses-user-container")
    const courseFilterLinks = document.querySelectorAll(".course-filter-link")
    const res = await fetch("http://localhost:4000/v1/users/courses/" ,{
        headers : {
            Authorization : `Bearer ${getToken()}`
        }
    })
    const courses = await res.json()

  
    if(courses.length) {
        courses.forEach(course => {
            coursesUserContainer.insertAdjacentHTML("beforeend" , `
                <div class="main__box">
                    <div class="main__box-right">
                        <a class="main__box-img-link" href="#">
                            <img class="main__box-img img-fluid"
                                src="http://localhost:4000/courses/covers/${course.course.cover}">
                        </a>
                    </div>
                    <div class="main__box-left">
                        <a href="#" class="main__box-title">${course.course.name}</a>
                        <div class="main__box-bottom">
                            <div class="main__box-all">
                                <span class="main__box-all-text">مبلغ :</span>
                                <span class="main__box-all-value">${course.price === 0 ? "رایگان" : course.price.toLocaleString()+" تومان"}</span>
                            </div>
                            <div class="main__box-completed">
                                <span class="main__box-completed-text">وضیعبت :</span>
                                <span class="main__box-completed-value">${course.course.isComplete === 1 ? "تکمیل شده" : "در حال برگذاری"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        })
    }
    else{
        coursesUserContainer.insertAdjacentHTML("beforeend" , `
          <div class="alert alert-danger">شما تا به حال در دوره ای ثبت نام نکرده اید !</div>
        `)
    }

    courseFilterLinks.forEach(filterLink => {
        filterLink.addEventListener("click" , event => {
            event.preventDefault()
            let filterData = event.target.dataset.filter
        
            
            courseFilterLinks.forEach(filterLink => filterLink.classList.remove("courses-header__link-active"))
            event.target.classList.add("courses-header__link-active")


            switch(filterData) {
                case "free" :{
                    const freeCourses = [...courses].filter(course => course.course.price === 0)
                    coursesUserContainer.innerHTML = ""
                    freeCourses.forEach(course => {
                        coursesUserContainer.insertAdjacentHTML("beforeend" , `
                        <div class="main__box">
                            <div class="main__box-right">
                                <a class="main__box-img-link" href="#">
                                    <img class="main__box-img img-fluid"
                                        src="http://localhost:4000/courses/covers/${course.course.cover}">
                                </a>
                            </div>
                            <div class="main__box-left">
                                <a href="#" class="main__box-title">${course.course.name}</a>
                                <div class="main__box-bottom">
                                    <div class="main__box-all">
                                        <span class="main__box-all-text">مبلغ :</span>
                                        <span class="main__box-all-value">${course.price === 0 ? "رایگان" : course.price.toLocaleString()+" تومان"}</span>
                                    </div>
                                    <div class="main__box-completed">
                                        <span class="main__box-completed-text">وضیعبت :</span>
                                        <span class="main__box-completed-value">${course.course.isComplete === 1 ? "تکمیل شده" : "در حال برگذاری"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
                    })
                    break;
                }
                case "money" : {
                    const moneyCourses = [...courses].filter(course => course.course.price !== 0)
                    coursesUserContainer.innerHTML = ""
                    moneyCourses.forEach(course => {
                    
                        coursesUserContainer.insertAdjacentHTML("beforeend" , `
                        <div class="main__box">
                            <div class="main__box-right">
                                <a class="main__box-img-link" href="#">
                                    <img class="main__box-img img-fluid"
                                        src="http://localhost:4000/courses/covers/${course.course.cover}">
                                </a>
                            </div>
                            <div class="main__box-left">
                                <a href="#" class="main__box-title">${course.course.name}</a>
                                <div class="main__box-bottom">
                                    <div class="main__box-all">
                                        <span class="main__box-all-text">مبلغ :</span>
                                        <span class="main__box-all-value">${course.price === 0 ? "رایگان" : course.price.toLocaleString()+" تومان"}</span>
                                    </div>
                                    <div class="main__box-completed">
                                        <span class="main__box-completed-text">وضیعبت :</span>
                                        <span class="main__box-completed-value">${course.course.isComplete === 1 ? "تکمیل شده" : "در حال برگذاری"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
                    })
                    break;
                }
                default : {
                    coursesUserContainer.innerHTML = ""
                    courses.forEach(course => {
                        coursesUserContainer.insertAdjacentHTML("beforeend" , `
                            <div class="main__box">
                                <div class="main__box-right">
                                    <a class="main__box-img-link" href="#">
                                        <img class="main__box-img img-fluid"
                                            src="http://localhost:4000/courses/covers/${course.course.cover}">
                                    </a>
                                </div>
                                <div class="main__box-left">
                                    <a href="#" class="main__box-title">${course.course.name}</a>
                                    <div class="main__box-bottom">
                                        <div class="main__box-all">
                                            <span class="main__box-all-text">مبلغ :</span>
                                            <span class="main__box-all-value">${course.price === 0 ? "رایگان" : course.price.toLocaleString()+" تومان"}</span>
                                        </div>
                                        <div class="main__box-completed">
                                            <span class="main__box-completed-text">وضیعبت :</span>
                                            <span class="main__box-completed-value">${course.course.isComplete === 1 ? "تکمیل شده" : "در حال برگذاری"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `)
                    })
                }
            }
        })
    })


  
}

export {
    getShowUserBuyedCourses
}

