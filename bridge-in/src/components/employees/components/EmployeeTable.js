import React, { useState, useEffect } from "react";
import Flag from "react-world-flags";

import StatusBox from "../common/StatusBox";
import EmployeeService from "../services/employee.service.js";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (!employees.length) {
      onInitialLoad();
    }
  }, []);

  async function onInitialLoad() {
    const employees = await EmployeeService.fetchEmployees();
    setEmployees(employees);
  }

  function colorStatus(status) {
    //    console.log(status);
    const base = "badge text-bg-";
    if (status === "Hired") {
      return base + "success";
    } else if (status === "Onboarding") {
      return base + "warning";
    } else if (status === "Employed") {
      return base + "primary";
    } else if (status === "Offboarding") {
      return base + "info";
    } else if (status === "Terminated") {
      return base + "secondary";
    } else {
      return base + "dark";
    }
  }

  return (
    <div className="container my-5">
      <div className="card card-body text-center">
        <h5 className="card-title">Employees</h5>
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
            {employees.map((employee) => (
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
                  <p>{employee.country}</p>
                </td>
                <td>{employee.role}</td>
                <td>
                  <p>
                    <b>Email:</b> {employee.email}
                    <br />
                    <b>Phone:</b> {employee.phone}
                  </p>
                </td>
                <td>
                  <StatusBox status={employee.status} colorStatus={colorStatus}>
                    {employee.status}
                  </StatusBox>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
