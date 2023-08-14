import { getAllShowTickts ,  showTicketBody ,answerAdminTicket } from "./funcs/tickets.js";

window.showTicketBody = showTicketBody
window.answerAdminTicket = answerAdminTicket

window.addEventListener("load" , () => {
    getAllShowTickts()
})