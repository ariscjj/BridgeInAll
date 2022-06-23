import React, {Components, useState} from 'react'; 

import { Subsidiary } from '../models/Subsidiary';
import SubsidiaryService from "./SubsidiaryService"; 
import ReactFlagsSelect from "react-flags-select"; 
import SubsidiaryListPage from './SubsidiaryListPage';


export default function NewSubsidiary(props) {

    const [name, setName] = useState("");
    const [employeeNum, setEmployeeNum] = useState("");
    const [address, setAddress] = useState("");
    const [selected, setSelected] = useState("");

    async function onSubmit(e){
        e.preventDefault();
        await props.onSubsidiaryCreate(name, selected, address, employeeNum, "incorporating");
        console.log(name, selected, employeeNum, address);
        setName('');
        setSelected('');
        setAddress('');
        setEmployeeNum("");
      }

  return (
    <div className="card card-body text-center App">
        
    <form onSubmit={onSubmit}>
      <input
          value = {name}
          onChange ={(e) => setName(e.target.value)}

          type="text"
          className="form-control mb-3"
          placeholder="Name"
        />
        <ReactFlagsSelect
    searchable = {true}
    selected={selected}
    onSelect={(code) => setSelected(code)}
  />; 
        <input

          value={employeeNum}
          onChange = {(e) => setEmployeeNum(e.target.value)}

          type="text"
          className="form-control  mb-3"
          placeholder="EmployeeNum"
        /> 
        <input
          value = {address}
          onChange ={(e) => setAddress(e.target.value)}

          type="text"
          className="form-control mb-3"
          placeholder="Address"
        />

      <div className="d-grid gap-2 mt-4">
        <button className="btn btn-outline-primary" type="submit">
          Request to Add Subsidiary
        </button>
      </div>
  
    </form>

  </div>
  )
}
