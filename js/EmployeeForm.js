window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    const year = document.querySelector('#year');
    const dateError = document.querySelector('.date-error');
    year.addEventListener('input', function() {
        try{
            (new EmployeePayrollData()).startDate = new Date(parseInt(getInputValueById('#year')), parseInt(getInputValueById('#month')), parseInt(getInputValueById('#day')));
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    })

});

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return;
    }
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    console.log(parseInt(getInputValueById('#year')), parseInt(getInputValueById('#month')), parseInt(getInputValueById('#day')))
    let date = new Date(parseInt(getInputValueById('#year')), parseInt(getInputValueById('#month')), parseInt(getInputValueById('#day')));
    employeePayrollData.startDate = date;
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const resetForm = () => {
    setTextValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender','');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','');
    setValue('#month','');
    setValue('#year','');
    setTextValue('.salary-output','400000');
    setTextValue('.text-error','')
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}


