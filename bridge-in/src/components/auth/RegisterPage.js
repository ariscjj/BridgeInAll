import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Role } from "./Profile";
import ProfileService from "./profile.service";
import { auth } from "../firebase/firebase";

export default function RegisterPage(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState(Role.employee);
  const [url, setUrl] = useState("");

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      props.onProfileCreate(userCred.user.uid, name, surname, role, false);

      //console.log(userCred);
      //setUrl(ProfileService.homeUrl(role, false));
      setName("");
      setSurname("");
      setEmail("");
      setRole(null);
      setPassword("");

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="container my-4">
      <div className="card card-body">
        <h1>Register</h1>

        <h4>Please enter your info to register</h4>

        <form onSubmit={onFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              value={name}
              type="text"
              className="form-control"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Surname</label>
            <input
              value={surname}
              type="text"
              className="form-control"
              required
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>
          <div className="form-check form-check-inline required">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              required
              checked={role === Role.employee}
              onChange={(e) => setRole(Role.employee)}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Employee
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              required
              checked={role === Role.company}
              onChange={(e) => setRole(Role.company)}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Company
            </label>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-primary px-5">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
