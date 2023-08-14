

const preparaCreateNewTicketForm = async () => {
    
    const selectDepartments = document.querySelector("#ticket-form__select-departments")
    const selectSubDepartments = document.querySelector("#ticket-form__select-sub-departments")
    const res = await fetch("http://localhost:4000/v1/tickets/departments")
    const departments = await res.json()

    console.log(departments);

    departments.forEach(department => {
        selectDepartments.insertAdjacentHTML("beforeend" , `
          <option value="${department._id}" class="ticket-form__option">${department.title}</option>
        `)
    })

    let departmentID = -1
    selectDepartments.addEventListener("change" , event => {
       departmentID=event.target.value
       console.log(departmentID);
    })
}


export {
    preparaCreateNewTicketForm
}


