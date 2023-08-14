import {getToken , showSwal } from "../../funcs/utils.js"


const getAllShowDiscounts = async () => {
    const tableDiscountsContainer = document.querySelector("#table-discounts-container")

    
    const res = await fetch("http://localhost:4000/v1/offs" , {
        headers: {
            Authorization : `Bearer ${getToken()}`
        },
    })
    const discounts = await res.json()

    console.log(discounts);

    tableDiscountsContainer.innerHTML = ""
    discounts.forEach((discount , index) => {
        tableDiscountsContainer.insertAdjacentHTML("beforeend" , `
            <tr>
                <td>${index + 1}</td>
                <td>${discount.creator}</td>
                <td>${discount.code}</td>
                <td>${discount.max} بار</td>
                <td>%${discount.percent}</td>
                <td>${discount.uses} بار</td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                    <button type='button' class='btn btn-danger delete-btn' onclick="removeDiscount('${discount._id}')">حذف</button>
                </td>
            </tr>
        `)
    })
}

let courseId = null
const preparaCreateNewDiscountForm = async () => {
    const menuList = document.querySelector("#menu-list")

    const res = await fetch("http://localhost:4000/v1/courses")
    const courses = await res.json()
    console.log(courses);

    courses.filter(course => course.price !== 0 ).forEach(course => {
        menuList.insertAdjacentHTML("beforeend" , `
          <option value="${course._id}">${course.name}</option>
        `)
    })

  
    menuList.addEventListener("change" , event => {
        courseId = event.target.value
    })
}

const createNewDisCount = async () => {

    const inputCode = document.querySelector("#input-code")
    const inputpercent = document.querySelector("#input-percent")
    const inputMax = document.querySelector("#input-max")


    const newDiscount = {
        code: inputCode.value.trim(),
        percent: inputpercent.value.trim(),
        course: courseId,
        max: inputMax.value.trim()     
    }

    const res = await fetch("http://localhost:4000/v1/offs" , {
        method : "POST" , 
        headers: {
            Authorization : `Bearer ${getToken()}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(newDiscount)
    })

    const result = await res.json()

    console.log(res);
    console.log(result);
    
    if(res.ok) {
        showSwal(
            "کد تخفیف با موفقیت بر روی دوره مورد نظر اعمال شد",
            "success" ,
            "حله",
            () => {
                getAllShowDiscounts()
                inputCode.value = ""
                inputpercent.value = ""
                inputMax.value = ""
            }
        )
    }
    else{
        showSwal(
            "لطفا فیلد ها را خالی نفرستید",
            "error" ,
            "باشه",
            () => {}
        )
    }
}

const removeDiscount = (discountID) => {
    
    showSwal(
        "ایا از حذف کد تخفیف اطمینان دارید ؟",
        "warning" ,
        "بله اطمینان دارم",
        async (result) => {
            if(result) {
                const res = await fetch(`http://localhost:4000/v1/offs/${discountID}` , {
                    method : "DELETE" ,
                    headers : {
                        Authorization : `Bearer ${getToken()}`
                    }
                })
                

                if(res.ok) {
                    showSwal(
                        "کد تخفیف  با موفقیت حذف شد",
                        "success" , 
                        "حله" ,
                        () => {
                            getAllShowDiscounts()
                        }
                    )
                }
               
            }
        }
    )
}

export {
    getAllShowDiscounts ,
    preparaCreateNewDiscountForm,
    createNewDisCount,
    removeDiscount
}