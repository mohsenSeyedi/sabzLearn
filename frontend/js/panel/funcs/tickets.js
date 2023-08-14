import {getToken , showSwal } from "../../funcs/utils.js"


const getAllShowTickts = async () => {

    const tableTicketsContainer = document.querySelector("#table-tickets-container")

    const res = await fetch("http://localhost:4000/v1/tickets" , {
        headers : {
            Authorization : `Bearer ${getToken()}`
        }
    })
    const tickets = await res.json()

    console.log(tickets);

    tableTicketsContainer.innerHTML = ""
    tickets.forEach((ticket , index) => {
        tableTicketsContainer.insertAdjacentHTML("beforeend" , `
            <tr>
                <td class="${ticket.answer === 1 ? "answer-contact " : "no-answer-contact"}">${index + 1}</td>
                <td>${ticket.user}</td>
                <td>${ticket.title}</td>
                <td>${ticket.createdAt.slice(0,10)}</td>
                <td>${ticket.departmentID}</td>
                <td>${ticket.departmentSubID}</td>
                <td>${ticket.course === null ? "__" : ticket.course}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="edit-btn" onclick="showTicketBody('${ticket.body}')">مشاهده</button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary" id="edit-btn" onclick="answerAdminTicket('${ticket._id}')">پاسخ</button>
                </td>
            </tr>
        `)
    })
}

const showTicketBody = (ticketBody) => {
    showSwal(
        ticketBody,
        "",
        "مشاهده کردم",
        () => {}
    )
}


const answerAdminTicket = async(ticketID) => {

    swal({
        title : "لطفا پاسخ خود را بنویسید :",
        content : "input",
        buttons : [ "خروج","ارسال پاسخ"]
    }).then(async bodyticket => {
        if(bodyticket) {
           
            const answerTicket = {
                ticketID : ticketID,
                body : bodyticket
            }
            const res = await fetch("http://localhost:4000/v1/tickets/answer" , {
                method : "POST",
                headers : {
                    Authorization : `Bearer ${getToken()}`,
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(answerTicket)
            })

            const result = await res.json()

            if(res.ok) {
                showSwal(
                    "پاسخ شما با موفقیت ارسال شد",
                    "success",
                    "حله",
                    () => {
                        getAllShowTickts()
                    }
                )
            }
            else{
                showSwal(
                    "مشکلی پیش آمد !",
                    "error",
                    "باشه",
                    () => {}
                )
            }
        }
    })
    
  
} 

export {
    getAllShowTickts,
    showTicketBody ,
    answerAdminTicket
}