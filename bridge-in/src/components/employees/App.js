import React, { useState, useEffect } from 'react';
//import boostrap from node modules 

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import './App.css'; 

//import the Employee class from the models folder 
import { Employee } from './models/employee.js';

import EmployeeService from './services/employee.service.js'; 

//import components from components folder
import EmployeeTable from './components/employees/EmployeeTable';

import EmployeeInput from './components/employees/EmployeeInput'; 

export default function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (!employees.length){
      onInitialLoad(); 
    }
  }, []); 

  async function onInitialLoad(){
    const employees = await EmployeeService.fetchEmployees(); 
    setEmployees(employees);
  }

  async function onEmployeeCreate(photo, name, country, role, email, phone, status) {
    // add the employee to the employees state 
    //create the employee 
    const employee = await EmployeeService.createEmployee(
      new Employee(
        null,
        photo, 
        name,
        country,
        role,
        email,
        phone,
        status
    ));
    setEmployees([...employees, employee]); 
  }

  return (
    <div className="container my-5">
      <div className="card card-body text-center">
        <h1>Employee List</h1>
        <hr></hr>
        <p>Add an Employee</p>
        <EmployeeInput onEmployeeCreate={onEmployeeCreate} />
        <EmployeeTable 
          employees={employees} />
      </div>
    </div>
  )

}

