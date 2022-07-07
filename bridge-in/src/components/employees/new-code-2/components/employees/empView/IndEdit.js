import React, { useState } from 'react'; 
import { Alert } from 'bootstrap';

import { useNavigate, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import { Employee } from '../../../models/employee.js';

import EmployeeService from '../../../services/employee.service.js'; 
import EditEmployeeService from '../../../services/editEmployee.service.js'; 

import FormInput from './../FormInput';

export default function IndInput(){
  const [success, setSuccess] = useState(true);
  const [id, setId] = useState("");

  async function onEmpEdit(id, downloadUrl, name, birthday, address, postalCode, city, country, role, email, phone, status) {
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
    setId(id);
  }



  return (
    <div className="container my-5">
      <div className="card card-body text-left">
            <div>
              <h5 class="card-title text-center">Add an Employee</h5>
              <FormInput empId={ id } onEmployeeFormSubmit={onEmpEdit}/>
            </div>
      </div>
    </div>
  )

}

