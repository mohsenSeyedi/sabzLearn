import { getToken , showSwal } from "../../funcs/utils.js"



const getAllShowComments = async () => {

    const tableMessagesContainer = document.querySelector("#table-messages-container")

    const res = await fetch("http://localhost:4000/v1/comments")
    const comments = await res.json()

    console.log(comments);

    tableMessagesContainer.innerHTML = ""
    comments.forEach((comment , index) => {
        tableMessagesContainer.insertAdjacentHTML("beforeend" , `
        <tr>
            <td class="${comment.answer === 1 ? "answer-contact " : "no-answer-contact"}">${index + 1}</td>
            <td>${comment.creator.name}</td>
            <td>${comment.creator.phone}</td>
            <td>${comment.course}</td>
            <td>
                <button type="button" class="btn btn-primary" id="edit-btn" onclick="showBodyComment('${comment.body}')">مشاهده</button>
            </td>
            <td>
                <button type="button" class="btn btn-primary" id="edit-btn" onclick="answerComment('${comment._id}')">پاسخ</button>
            </td>
            <td>
                <button type="button" class="btn btn-primary" onclick="acceptComment('${comment._id}')">تایید</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" onclick="rejectComment('${comment._id}')">رد</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" id="delete-btn" onclick="removeComment('${comment._id}')">حذف</button>
            </td>
        </tr>
    `)
    })

}

const showBodyComment = async (commentBody) => {
    showSwal(
        commentBody,
        [],
        "پاسخ دادن",
        (result) => {
            if(result) {
                
            }
        }
    )
}

const acceptComment = async (commentId) => {
    showSwal(
        "ایا میخواهید این کامنت را تایید کنید ؟",
        "warning",
        "بله تایید میکنم",
        async(result) => {
            if(result) {
                const res = await fetch(`http://localhost:4000/v1/comments/accept/${commentId}` , {
                    method : "PUT",
                    headers: {
                        Authorization : `Bearer ${getToken()}`
                    },
                })
                const resultAccept = await res.json()

                console.log(res);
                console.log(resultAccept);

                if(res.ok) {
                    showSwal(
                        "کامنت تایید شد",
                        "success",
                        "حله",
                        () => {
                            getAllShowComments()
                        }
                    )
                }
                else{
                    showSwal(
                        "مشکلی پیش آمد",
                        "error",
                        "حله",
                        () => {}
                    )
                }
            }
        }
    )
}

const rejectComment = async (commentId) => {
    showSwal(
        "ایا میخواهید این کامنت را رد کنید ؟",
        "warning",
        "بله رد میکنم",
        async(result) => {
            if(result) {
                const res = await fetch(`http://localhost:4000/v1/comments/reject/${commentId}` , {
                    method : "PUT",
                    headers: {
                        Authorization : `Bearer ${getToken()}`
                    },
                })
                const resultReject = await res.json()

                console.log(res);
                console.log(resultReject);

                if(res.ok) {
                    showSwal(
                        "کامنت رد شد",
                        "success",
                        "حله",
                        () => {
                            getAllShowComments()
                        }
                    )
                }
                else{
                    showSwal(
                        "مشکلی پیش آمد",
                        "error",
                        "حله",
                        () => {}
                    )
                }
            }
        }
    )
}

const answerComment = async (commentId) => {
    console.log(commentId);
    swal({
        title: "متن پاسخ را وارد کنید :",
        content : "input",
        buttons : "ارسال پاسخ"
    }).then( body => {
        if(body) {
             fetch(`http://localhost:4000/v1/comments/answer/${commentId}` , {
                method : "POST",
                headers: {
                    Authorization : `Bearer ${getToken()}`,
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({body})
            })
            .then(res => {
                if(res.ok) {
                    showSwal(
                        "پاسخ با موفقیت ارسال شد",
                        "success",
                        "حله",
                        () => {
                            getAllShowComments()
                        }
                    )
                }
                else{
                    showSwal(
                        "مشکلی پیش آمد",
                        "error",
                        "حله",
                        () => {}
                    )
                }
                res.json()
            })
            
        }
    })
}

const removeComment = async (commentId) => {
    showSwal(
        "ایا میخواهید این کامنت را حذف کنید ؟",
        "warning",
        "بله حذف میکنم",
        async(result) => {
            if(result) {
                const res = await fetch(`http://localhost:4000/v1/comments/${commentId}` , {
                    method : "DELETE",
                    headers: {
                        Authorization : `Bearer ${getToken()}`
                    },
                })
                const resultRemove = await res.json()

                console.log(res);
                console.log(resultRemove);

                if(res.ok) {
                    showSwal(
                        "کامنت با موفقیت حذف شد",
                        "success",
                        "حله",
                        () => {
                            getAllShowComments()
                        }
                    )
                }
                else{
                    showSwal(
                        "مشکلی پیش آمد",
                        "error",
                        "حله",
                        () => {}
                    )
                }
            }
        }
    )
}

export {
    getAllShowComments,
    showBodyComment,
    acceptComment,
    rejectComment,
    answerComment,
    removeComment
}