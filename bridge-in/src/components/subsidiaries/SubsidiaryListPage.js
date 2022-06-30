import React, { useState, useEffect } from "react";
import SubsidiaryService from "./subsidiary.service";
import "bootstrap/dist/css/bootstrap.css";
import Flag from "react-world-flags";
import { Link } from "react-router-dom";

export default function SubsidiaryListPage() {
  const [subsidiaries, setSubsidiaries] = useState([]);

  useEffect(() => {
    if (!subsidiaries.length) {
      onInitialLoad();
    }
  }, []);

  async function onInitialLoad() {
    const subsidiaries = await SubsidiaryService.fetchSubsidiary();
    setSubsidiaries(subsidiaries);
  }

  console.log(subsidiaries);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Subsidiary List</h1>
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Country</th>
            <th>Address</th>
            <th>Employees</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {subsidiaries.map((sub) => (
            <tr key={sub.id}>
              <td>
                <Link to={"/subsidiary/" + sub.id}>{sub.name}</Link>
              </td>
              <td>
                <Flag code={sub.country} width="40" />
              </td>
              <td>{sub.address}</td>
              <td>{sub.count}</td>
              <td>
                <div
                  className={
                    "d-inline-flex justify-content-center rounded text-center container bg-" +
                    sub.color
                  }
                >
                  {sub.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
