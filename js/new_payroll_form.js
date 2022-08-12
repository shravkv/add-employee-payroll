window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function(){
        if(name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });
});

    const save = () => {
        try {
            let employeePayrollData = createEmployeePayroll(); 
            createAndUpdateStorage(employeePayrollData);
        } catch (e) {
            return;
        }
    }

    function  createAndUpdateStorage(employeePayrollData){
        let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
        if(employeePayrollList != undefined){
            employeePayrollList.push(employeePayrollList);
        }else{
            employeePayrollList = [employeePayrollData];
        }
        alert(employeePayrollList.toString());
        localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
    }

    const createEmployeePayroll = () => {
        let employeePayrollData = new EmployeePayrollData();
        try {
            employeePayrollData.name = getInputValueById('#name');
        } catch (e) {
            setTextValue('.text-error', e);
            throw e;
        }
        employeePayrollData.profilePic = getSelectedValue('[name=profile]').pop();
        employeePayrollData.gender = getSelectedValue('[name=gender]').pop();
        employeePayrollData.department = getSelectedValue('[name=department]');
        employeePayrollData.salary = getSelectedValue('#salary');
        employeePayrollData.notes = getSelectedValue('#notes');
        let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
        employeePayrollData.date = Date.parse(date);
        alert(employeePayrollData.toString());
        return employeePayrollData;
    }

    const getSelectedValue = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        let selItems = [];
        allItems.forEach(item => {
            if(item.checked) selItems.push(itemValue);
        });
        return selItems;
    }

    const getInputValueById = (id) =>{
        let value = document.querySelector(id).value;
        return value;
    }

    const getInputElementValue = (id) =>{
        let value = document.getElementById(id).value;
        return value;
    }