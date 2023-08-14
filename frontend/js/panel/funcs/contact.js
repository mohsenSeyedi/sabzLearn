import { getToken , showSwal } from "../../funcs/utils.js"

const getAllShowContacts = async () => {

    const tableMessagesContainer = document.querySelector("#table-messages-container")

    const res = await fetch("http://localhost:4000/v1/contact")

    const messages = await res.json()

    tableMessagesContainer.innerHTML = ""
    messages.forEach((message , index) => {
        tableMessagesContainer.insertAdjacentHTML("beforeend" , `
            <tr>
                <td class="${message.answer === 1 ? "answer-contact " : "no-answer-contact"}">${index + 1}</td>
                <td>${message.name}</td>
                <td>${message.phone}</td>
                <td>${message.email}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="edit-btn" onclick="showAndAnswerMessage('${message.body}' , '${message.email}')">مشاهده</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="delete-btn" onclick="removeMessage('${message._id}')">حذف</button>
                </td>
            </tr>
        `)
    })
}


const showAndAnswerMessage = async (messageBody , messageEmail) => {

    const contactEmailInput = document.querySelector("#contact-email-input")
    const contactMessageInput = document.querySelector("#contact-message-input")
    const answerBtn = document.querySelector("#answer-btn")

    showSwal(
        `${messageBody}`,
        undefined,
        "پاسخ دادن",
         (result) => {
            if(result){
                contactMessageInput.focus()
                let emailUser = contactEmailInput.value = messageEmail

                answerBtn.addEventListener("click" , async event => {
                    event.preventDefault()
                    const answerMessage = {
                        email : emailUser,
                        answer : contactMessageInput.value.trim()
                    }
                    const res = await fetch("http://localhost:4000/v1/contact/answer" , {
                        method : "POST",
                        headers: {
                            "Content-Type" : "application/json",
                            Authorization : `Bearer ${getToken()}`
                        },
                        body : JSON.stringify(answerMessage)
                    })
                    const resultAnswer = await res.json()
    
                    console.log(resultAnswer);
                    if(res.ok) {
                        showSwal(
                            "پیام با موفقیت ارسال شد",
                            "success",
                            "حله",
                            () => {
                                getAllShowContacts()
                                contactEmailInput.value =""
                                contactMessageInput.value =""
                            }
                        )
                    }
                    else{
                        showSwal(
                            "لطفا فیلد را به درستی وارد کنید",
                            "error",
                            "تصحیح اطلاعات",
                            () => {}
                        )
                    }
                })
            }
        }
    )
}


const removeMessage = async (messageId) => {
    showSwal(
        "آیا از حذف پیغام مورد نظر اطمینان دارید ؟",
        "warning" ,
        "بله اطمینان دارم",
        async (result) => {
            if(result) {
                const res = await fetch(`http://localhost:4000/v1/contact/${messageId}` , {
                    method : "DELETE" ,
                    headers : {
                        Authorization : `Bearer ${getToken()}`
                    }
                })
                

                if(res.ok) {
                    showSwal(
                        "پیغام مورد نطر با موفقیت حذف شد",
                        "success" , 
                        "حله" ,
                        () => {
                            getAllShowContacts()
                        }
                    )
                }
               
            }
        }
    )
}


export {
    getAllShowContacts,
    showAndAnswerMessage,
    removeMessage
}