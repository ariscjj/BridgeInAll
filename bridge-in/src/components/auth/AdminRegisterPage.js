import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Role } from "./Profile";
import ProfileService from "./profile.service";
import { auth } from "../firebase/firebase";

export default function AdminRegisterPage(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [url, setUrl] = useState("");

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      props.onProfileCreate(
        userCred.user.uid,
        name,
        surname,
        Role.admin,
        false
      );

      //setUrl(ProfileService.homeUrl(Role.admin, false));

      setName("");
      setSurname("");
      setEmail("");
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
