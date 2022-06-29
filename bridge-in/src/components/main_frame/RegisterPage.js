import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase/firebase";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await ProfileService.saveProfile(
        new Profile({
          id: userCredentials.user.uid,
          name: name,
          surname,
          surname,
          imageUrl: downloadUrl,
        })
      );

      console.log(userCred);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="container my-4">
      <div className="card card-body">
        <h1>Register</h1>

        <h4>Please enter your email and password to register</h4>

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
