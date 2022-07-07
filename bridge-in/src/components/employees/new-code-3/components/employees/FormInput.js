import React, { useState, useEffect } from 'react'; 
import ReactFlagsSelect from "react-flags-select";
import DatePicker from "react-date-picker";
// import "react-datepicker/dist/react-datepicker.css";

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import FileService from '../../services/file.service';
import EmployeeService from '../../services/employee.service';
import ImageSelector from './ImageSelector';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function FormInput(props){
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState(""); 
  const [birthday, setBirthday] = useState(new Date());
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [numbers, setNumbers] = useState(true);
  const [letters, setLetters] = useState(true);
  // const [idDocUpNum, setIDDocUpNum] = useState("");
  // const [fiscalIdentNum, setFiscIdentNum] = useState("");
  // const [socSecNum, setSocSecNum] = useState("");
  // const [bankIBAN, setBankIBAN] = useState("");
  const [employees, setEmployees] = useState([]);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!employees.length){
      onInitialLoad(); 
    }
  }, []); 

  async function onInitialLoad(){
    const employees = await EmployeeService.fetchEmployees(); 
    setEmployees(employees);
     if(props.empId !== "") {
      let empId = props.empId
      console.log("EDITING ID");
      console.log(id);
      let emp = employees.find((employee) => employee.id === empId)
      setId(empId);
      setPhoto(emp.photo);
      console.log("EMP PHOTO");
      console.log(emp.photo);
      console.log(photo);
      setName(emp.name);
      // setBirthday(emp.birthday);
      setAddress(emp.address);

      setPostalCode(emp.postalCode);
      setCity(emp.city);
      setCountry(emp.country);
      setRole(emp.role);
      setEmail(emp.email);
      setPhone(emp.phone);
      setStatus(emp.status);
      // setIDDocUpNum(emp.idDocUpNum);
      // setFiscIdentNum(emp.fiscalIdentNum);
      // setSocSecNum(emp.socSecNum);
      // setBankIBAN(emp.bankIBAN);
     }

  
    console.log("EMPLOYEE ID");
    console.log(id);
    console.log("set attribute values");
    console.log(phone);
  }

  async function onEmployeeFormSubmit(e) {
    e.preventDefault(); 
    try {
      const downloadUrl = await FileService.uploadImage(photo, (progress) => {
        console.log('Upload Progress: ', progress);
      });

    props.onEmployeeFormSubmit(
      id,
      downloadUrl, 
      name, 
      birthday, 
      address, 
      postalCode, 
      city, 
      country, 
      role, 
      email, 
      phone, 
      status,
      // idDocUpNum,
      // fiscalIdentNum,
      // socSecNum,
      // bankIBAN
      )
    setSuccess(true);

    // setPhoto('');
    // setName('');
    // setBirthday('');
    // setAddress('');
    // setPostalCode('');
    // setCity('');
    // setCountry('');
    // setRole('');
    // setEmail('');
    // setPhone('');
    // setStatus('');
    // setIDDocUpNum('');
    // setFiscIdentNum('');
    // setSocSecNum('');
    // setBankIBAN('');
    } catch (err) {
      // TODO handle this
    }
  }

  function stringContainsNumber(_string) {
    //setNumbers(true);
    return /\d/.test(_string);
  }

  function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }  
  function validateEmail(){
    var validator = require("email-validator");
    return validator.validate(email);
  }

  return (
    <div>
        <form onSubmit={onEmployeeFormSubmit}>
          {
            photo ? 
              <div className='text-center mb-3'>
              <ImageSelector 
                onFileChange={(photo) => setPhoto(photo)}
                title="Profile Image"
                downloadUrl={photo}
              />
              </div>
              :
              <div className='text-center mb-3'>
              <ImageSelector 
                onFileChange={(photo) => setPhoto(photo)}
                title="Profile Image"
              />
              </div>
          }

          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Name</label>
            <input 
              value={name}
              onChange={(e) => {
                if(stringContainsNumber(e.target.value)){
                  setLetters(false)
                  } else {
                    setName(e.target.value);
                    setLetters(true)}}}
              type="text" 
              className="form-control"
              placeholder="Name" />
              {
                letters ? 
                <></>
                :
                <div class="alert alert-danger mt-3" role="alert">
                    Letter Inputs only!
                </div>  
              }
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Birthday</label>
            <DatePicker value={birthday} onChange={setBirthday} />
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Address</label>
            <input 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text" 
              className="form-control"
              placeholder="Address" />
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">City</label>
            <input 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text" 
              className="form-control"
              placeholder="City" />
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Postal Code</label>
            <input 
              value={postalCode}
              onChange={(e) => {
                if(!onlyNumbers(e.target.value)){
                  setNumbers(false)
                  } else {
                    setPostalCode(e.target.value);
                    setNumbers(true)}}}
              type="text" 
              className="form-control"
              placeholder="PostalCode" />
              {
                numbers ? 
                <></>
                :
                <div class="alert alert-danger mt-3" role="alert">
                    Number Inputs only!
                </div>  
              }
          </div>

          <div className="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Country</label>
              <ReactFlagsSelect
                value={country}
                searchable={true}
                selected={country}
                onSelect={(country) => setCountry(country)}
              />
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Role</label>
            <input 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              type="text" 
              className="form-control"
              placeholder="Role" />
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="name@address.com" />
          </div>
              {
                validateEmail({email}) ? 
                <></>
                :
                <div class="alert alert-danger mt-3" role="alert">
                    Please enter valid email
                </div>  
              }


          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Phone</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}/>
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Status</label>
              <select 
                class="form-select" 
                aria-label="Default select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                type="text">
                <option selected>Select...</option>
                <option value="Hired">Hired</option>
                <option value="Onboarding">Onboarding</option>
                <option value="Employed">Employed</option>
                <option value="Offboarding">Offboarding</option>
                <option value="Terminating">Terminated</option>
              </select>
          </div>

{/*                       
          <div className='mb-3'>
            <label for="exampleFormControlInput1" class="form-label">ID Document Upload Number</label>
            <input
              value={idDocUpNum}
              onChange={(e) => {
                if(!onlyNumbers(e.target.value)){
                  setNumbers(false)
                  } else {
                    setIDDocUpNum(e.target.value);
                    setNumbers(true)}}}
              type="text" 
              className="form-control"
              placeholder="11111111" />
              {
                numbers ? 
                <></>
                :
                <div class="alert alert-danger mt-3" role="alert">
                    Number Inputs only!
                </div>  
              }
          </div>

          <div className='mb-3'>
            <label for="exampleFormControlInput1" class="form-label">Fiscal Identification Number</label>
            <input
              value={fiscalIdentNum}
              onChange={(e) => {
                if(!onlyNumbers(e.target.value)){
                  setNumbers(false)
                  } else {
                    setFiscIdentNum(e.target.value);
                    setNumbers(true)}}}
              type="text" 
              className="form-control"
              placeholder="55555555" />
              {
                numbers ? 
                <></>
                :
                <div class="alert alert-danger mt-3" role="alert">
                    Number Inputs only!
                </div>  
              }
          </div>

          <div className='mb-3'>
            <label for="exampleFormControlInput1" class="form-label">Social Security Number</label>
            <input
              value={socSecNum}
              onChange={(e) => {
                if(!onlyNumbers(e.target.value)){
                  setNumbers(false)
                  } else {
                    setSocSecNum(e.target.value);
                    setNumbers(true)}}}
              type="text" 
              className="form-control"
              placeholder="12000000000" />
              {
                numbers ? 
                <></>
                :
                <div class="alert alert-danger mt-3" role="alert">
                    Number Inputs only!
                </div>  
              }
          </div>

          <div className='mb-3'>
            <label for="exampleFormControlInput1" class="form-label">Bank IBAN</label>
            <input
              value={bankIBAN}
              onChange={(e) => setBankIBAN(e.target.value)}
              type="text" 
              className="form-control"
              placeholder="PT50 0000 0000 0000 0000 0000 0" />
          </div>  */}
          
          <button className="btn btn-outline-secondary" type="submit">
            Submit
          </button> 
        </form>
      {
        success ? 
            <div class="alert alert-success mt-3" role="alert">
              Form successfully submitted!
            </div> 
            : 
            <></>
      }
    </div>

  )

}


