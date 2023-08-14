import { getAllShowComments ,showBodyComment , acceptComment , rejectComment , answerComment , removeComment} from "./funcs/comments.js";

window.showBodyComment = showBodyComment
window.acceptComment = acceptComment
window.rejectComment = rejectComment
window.answerComment = answerComment
window.removeComment = removeComment
window.addEventListener("load" , () => {

    getAllShowComments()
})