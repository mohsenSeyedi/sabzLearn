const showSwal = (title , icon , buttons , calback) => {
    swal({
        title,
        icon,
        buttons,
      }).then(result => calback(result))
}


const saveIntoLocalStorage = (key , value) => {
    return localStorage.setItem(key ,JSON.stringify(value))
}


const getFromLocalStorage = (key) => {
    return JSON.stringify(localStorage.getItem(key))
}

const getToken = () => {
   const userInfos = JSON.parse(localStorage.getItem("user"))
   return userInfos ? userInfos.token : null
}

const isLogin = () => {
    const userInfos = localStorage.getItem("user")
    return userInfos ? true : false
}

const getUrlParams = key => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(key)
}

const pagination = (array , itemsPerPage , paginateParentElem , currentPage) => {
    paginateParentElem.innerHTML = ""
    let endIndex = itemsPerPage * currentPage
    let startIndex = endIndex - itemsPerPage
    let paginatedItems = array.slice(startIndex , endIndex)
    let paginatesCount = Math.ceil(array.length / itemsPerPage)

    for (let i = 1 ; i < paginatesCount + 1 ; i++) {
        paginateParentElem.insertAdjacentHTML("beforeend" , `
           <li>
             <a href="#" class="page-number">${i}</a>
           </li>
        `)
    }

    return paginatedItems
}


export{
    showSwal, 
    saveIntoLocalStorage, 
    getFromLocalStorage, 
    getToken, 
    isLogin,
    getUrlParams,
    // pagination
}