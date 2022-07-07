import React, { useState, useEffect } from 'react';
import Flag from "react-world-flags";

import StatusBox from "../../common/StatusBox";
import EmployeeService from '../../services/employee.service.js'; 
import FormTable from './FormTable';


export default function EmployeeTable(){

  async function fetchEmployees(){
    return await EmployeeService.fetchEmployees()
  }
  return (
    <div className="container my-5">
      <div className="card card-body text-center">
        <h5 className="card-title">Employees</h5>
        <table className="table">

          <FormTable fetchEmployees={fetchEmployees} />
        </table>
      </div>
    </div>

  )
}
