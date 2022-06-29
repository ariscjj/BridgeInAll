import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase/firebase";

export default function RegisterPage() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

=======
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  
>>>>>>> 4beb42212cd874a672f8fba2d1211e6e10a0dd85
  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
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
        <div className='mb-3'>
            <label className='form-label'>
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>
              Surname
            </label>
            <input
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              type="text"
              className='form-control'
              required
            />
          </div>



        <p>Please enter your email and password to register</p>

        <form onSubmit={onFormSubmit}>
<<<<<<< HEAD
=======


        <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="string"
              className="form-control" />
          </div>j

      
          <div className='mb-3'>
            <label className='form-label'>
              Name
            </label>
            <input

              type="text"
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>
              Surname
            </label>
            <input
        
              type="text"
              className='form-control'
              required
            />
          </div>


>>>>>>> 4beb42212cd874a672f8fba2d1211e6e10a0dd85
          <div className="mb-3">
            <label className="form-label">Email address</label>
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
