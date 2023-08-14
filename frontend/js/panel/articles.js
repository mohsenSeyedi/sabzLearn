import { getAllShowArticles , preparaCreateNewArticleForm , createNewArticle ,removeArticle , draftArticle } from "./funcs/articles.js";

window.removeArticle = removeArticle
window.addEventListener("load" , () => {
    const createArticleBtn = document.querySelector("#create-article-btn")
    const draftArticleBtn = document.querySelector("#draft-article-btn")
    getAllShowArticles()
    preparaCreateNewArticleForm()


    draftArticleBtn.addEventListener("click" , event => {
        event.preventDefault()
        draftArticle()
    })
    createArticleBtn.addEventListener("click" , event => {
        event.preventDefault()
        createNewArticle()
    })
})