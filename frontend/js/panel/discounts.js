import { getAllShowDiscounts , preparaCreateNewDiscountForm , createNewDisCount , removeDiscount } from "./funcs/discounts.js";

window.removeDiscount = removeDiscount
window.addEventListener("load" , () => {
    const createDiscountBtn = document.querySelector("#create-discount-btn")
    getAllShowDiscounts()
    preparaCreateNewDiscountForm()

    createDiscountBtn.addEventListener("click" , event => {
        event.preventDefault()
        createNewDisCount()
    })
})