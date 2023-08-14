import {getToken , showSwal } from "../../funcs/utils.js"


const getAllShowArticles = async () => {
    const tableArticleContainer = document.querySelector("#table-article-container")

    const res = await fetch("http://localhost:4000/v1/articles", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
          },
    })
    const articles = await res.json()

    console.log(articles);

    tableArticleContainer.innerHTML = ""
    articles.forEach((article , index) => {
        tableArticleContainer.insertAdjacentHTML("beforeend" , `
           <tr>                              
               <td>${index + 1}</td>
               <td>${article.title}</td>
               <td>${article.publish === 1 ? "منتشر شده" : "پیش نویس"}</td>
               <td>${article.createdAt.slice(0 ,10)}</td>
               <td>${article.creator.name}</td>
               <td>
                   <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
               </td>
               <td>
                   <button type="button" class="btn btn-danger" id="delete-btn" onclick="removeArticle('${article._id}')">حذف</button>
               </td>
           </tr>
        `)
    })
}

let categoryId = -1
let articleCover = null
let articleBodyEditor = null
const preparaCreateNewArticleForm = async () => {
    const categoryList= document.querySelector(".category-list")
    const file= document.querySelector("#file")

    const res = await fetch("http://localhost:4000/v1/category")
    const categories = await res.json()

    categories.forEach(category => {
        categoryList.insertAdjacentHTML("beforeend", `
          <option value="${category._id}">${category.title}</option>
        `)
    })

    categoryList.addEventListener("change" , event => {
        categoryId = event.target.value   
    })

    file.addEventListener("change" , event => {
        articleCover = event.target.files[0]
    })

       // Editor Article
    ClassicEditor.create( document.querySelector( '#editor' ) ,{
        language : "fa"
    }).then((editor) => {
        articleBodyEditor = editor
    }).catch( error => {
        console.error( error );
    } );
}


const createNewArticle = async () => {

    
    const titleArticleInput=document.querySelector("#title-article-input")
    const linkArticleInput=document.querySelector("#link-article-input")
    const descriptionArticleInput=document.querySelector("#description-article-input")


    const formData = new FormData()

    formData.append("title" , titleArticleInput.value.trim())
    formData.append("description" , descriptionArticleInput.value.trim())
    formData.append("body" , articleBodyEditor.getData())
    formData.append("shortName" , linkArticleInput.value.trim())
    formData.append("categoryID" , categoryId)
    formData.append("cover" , articleCover)
    
    const res = await fetch(`http://localhost:4000/v1/articles` , {
        method : "POST" ,
        headers: {
                Authorization : `Bearer ${getToken()}`,
            },
            body : formData
    })

    const result = await res.json()

    console.log(res);
    console.log(result);

    if(res.ok) {
        showSwal(
            "مقاله جدید یا موفقیت ایجاد شد",
            "success",
            "حله",
            () => {
                getAllShowArticles()
            }
        )
    }
    else{
        showSwal(
            "لطفا فیلد ها را خالی نفرستید !",
            "error",
            "باشه",
            () => {
                getAllShowArticles()
            }
        )
    }
}


const draftArticle = async () => {
    const titleArticleInput=document.querySelector("#title-article-input")
    const linkArticleInput=document.querySelector("#link-article-input")
    const descriptionArticleInput=document.querySelector("#description-article-input")


    const formData = new FormData()

    formData.append("title" , titleArticleInput.value.trim())
    formData.append("description" , descriptionArticleInput.value.trim())
    formData.append("body" , articleBodyEditor.getData())
    formData.append("shortName" , linkArticleInput.value.trim())
    formData.append("categoryID" , categoryId)
    formData.append("cover" , articleCover)

    const res = await fetch(`http://localhost:4000/v1/articles/draft` , {
        method : "POST" ,
        headers: {
                Authorization : `Bearer ${getToken()}`,
            },
            body : formData
    })

    const result = await res.json()

    console.log(res);
    console.log(result);

    if(res.ok) {
        showSwal(
            "مقاله به عنوان پیش نویس ایجاد شد",
            "success",
            "حله",
            () => {
                getAllShowArticles()
            }
        )
    }
    else{
        showSwal(
            "لطفا فیلد ها را خالی نفرستید !",
            "error",
            "باشه",
            () => {
                getAllShowArticles()
            }
        )
    }
}


const removeArticle = async (articleId) => {
    showSwal(
        "ایا از حذف مقاله اطمینان دارید ؟",
        "warning" ,
        "بله اطمینان دارم",
        async (result) => {
            if(result) {
                const res = await fetch(`http://localhost:4000/v1/articles/${articleId}` , {
                    method : "DELETE" ,
                    headers : {
                        Authorization : `Bearer ${getToken()}`
                    }
                })
                

                if(res.ok) {
                    showSwal(
                        "مقاله مورد نظر با موفقیت حذف شد",
                        "success" , 
                        "حله" ,
                        () => {
                            getAllShowArticles()
                        }
                    )
                }
               
            }
        }
    )
}

export {
    getAllShowArticles,
    preparaCreateNewArticleForm,
    createNewArticle,
    draftArticle,
    removeArticle
}