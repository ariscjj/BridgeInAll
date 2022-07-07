import React, { useState, useEffect } from 'react'; 

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import { Employee } from '../../models/employee.js';

import EditEmployeeService from '../../services/editEmployee.service.js'; 
import EmployeeService from '../../services/employee.service.js'; 

import FormInput from './FormInput';

export default function EditEmployeeInput(props){

  const [id, setId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(false); 
  
  useEffect(() => {
    if (!employees.length){
      onInitialLoad(); 
    }
  }, []); 

  async function onInitialLoad(){
    const employees = await EmployeeService.fetchEmployees(); 
    setEmployees(employees);
  }

  async function onEmployeeFormSubmit(id, downloadUrl, name, birthday, address, postalCode, city, country, role, email, phone, status) {
      await EditEmployeeService.createEmployee(
        new Employee(
          id,
          downloadUrl, 
          name,
          birthday,
          address,
          postalCode,
          city,
          country,
          role,
          email,
          phone,
          status 
        ));
  }

  function onEditSelected(editId) {
    setId(editId);
    console.log("SELECTED: " + editId);
    setSelected(true); 
  }


  return (
    <div className="container my-5">
      <div className="card card-body text-center">
        <h5 class="card-title">Edit an Employee</h5>
          <div className="mb-3">
            <select 
              onChange={(e) => onEditSelected(e.target.value)}
              className="form-select" 
              aria-label="Default select example" 
               >
            <option selected>Select employee to edit</option>
              {
                employees.map((employee) => 
                <option 
                  key={employee.id} 
                  value={employee.id}> {employee.name}</option>
                )
              }
            </select>
          </div>

          { selected ? (
            <FormInput empId={id} onEmployeeFormSubmit={onEmployeeFormSubmit}/>
          ) : 
          <></> }

    </div>
  </div>
  )
}

