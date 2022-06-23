import React from 'react';

import StatusBox from "../../common/StatusBox";


export default function EmployeeTable(props){
  // const catURL = "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  const flagURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png";
  const gwURL = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJwDuMgkzmoaR8Vpzk0oiuxnb2Q9q5_S9Jqmbw%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1";

  function colorStatus(status){
//    console.log(status);
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
    <div>
      <table className="table">
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
            props.employees.map((employee) => 
              <tr key={employee.id}>
                <td>
                  <img
                    src={gwURL}
                    alt="profile pic"
                    width="30" 
                    height="30" 
                    className="bi rounded-circle"  
                    viewBox="0 0 16 16" 
                  />
                    {/* <p>{employee.photo}</p> */}
                </td>

                <td>{employee.name}</td>
                <td>
                  <img src={flagURL}
                    alt="countryflag"
                    width="40" 
                    height="30" 
                    className="bi"  
                    viewBox="0 0 16 24" />
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
              </tr>
            )
          }
        </tbody>
      </table>

    </div>

  )

}
