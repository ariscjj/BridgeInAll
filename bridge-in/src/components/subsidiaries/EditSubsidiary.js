import React, { useState, useEffect } from "react";
import SubsidiaryService from "./subsidiary.service";
import { useParams } from "react-router-dom";

export default function EditSubsidiary() {
  const [name, setName] = useState("");
  const [employeeNum, setEmployeeNum] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  let { id } = useParams();

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

  const subsidiaryToUpdate = subsidiaries.find(
    (subsidiary) => subsidiary.id === id
  );

  async function updateSubsidiary(e) {
    console.log(subsidiaryToUpdate);
    e.preventDefault();
    if (name) {
      console.log("is running for name");
      subsidiaryToUpdate.name = name;
    }
    if (employeeNum) {
      console.log("is running for num");
      subsidiaryToUpdate.count = employeeNum;
    }
    if (address) {
      console.log("is running for address");
      subsidiaryToUpdate.address = address;
    }
    if (status) {
      console.log("is running for status");
      subsidiaryToUpdate.status = status;
    }

    console.log(subsidiaryToUpdate);
    setName("");
    setEmployeeNum("");
    setAddress("");
    setStatus("");

    await SubsidiaryService.updateSubsidiary(subsidiaryToUpdate);

    //not sure if this will work to set the subsidiaries
    setSubsidiaries(
      subsidiaries.map((sub) => {
        return sub.id === subsidiaryToUpdate.id ? subsidiaryToUpdate : sub;
      })
    );
  }

  return (
    <div className="container text-center">
      <h1 className="m-3">Update</h1>
      <div className="card p-2">
        <form onSubmit={updateSubsidiary}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Name"
          />
          <input
            value={employeeNum}
            onChange={(e) => setEmployeeNum(e.target.value)}
            type="text"
            className="form-control  mb-3"
            placeholder="EmployeeNum"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Address"
          />
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Status"
          />

          <div className="d-grid gap-2 mt-4">
            <button className="btn btn-outline-primary" type="submit">
              Update Subsidiary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
