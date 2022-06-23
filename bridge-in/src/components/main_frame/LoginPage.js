import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase/firebase';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log(userCred);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className='container my-4'>

      <div className='card card-body'>

        <h1>Login</h1>

        <p>Please enter your email and password to login</p>

        <form onSubmit={onFormSubmit}>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control" />
          </div>

          <div className='d-flex justify-content-end mt-4'>
            <button type='submit' className='btn btn-primary px-5'>
              Login
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}