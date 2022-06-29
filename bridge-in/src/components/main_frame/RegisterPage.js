import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase/firebase';

import ProfileService from '../../main_frame/profile.service';
import { Profile } from '../../main_frame/profile';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isBridgeInUser, setisBridgeInUser] = useState('');

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

        await ProfileService.saveProfile(new Profile({
        id: userCredentials.user.uid,
        name: name,
        surname, surname,
        isBridgeInUser: isBridgeInUser,
     
      }))


      console.log(userCredentials);
      navigate('/');

    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className='container my-4'>
      <div className='card card-body'>

        <h1>Register</h1>

        <form className="mt-4" onSubmit={onFormSubmit}>

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

    

          <div className="mb-3">
            <label className="form-label">
              Email address
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
             Are you a BridgeIN user?
            </label>

            <input type="radio"
              value={isBridgeInUser}
              onChange={(e) => setisBridgeInUser(e.target.value)}
              type="boolean"
              className="form-control"
              required
            />
          </div>

          <div className='text-center'>
            <Button loading={loading} className='px-5'>
              Register
            </Button>
          </div>
        </form>
       
      </div>
    </div>
  )
}