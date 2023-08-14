import {getToken} from "../../funcs/utils.js"


const getAllShowOrder = async () =>{

    const orderTableBody = document.querySelector(".order__table-body")
    const res = await fetch("http://localhost:4000/v1/orders" , {
        headers : {
            Authorization : `Bearer ${getToken()}`
        }
    })
    const orders = await res.json()

    if(orders.length) {
          console.log(orders);
    orders.forEach((order ,index) => {
        orderTableBody.insertAdjacentHTML("beforeend" , `
            <tr class="order__table-body-list">
                <th class="order__table-body-item">
                    <a href="#" class="order__table-body-link">${index + 1}</a>
                </th>
                <th class="order__table-body-item">${order.createdAt.slice(0,10)}</th>
                <th class="order__table-body-item">${order.price.toLocaleString()} تومان   </th>
                <th class="order__table-body-item">
                    <a class="order__table-body-btn" href="#">نمایش</a>
                </th>
            </tr>
        `)
    })
    }
    else{
        orderTableBody.insertAdjacentHTML("beforeend" , 
        `<div class="alert alert-danger">شما هیچ سفارشی تا به حال ندارید !</div>`
        ) 
    }

}

export{
    getAllShowOrder
}

