import { getAllShowContacts , showAndAnswerMessage , removeMessage} from "./funcs/contact.js";

window.showAndAnswerMessage = showAndAnswerMessage
window.removeMessage = removeMessage

window.addEventListener("load" , () => {

    getAllShowContacts()
})