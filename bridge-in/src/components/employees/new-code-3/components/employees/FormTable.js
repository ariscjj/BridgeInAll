import React, { useState, useEffect } from 'react';
import Flag from "react-world-flags";

import StatusBox from "../../common/StatusBox";
import EmployeeService from '../../services/employee.service.js'; 
import EditEmployeeService from '../../services/editEmployee.service.js'; 

export default function FormTable(props){
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (!employees.length){
      onInitialLoad(); 
    }
  }, []); 

  async function onInitialLoad(){
    const employees = await props.fetchEmployees(); 
    setEmployees(employees);
  }

  async function approve(edit){
    console.log("APPROVING");
    await EmployeeService.updateEmployee(edit);
    console.log("DELETING");
    await EditEmployeeService.deleteEmployee(edit);
    onInitialLoad();
  }


  function colorStatus(status){
    const base = "badge text-bg-"
    if(status === "Hired"){
      return base + "success"
    }
    else if(status === "Onboarding"){
      return base + "warning"
    }
    else if(status === "Employed"){
      return base + "primary"
    }
    else if(status === "Offboarding"){
      return base + "info"
    }
    else if(status === "Terminated"){
      return base+"secondary"
    }
    else{
      return base+"dark"

    };
  };

  return (
    <>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Country</th>
              <th>Role</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map((employee) => 
                <tr key={employee.id}>
                  <td>
                    <img
                      src={employee.photo}
                      alt="profile pic"
                      width="30" 
                      height="30" 
                      className="bi rounded-circle"  
                      viewBox="0 0 16 16" 
                    />
                  </td>

                <td>{employee.name}</td>
                <td>
                  <Flag code={employee.country} width="40" />
                    <p>{employee.country}</p></td>
                <td>{employee.role}</td>
                <td><p><b>Email:</b> {employee.email}
                  <br />
                       <b>Phone:</b> {employee.phone}</p>
                </td>
                <td> 
                  <StatusBox 
                    status={employee.status}
                    colorStatus = {colorStatus}
                  >{employee.status}</StatusBox>
                </td>
                  {
                    props.approve ? 
                <td> 
                  <button type="button" 
                   class="btn-sm btn-primary"
                   value={employee}
                   onClick={(e) => approve(employee)}>Approve</button>
                </td>
                :
                <></>
                  }
              </tr>
            )
          }
        </tbody>
    </>
  )

}
