import { getMe } from "./auth.js";
import { isLogin , getUrlParams, getToken ,showSwal } from "./utils.js";

const showUserNameInNavbar = () => {

    const navbarProfileBox = document.querySelector(".nav__bar__link__profile")
    const isUserLogin = isLogin()
    if(isUserLogin) {
        getMe().then(date => {
          
            navbarProfileBox.setAttribute("href" , "my-account/Account")
            navbarProfileBox.innerHTML = `
            <div class="box-profile">
            <span class="nav__bar__link-profile-text">${date.name}</span>
            <i class="fa-solid fa-user"></i>
         </div>
         <div class="box-profile-small">
            <i class="fa-solid fa-user"></i>
         </div>
            <ul class="nav__bar__dropdown">
                <li class="nav__bar__dropdown-item">
                    <a href="#" class="nav__bar__dropdown_link">پیشخوان</a>
                </li>
                <li class="nav__bar__dropdown-item">
                    <a href="#" class="nav__bar__dropdown_link">سفارش ها</a>
                </li>
                <li class="nav__bar__dropdown-item">
                    <a href="#" class="nav__bar__dropdown_link">کیف پول من</a>
                </li>
                <li class="nav__bar__dropdown-item">
                    <a href="#" class="nav__bar__dropdown_link">جزئیات حساب</a>
                </li>
                <li class="nav__bar__dropdown-item">
                    <a href="#" class="nav__bar__dropdown_link">دوره های خریداری شده</a>
                </li>
                <li class="nav__bar__dropdown-item">
                    <a href="#" class="nav__bar__dropdown_link">تیکت های پشتیبانی</a>
                </li>
            </ul>
            
            `
        })
    }
    else{
        navbarProfileBox.setAttribute("href" , "login.html")
        navbarProfileBox.innerHTML = `
        <div class="box-profile">
        <span class="nav__bar__link-profile-text">ورود / عضویت</span>
        <i class="fa-solid fa-user"></i>
     </div>
     <div class="box-profile-small">
        <i class="fa-solid fa-user"></i>
     </div>
        `
    }
}


const getShowAllCourses = async () => {

    const coursesContainer=document.querySelector(".courses-container")

    const res = await fetch("http://localhost:4000/v1/courses")
    const courses= await res.json()

   
    courses.forEach(course => {
        
       coursesContainer.insertAdjacentHTML("beforeend" , `

        <div class="course-box">
        ${
            course.discount > 0 && course.price ? `
            <div class="campagin">-${course.discount}%</div>
            ` : ``
        }
           
           <a  href=course.html?name=${course.shortName}>
               <img src="http://localhost:4000/courses/covers/${course.cover}" alt="" class="course-box-img">
           </a>
           <div class="course-box__title-wrapper">
               <p class="course-box__category">${course.categoryID.title}</p>
               <p><a href=course.html?name=${course.shortName} class="course-box__product-name">${course.name}</a></p>
           </div>
           <div class="course-box__price-student">
               <div class="course-box-price">
               ${
                course.discount > 0 ? 
                `<p class="course-price">${course.price.toLocaleString()} تومان</p>
                 <p class="price-campagin">${(course.price-(course.price * course.discount) / 100).toLocaleString()} تومان</p>` : 
                 `<p>${course.price.toLocaleString()} تومان</p>`
               }
               </div>
               <div class="course-box-student">
                   <span class="course-box-number-student">${course.registers}</span>
                   <span class="course-box-student-text">دانشجو</span>
               </div>
           </div>
        </div>
       
       `)  
    })



}


const getShowAllArticles = async () => {

    const articlesSwiperWrapper=document.querySelector("#articles-swiper-wrapper")

    const res = await fetch("http://localhost:4000/v1/articles")
    const articles = await res.json()


    articles.forEach(article => {
        articlesSwiperWrapper.insertAdjacentHTML("beforeend" , `
            <div class="swiper-slide">
                <div class="articles-box">
                    <a href="#">
                        <img src="http://localhost:4000/courses/covers/${article.cover}">
                        <p class="articles-box-label">  تست نفوذ و امنیت وب </p>
                        <h5 class="articles-box-title">${article.title}</h5>
                    </a>
                </div>
            </div>

        `)
    })
}


const getShowNavbarMenus = async () => {

    const navbarMenusWrapper=document.querySelector("#navbar-menus-wrapper")

    const res = await fetch("http://localhost:4000/v1/menus")
    const menus = await res.json()

    menus.splice(0,5).forEach((menu) => {
        navbarMenusWrapper.insertAdjacentHTML(
          "beforeend",
          `
        <li class="nav__bar__item">
        <a href=category.html?cat=${menu.href} class="nav__bar__link">${menu.title}
          ${
            menu.submenus.length !== 0 ?
            `<i class="fa-solid fa-angle-down icon-angle-navbar"></i>
            <ul class="nav__bar__dropdown">
            ${menu.submenus.map((submenu) => (
              `<li class="nav__bar__dropdown-item">
                <a href="#" class="nav__bar__dropdown_link">
                 ${submenu.title}
                </a>
              </li>`
            )).join('')}
            </ul>`
          : ''}
        </a>
      </li>
        `
        );
      });
    
      return menus;
}


const getShowCategoryCourses = async () => {

    const coursesContainerCategory=document.querySelector("#courses-container-category")
    const courseName= getUrlParams("cat").substring(15,25)

    const titleCategoryText=document.querySelector(".title-category-text")
    if(courseName === "frontend") {
        titleCategoryText.innerHTML="آموزش برنامه نویسی فرانت اند"
   }
   else if(courseName === "backend") {
       titleCategoryText.innerHTML="آموزش برنامه نویسی بک اند"
   }
   else if(courseName === "python") {
       titleCategoryText.innerHTML="آموزش پایتون" 
   }
   else if(courseName === "security") {
       titleCategoryText.innerHTML="آموزش امنیت" 
   }
   else if(courseName === "softskills") {
       titleCategoryText.innerHTML="آموزش مهارت های نرم"
   }
   else{
    titleCategoryText.innerHTML=""
   }
    
    const res = await fetch(`http://localhost:4000/v1/courses/category/${courseName}`)
    const courses = await res.json()


    if(courses.length === 0) {
        coursesContainerCategory.innerHTML= `<h1 class="courses-container-category__text">هیچ دوره ای ثبت نشده است!</h1>`
        return false
    }

    courses.forEach(course => {

    coursesContainerCategory.insertAdjacentHTML("beforeend" , `
            <div class="course-box">
            ${
                course.discount > 0 && course.price ? `
                <div class="campagin">-${course.discount}%</div>
                ` : ``
            }
                <a href="course.html?name=${course.shortName}">
                     <img src="http://localhost:4000/courses/covers/${course.cover}" alt="" class="course-box-img">
                </a>
                <div class="course-box__title-wrapper">
                     <p class="course-box__category">برنامه نویسی فرانت اند</p>
                     <p><a href="course.html?name=${course.shortName}" class="course-box__product-name">${course.name}</a></p>
                </div>
                <div class="course-box__price-student">
                     <div class="course-box-price">
                     ${
                        course.discount > 0 ? 
                        `<p class="course-price">${course.price.toLocaleString()} تومان</p>
                         <p class="price-campagin">${(course.price-(course.price * course.discount) / 100).toLocaleString()} تومان</p>` : 
                         `<p>${course.price.toLocaleString()} تومان</p>`
                       }
                     </div>
                     <div class="course-box-student">
                         <span class="course-box-number-student">${course.registers}</span>
                         <span class="course-box-student-text">دانشجو</span>
                     </div>
                </div>
            </div>
        
        `)
    })

    return courses
}


const getShowCourseDetails = async () => {
    
    const sectionContentCourse=document.querySelector("#section-content-course")
    const accordionBodySessions=document.querySelector("#accordion-body-sessions")
    const commentsContainerHeader=document.querySelector(".comments-container__header")
    const commentsContent=document.querySelector(".comments-content")
    const courseName= getUrlParams("name")
    

    const res = await fetch(`http://localhost:4000/v1/courses/${courseName}` , {
        headers: {
            Authorization : `Bearer ${getToken()}`
        }
    })
    const course = await res.json()

     console.log(course);
    sectionContentCourse.innerHTML= `
        <div class="page-title">
        <div class="title-wrapper">
            <h1 class="entry-title">${course.name}</h1>
        </div>
        <div class="title-content">
            <a href="index.html">خانه</a>
            <span class="divider-eslash">/</span>
            <a href="#">محبوب ترین دوره‌ها</a>
        </div>
    </div>
    <div class="course-introduction">
        <div class="course-introduction-right">
            <div class="course-introduction__video">
                <video class="course-video" src="#" poster="http://localhost:4000/courses/covers/${course.cover}" controls></video>
            </div>
            <div class="course-introduction__point">
                <span class="point-text">پس از خرید، بلافاصله به محتوای دوره دسترسی خواهید داشت و میتوانید دوره را مشاهده و یا دانلود کنید.</span>
            </div>
        </div>
    
        <div class="course-introduction-left">
            <div class="course-introduction-left__top">
                <div class="prduct-category">
                    <p class="prduct-category-title">دسته: </p>
                    <span>
                        <a href="#">${course.categoryID.title}</a>
                    </span>
                </div>
                <div class="user-opinion">
                    <a href="#">(دیدگاه کاربران)</a>
                </div>
            </div>
            <div class="course-introduction-left__center">
                <div class="prduct-price">
                
                ${
                    course.discount > 0 ? 
                    `<span class="prduct-price__text">${(course.price-(course.price * course.discount) / 100).toLocaleString()} تومان</span>` :
                    `<span class="prduct-price__text">${course.price.toLocaleString()} تومان</span>`
                }
                    
                </div>
                <div class="property-course">
                    <span class="property-course__text">  پــروژه مــحور بودن دوره هــــا</span>
                    <span class="property-course__text">  پشتیبـــانی دائــــمی محصولات</span>
                    <span class="property-course__text">  تضمین کیــفیت کلیـه محصولات </span>
                </div>
            </div>
            <div class="course-introduction-left__bottom">
                <div class="see-all-video-link">
                    <a href="#">دیدن ویدیو ها</a>
                </div>
                ${
                    course.isUserRegisteredToThisCourse ? `
                      <div class="user-boughtiflatsome">
                          <p id="register-course-text">شما دانشجوی این دوره هستید</p>
                      </div>
                    
                    ` :
                    `
                      <div class="user-boughtiflatsome">
                          <p id="register-course-btn" onclick="registerCourse('${course._id}' , ${course.price})">ثبت نام در این دوره</p>
                      </div>
                    `
                }
            </div>
        </div>
    </div>
    <div class="course-details">
        <div class="course-details__boxes">
            <div class="course-details-box">
                <i class="fas fa-user icon-details-box"></i>
                <span class="title-details-box">مدرس : ${course.creator.name} </span>
            </div>
            <div class="course-details-box">
                <i class="fas fa-clock icon-details-box"></i>
                <span class="title-details-box">وضعیت دوره:</span>
                <span class="text-details-box">${course.isComplete === 0 ? "به اتمام رسیده" : "در حال برگذاری"}</span>
            </div>
            <div class="course-details-box">
                <i class="fas fa-book icon-details-box"></i>
                <span class="title-details-box">تعداد درس:</span>
                <span class="text-details-box">${course.sessions.length}</span>
            </div>
            <div class="course-details-box">
                <i class="fas fa-graduation-cap icon-details-box"></i>
                <span class="title-details-box">دانشجو: </span>
                <span class="text-details-box">${course.courseStudentsCount}</span>
            </div>
        </div>
        <div class="course-details__text">
            <p>آموزش جاوا اسکریپت برای تمامی افرادی ک قصد ورود به زبان برنامه نویسی دارند مناسب می باشد . خصوصا برای علاقه مندان به حوزه فرانت همان طور که می دانید جاوا اسکریپت یکی از زبان های برنامه نویسی محبوب و پر طرفدار است که بازار کار فوق العاده ای دارد. آموزش رایگان جاوا اسکریپت برای شما عزیزان آماده شده است. جاوا اسکریپت ابتدا با هدف استفاده در ظاهر وب سایت ایجاد شد اما با پیشرفت چشمگیری که داشته، امروزه برای توسعه اپلیکیشن های اندروید، IOS، سمت سرور و… استفاده می شود.اگر می خواهید جاوا اسکریپت را از صفر تا صد یاد بگیرید، آموزش جاوا اسکریپت سبزلرن را از دست ندهید.</p>
            <i class="fas fa-angle-down icon-angle-section"></i>
        </div>
    </div>
    `



    // accordion-session

    if(course.sessions.length) {
        course.sessions.forEach((session , index) => {
            

            accordionBodySessions.insertAdjacentHTML("beforeend" , `
                <div  class="accordion-body__item">
                    <div class="accordion-body__item-right">
                        <span class="accordion-body__item-count">${index+1}</span>
                        <i class="fa-brands fa-youtube accordion-body__item-right-icon"></i>
                        ${
                            session.free || course.isUserRegisteredToThisCourse ? 
                            `<a href="episode.html?name=${course.shortName}&id=${session._id}" class="accordion-body__item-title">${session.title}</a>` 
                            :`<span  class="accordion-body__item-title">${session.title}</span>`
                        }
                        
                    </div>
                    <div class="accordion-body__item-left">
                        <span class="meeting-time">${session.time}</span>
                        ${
                            !(session.free || course.isUserRegisteredToThisCourse) ? 
                            `<i class="fa-solid fa-lock"></i>` : 
                            ""
                        }
                        
                    </div>
                </div>
            `)
            
        })
    }
    else{
        accordionBodySessions.insertAdjacentHTML("beforeend" , `
        <a href="#" class="accordion-body__item">
            <div class="accordion-body__item-right">
                <span class="accordion-body__item-count">--</span>
                <i class="fa-brands fa-youtube accordion-body__item-right-icon"></i>
                <p class="accordion-body__item-title">هنوز دوره ای ثبت نشده است</p>
            </div>
            <div class="accordion-body__item-left">
                <span class="meeting-time">00:00</span>
            </div>
        </a>
    `)
    }

    // show comments

    if(!course.comments.length) {
        commentsContainerHeader.innerHTML = " اولین نفر باشید که نظر میدهید 👇"
        commentsContainerHeader.style.color= "var(--primery-color)"
        return false
    }
    console.log(course.comments);
    
    commentsContainerHeader.innerHTML = `${course.comments.length}  دیدگاه در ${course.name}`
    course.comments.forEach(comment => {
        commentsContent.insertAdjacentHTML("beforeend" , `
            <div class="comments-content-item">
                <div class="comments-content-item__meta">
                    <span class="comment-author">${comment.creator.username}</span>
                    <span class="comments-dash">_</span>
                    <span class="comment-published-date">${comment.creator.createdAt.substring(0,10)}</span>
                </div>
                <div class="description">
                    <p>${comment.body}</p>
                </div>
                <a href="#" class="comment-reply-link">پاسخ به این نظر</a>
                <div class="comments-content-item__meta">
                    <span class="comment-author">${comment.answerContent === null ? "" : comment.answerContent.creator.username}</span>
                    <span class="comments-dash">_</span>
                    <span class="comment-published-date">${comment.answerContent === null ? "" : comment.answerContent.createdAt.substring(0,10)}</span>
                </div>
                <div class="description">
                    <p>${comment.answerContent === null ? "پاسخ داده نشده است" : comment.answerContent.body}</p>
                </div>
                <a href="#" class="comment-reply-link">پاسخ به این نظر</a>
            </div>
        `)
        console.log(comment);
    })


}

const registerCourse = async (courseId , coursePrice) => {
    let percentCode = null
    if(coursePrice === 0){
        showSwal(
            "آیا میخواهید در این دوره ثبت نام کنید ؟",
            "",
            "بله میخواهم",
            async (result) => {
                if(result){
                    const res = await fetch(`http://localhost:4000/v1/courses/${courseId}/register` , {
                        method : "POST" ,
                        headers : {
                            Authorization : `Bearer ${getToken()}`,
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify({price : 0})
                    })
                    const resultRegister = await res.json()
            
                    console.log(res);
                    console.log(resultRegister);

                    if(res.ok) {
                        showSwal(
                            "شما با موفقیت در این دوره ثبت نام شدید",
                            "success",
                            "حله",
                            () => {
                                location.reload()
                            }
                        )
                    }
                }
            }
        )
    }
    else{
        showSwal(
            "آیا میخواهید در این دوره ثبت نام کنید ؟",
            "",
            [ "نه","بله میخواهم"],
            (result) =>{
                if(result) {
                    showSwal(
                        "آیا کد تخفیف دارید ؟",
                        "",
                        [ "نه","بله دارم"],
                        async(result) =>{
                            if(result) {
                                swal({
                                    title: "کد نخفیف خود را وارد کنید :",
                                    content : "input" ,
                                    icon : "",
                                    buttons : "اعمال کد تخفیف"
                                })
                                .then(async code => {
                                    const res = await fetch(`http://localhost:4000/v1/offs/${code}` , {
                                        method : "POST",
                                        headers : {
                                            Authorization : `Bearer ${getToken()}`,
                                            "Content-Type" : "application/json"
                                        },
                                        body : JSON.stringify({course : courseId})
                                    })
                                    const resultRegister = await res.json()
                                    
                                    percentCode = parseInt(resultRegister.percent) 

                                    
                                    if(res.status === 404) {
                                        showSwal(
                                            "این کد نامعتبر میباشد",
                                            "error",
                                            "حله",
                                            () => {}
                                        )
                                    }
                                    else if(res.status === 409) {
                                        showSwal(
                                            "دفعات استفاده از این کد تمام شده است",
                                            "error",
                                            "حله",
                                            () => {}
                                        )
                                    }
                                    else if(res.status === 200){
                                        let mainPrice =  coursePrice - (coursePrice * percentCode) / 100

                                        const res = await fetch(`http://localhost:4000/v1/courses/${courseId}/register` , {
                                            method : "POST" ,
                                            headers : {
                                                Authorization : `Bearer ${getToken()}`,
                                                "Content-Type" : "application/json"
                                            },
                                            body: JSON.stringify({price : mainPrice})
                                        })
                                        const resultRegister = await res.json()
                    
                                        console.log(resultRegister);
                                        if(res.ok) {
                                            showSwal(
                                                "شما با موفقیت در این دوره ثبت نام شدید",
                                                "success",
                                                "حله",
                                                () => {
                                                    location.reload()
                                                }
                                            )
                                        }
                                    }
                                })
                            }
                            else{
                                const res = await fetch(`http://localhost:4000/v1/courses/${courseId}/register` , {
                                    method : "POST" ,
                                    headers : {
                                        Authorization : `Bearer ${getToken()}`,
                                        "Content-Type" : "application/json"
                                    },
                                    body: JSON.stringify({price : coursePrice})
                                })
                                const resultRegister = await res.json()
                        
                                console.log(res);
                                console.log(resultRegister);
            
                                if(res.ok) {
                                    showSwal(
                                        "شما با موفقیت در این دوره ثبت نام شدید",
                                        "success",
                                        "حله",
                                        () => {
                                            location.reload()
                                        }
                                    )
                                }
                            }
                        }
                    )
                }
            }
        )
    }
}

const getShowRelatedCourses = async () => {

    const relatedCoursesWrapper=document.querySelector(".related-courses-wrapper")
    const courseName= getUrlParams("name")
    const res = await fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
    const courses = await res.json()



    if(courses.length) {

        courses.forEach(course => {

            relatedCoursesWrapper.insertAdjacentHTML("beforeend" , `
            
            <div class="swiper-slide">
                <div class="course-box">
                   <a href=course.html?name=${course.shortName}>
                       <img src="http://localhost:4000/courses/covers/${course.cover}" alt="" class="course-box-img">
                   </a>
                   <div class="course-box__title-wrapper">
                       <p class="course-box__category"> آموزش برنامه نویسی فرانت اند </p>
                       <p><a href=course.html?name=${course.shortName} class="course-box__product-name">${course.name}</a></p>
                   </div>
                   <div class="course-box__price-student">
                       <div class="course-box-price">
                           <p>${course.price.toLocaleString()} تومان</p>
                       </div>
                       <div class="course-box-student">
                           <span class="course-box-number-student">1</span>
                           <span class="course-box-student-text">دانشجو</span>
                       </div>
                   </div>
                </div>
            </div>
        `)
        })
    }
    else{
        relatedCoursesWrapper.innerHTML = `
          <h1 class="related-courses-wrapper-text">هیچ دوره مرتبطی وجود ندارد !</h1>
        `
    }




}


const getSessionDetails = async () => {

    const accordionBodySessions = document.querySelector("#accordion-body-sessions")
    const episodeCourseVideo = document.querySelector(".episode-course-video")
    const episodeTitleVideo = document.querySelector(".episode-container-video__body-video-title")
    const courseName= getUrlParams("name")
    const sessionId= getUrlParams("id")
    const res = await fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionId}` , {
        headers: {
            Authorization : `Bearer ${getToken()}`
        }
    })
    const responsData = await res.json()
    console.log(responsData);

    episodeTitleVideo.innerHTML= responsData.session.title
    episodeCourseVideo.setAttribute("src" , `http://localhost:4000/courses/covers/${responsData.session.video}`)

    responsData.sessions.forEach(session => {
        accordionBodySessions.insertAdjacentHTML("beforeend" , `
        <div  class="accordion-body__item">
          <div class="accordion-body__item-right">
              <i class="fa-brands fa-youtube accordion-body__item-right-icon"></i>
              ${
                  session.free ? 
                  `<a href="episode.html?name=${courseName}&id=${session._id}">${session.title}</a>` 
                  :`<span  class="accordion-body__item-title">${session.title}</span>`
              }
              
          </div>
          <div class="accordion-body__item-left">
              <span class="meeting-time">${session.time}</span>
              ${
                  !(session.free) ? 
                  `<i class="fa-solid fa-lock"></i>` : 
                  ""
              }
              
          </div>
        </div>
    `)
    })

  
}


const submitContactUsMes = async () => {
    
    const nameInput=document.querySelector("#first-last-name")
    const emailInput=document.querySelector("#email")
    const phoneInput=document.querySelector("#phone")
    const messageInput=document.querySelector("#message")

    const newConcatUsInfos = {
        name : nameInput.value.trim(),
        email : emailInput.value.trim(),
        phone : phoneInput.value.trim(),
        body : messageInput.value.trim()
    }

    const res = await fetch("http://localhost:4000/v1/contact" , {
        method : "POST" ,

        headers : {
            "Content-Type" : "application/json"
        },

        body : JSON.stringify(newConcatUsInfos)
    })

    const result = await res.json()

    console.log(res);
     
    if(res.status === 201) {
        showSwal("پیام شما با موفقیت ارسال شد" , "success" , "انتقال به صفحه اصلی" , () =>{window.location.href = "index.html"})
    }
    else{
        showSwal("لطفا مقادیر فیلد ها را به درستی وارد کنید" , "error" , "تحصیح اطلاعات" , () =>{})
    }


}


const getShowSearchResult = async () => {
    
    const coursesContainerSearch=document.querySelector("#courses-container-search")
    const coursesContentTitle=document.querySelector(".courses-content-title")
    const articlesContentTitle=document.querySelector(".articles-content-title")
    const searchValue = getUrlParams("value")
    const res = await fetch(`http://localhost:4000/v1/search/${searchValue}`)
    const result = await res.json()

   


    if(result.allResultCourses.length) {
        result.allResultCourses.forEach(course => {
       
            coursesContentTitle.innerHTML = ` نتیجه جستجو برای "${searchValue}"`
            coursesContainerSearch.insertAdjacentHTML("beforeend" , `
            <div class="course-box">
                <a href=course.html?name=${course.shortName}>
                    <img src="http://localhost:4000/courses/covers/${course.cover}" alt="" class="course-box-img">
                </a>
                <div class="course-box__title-wrapper">
                    <p class="course-box__category">برنامه نویسی فرانت اند</p>
                    <p><a href=course.html?name=${course.shortName} class="course-box__product-name">${course.name}</a></p>
                </div>
                <div class="course-box__price-student">
                    <div class="course-box-price">
                        <p>${course.price.toLocaleString()} تومان</p>
                    </div>
                    <div class="course-box-student">
                        <span class="course-box-number-student">1</span>
                        <span class="course-box-student-text">دانشجو</span>
                    </div>
                </div>
             </div>
        `)

    })
    }
    else{
         coursesContentTitle.innerHTML = ` نتیجه جستجو برای "${searchValue}"`
         coursesContainerSearch.innerHTML = `<p class="course-container-text">هیچ محصولی یافت نشد !</p>`
    }
    
  

   
}


const submitComment = async () => {
    const ratingInput = document.querySelector("#rating")
    const messageInput = document.querySelector("#message")
    const courseName = getUrlParams("name")

    const newComment = {
        body : messageInput.value.trim(),
        courseShortName : courseName ,
        score : ratingInput.value
    }
    const res = await fetch(`http://localhost:4000/v1/comments` , {
        method : "POST",
        headers : {
            Authorization : `Bearer ${getToken()}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(newComment)
    })

    const result = await res.json()
    console.log(result);
    console.log(res);

    if(res.status === 401) {
        showSwal("برای کامنت گذاشتن باید ابتدا وارد سایت شوید" , "error" , "وارد شوید" , () => {window.location.href = "login.html"} )
    }
    else if(res.status === 201){
        showSwal("کامنت ثبت شد" , "success" , "حله" , () => {} )
        messageInput.value = ""
    }
    else{
        showSwal("لطفا متن یا امتیاز را خالی نفرستید" , "error" , "نوشتن نظر" , () => {} )
    }
}


const getPageInformation = async () => {

    const homePageEmail = document.querySelector("#home-page-email")
    const emailFooter = document.querySelector("#email-footer")
    const phoneFooter = document.querySelector("#phone-footer")
    const res = await fetch("http://localhost:4000/v1/infos/index",)
    const infos = await res.json() 


        homePageEmail.innerHTML = infos.email
        emailFooter.innerHTML = `ایمیل : ${infos.email}`
        phoneFooter.innerHTML = `شماره تماس  ${infos.phone}+`

}


export {
    showUserNameInNavbar, 
    getShowAllCourses,
    getShowAllArticles,
    getShowNavbarMenus,
    getShowCategoryCourses,
    getShowCourseDetails,
    getShowRelatedCourses,
    getSessionDetails,
    submitContactUsMes,
    getShowSearchResult,
    submitComment,
    registerCourse,
    getPageInformation
}