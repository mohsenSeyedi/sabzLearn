const sideMenu=document.querySelector(".side-menu")
const showMenuBtn=document.querySelector(".menu-icon-hamburger-countent")
const closeMenuBtn=document.querySelector(".close-menu-btn")



showMenuBtn.addEventListener("click" ,() => { 
    sideMenu.classList.add("active")
})

closeMenuBtn.addEventListener("click" ,() => { 
    sideMenu.classList.remove("active")
})