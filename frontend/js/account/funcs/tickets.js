import {getToken} from "../../funcs/utils.js"


const getAllShowTicketUser = async () => {

    const ticketContentWrapper = document.querySelector(".ticket-content")
    const ticketContentTitle = document.querySelector(".ticket-content__title")
    const res = await fetch("http://localhost:4000/v1/tickets/user" , {
        headers : {
            Authorization : `Bearer ${getToken()}`
        }
    })
    const tickets = await res.json()
    console.log(tickets);

    ticketContentTitle.innerHTML = `نمایش ${tickets.length} تیکت`

    if(tickets.length) {
        tickets.forEach(ticket => {
            ticketContentWrapper.insertAdjacentHTML("beforeend" , `
                <div class="ticket-content__box">
                    <div class="ticket-content__right">
                        <div class="ticket-content__right-right">
                            <a class="ticket-content__link" href="#">عضو شدن در گروه تلگرامی دوره ریکت</a>
                            <span class="ticket-content__category">
                                <i class="fa fa-ellipsis-v ticket-content__icon"></i>
                                پشتیبانی دوره ها</span>
                        </div>
                        <div class="ticket-content__right-left">
                            <span class="ticket-content__name">محمدامین سعیدی راد</span>
                        </div>
                    </div>
                    <div class="ticket-content__left">
                        <div class="ticket-content__left-right">
                            <div class="ticket-content__condition">
                                <span class="ticket-content__condition-text">پاسخ داده شده</span>
                            </div>
                        </div>
                        <div class="ticket-content__left-left">
                            <span class="ticket-content__time">2022/04/08</span>
                            <span class="ticket-content__time-month">8 ماه قبل</span>
                        </div>
                    </div>
                </div>
            `)
        })
    }
    else{
        ticketContentWrapper.insertAdjacentHTML("beforeend" , `
           <div class="alert alert-danger">هیچ تیکتی ثبت نشده است !</div>
        `)
    }
}



export {
    getAllShowTicketUser
}