import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

export default function NewSubsidiary(props) {
  const [name, setName] = useState("");
  const [employeeNum, setEmployeeNum] = useState("");
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    await props.onSubsidiaryCreate(
      name,
      selected,
      address,
      employeeNum,
      "incorporating"
    );
    setName("");
    setSelected("");
    setAddress("");
    setEmployeeNum("");
  }

  return (
    <div className="container text-center" style={{ width: 1200 }}>
      <h1 className="m-4">Add a New Subsidiary</h1>
      <div className="ms-3 mt-3 card card-body text-center App ">
        <form onSubmit={onSubmit}>
          <h4>Name</h4>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Name"
          />
          <h4 className="mt-2">Country</h4>
          <ReactFlagsSelect
            searchable={true}
            selected={selected}
            onSelect={(code) => setSelected(code)}
          />
          <h4 className="mt-3">Number of Employees</h4>
          <input
            value={employeeNum}
            onChange={(e) => setEmployeeNum(e.target.value)}
            type="text"
            className="form-control  mb-3"
            placeholder="EmployeeNum"
          />
          <h4 className="mt-2">Address</h4>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Address"
          />
          <div className="container text-center" style={{ width: 250 }}>
            <div className="d-grid gap-2 mt-4">
              <button className="btn btn-primary" type="submit">
                Request to Add Subsidiary
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
