<<<<<<< HEAD
import React from "react";

export default function EditSubsidiary() {
  return <div>EditSubsidiary</div>;
=======
import React, {useState} from 'react'
import { Subsidiary } from './Subsidiary';
import SubsidiaryService from "./SubsidiaryService";

export default function EditSubsidiary(props) {


    const [name, setName] = useState("");
    const [employeeNum, setEmployeeNum] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");


    //this needs to be set to the subsidiary that is passed in
    const subsidiaryToUpdate = new Subsidiary(1234, "test", "America", "421 w melrose", "3", "incorporating");
  
    async function updateSubsidiary(e){
        console.log(subsidiaryToUpdate);
        e.preventDefault();
        if(name){
            console.log("is running for name");
            subsidiaryToUpdate.name =name;   
        }
        if(employeeNum){
            console.log("is running for num");
            subsidiaryToUpdate.employeeNum = employeeNum;
            
        }
        if(address){
            console.log("is running for address");
            subsidiaryToUpdate.address = address;
            
        }
        if(status){
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
        props.setSubsidiaries(subsidiaries.map((sub) => {
            return sub.id === subsidiaryToUpdate.id ? subsidiaryToUpdate : sub;
          }));


    }

    return (
    <div className = "container">
        <div className = "card">
    <form onSubmit={updateSubsidiary}>
      <input
          value = {name}
          onChange ={(e) =>  setName(e.target.value)}

          type="text"
          className="form-control mb-3"
          placeholder="Name"
        />
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
        <input
          value = {status}
          onChange ={(e) => setStatus(e.target.value)}

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
  )
>>>>>>> f23fa9273bf95a61a14251d857a835458a0c9aa4
}
