import React from 'react'; 
import { Alert } from 'bootstrap';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import { Employee } from '../../models/employee.js';

import EmployeeService from '../../services/employee.service.js'; 
import FormInput from './FormInput';

export default function EmployeeInput(){

  async function onEmployeeFormSubmit(id, downloadUrl, name, birthday, address, postalCode, city, country, role, email, phone, status) {
      const d = new Date();
      let time = d.getTime() + "";

      await EmployeeService.createEmployee(
        new Employee(
          time,
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

     <Alert key="success" variant="success">
      Successfully created employee!
     </Alert>
  }

  return (
    <div className="container my-5">
      <div className="card card-body text-center">
        <h5 class="card-title text-center">Add an Employee</h5>
        <FormInput onEmployeeFormSubmit={onEmployeeFormSubmit}/>
      </div>
    </div>
  )

}
