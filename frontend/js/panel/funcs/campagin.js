import {getToken , showSwal } from "../../funcs/utils.js"


const setCampagin = async () => {

    const percentCampaginInput = document.querySelector("#percent-campagin-input")

    const newCampagin = {
        discount : percentCampaginInput.value.trim()
    }
    const res = await fetch("http://localhost:4000/v1/offs/all" , {
        method : "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(newCampagin)
    })
    const result = await res.json()

    console.log(res);
    console.log(result);
    if(res.ok) {
        showSwal(
            "کمپین جدید با موفقیت بر روی دوره ها ست شد",
            "success",
            "حله",
            () => {}
        )
    }
}

export {
    setCampagin
}