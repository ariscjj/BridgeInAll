import React, { useState, useEffect } from 'react';
import Flag from "react-world-flags";

import StatusBox from "../../common/StatusBox";
import EditEmployeeService from '../../services/editEmployee.service.js'; 
import EmployeeService from '../../services/employee.service.js'; 
import FormTable from './FormTable'


export default function EditTable(){
  async function fetchEmployees(){
    return await EditEmployeeService.fetchEmployees()
  }

  return (
    <div className="container my-5">
      <div className="card card-body text-center">
        <h5 className="card-title">Pending Approval</h5>
        <table className="table">
          <FormTable approve={ true } fetchEmployees={fetchEmployees} />
        </table>
      </div>
    </div>

  )

}
