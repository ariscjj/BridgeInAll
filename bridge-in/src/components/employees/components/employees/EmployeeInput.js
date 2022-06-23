import React, { useState } from "react";

export default function EmployeeInput(props) {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  function onEmployeeFormSubmit(e) {
    e.preventDefault();
    props.onEmployeeCreate(photo, name, country, role, email, phone, status);
    setPhoto("");
    setName("");
    setCountry("");
    setRole("");
    setEmail("");
    setPhone("");
    setStatus("");
  }
  return (
    <div className="container text-center" style={{ width: 1200 }}>
      <h1 className="m-4">OnBoard a New Employee</h1>
      <div className="m-3 card card-body text-center">
        <form onSubmit={onEmployeeFormSubmit}>
          <div className="mb-3">
            <h4 className="text-center">Name</h4>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <h4 className="text-center">Photo</h4>
            <div className="input-group mb-3">
              <input
                type="file"
                class="form-control"
                id="inputGroupFile02"
                accept=".png, .jpg, .jpeg"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <h4 className="text-center">Country</h4>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Country"
            />
          </div>
          <div className="mb-3">
            <h4 className="text-center">Role</h4>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Role"
            />
          </div>
          <div className="mb-3">
            <h4 className="text-center">Email</h4>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <h4 className="text-center">Phone</h4>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Phone"
            />
          </div>

          <div className="mb-3">
            <h4 className="text-center">Status</h4>
            <select
              class="form-select"
              aria-label="Default select example"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              type="text"
            >
              <option selected>Select...</option>
              <option value="Hired">Hired</option>
              <option value="Onboarding">Onboarding</option>
              <option value="Employed">Employed</option>
              <option value="Offboarding">Offboarding</option>
              <option value="Terminating">Terminated</option>
            </select>
          </div>
          <button className="btn btn-outline-secondary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
