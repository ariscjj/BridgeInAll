import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import './AdminEmployeeList.js.css';
import EmployeeService from '../services/employee.service';
import FileService from '../services/file.service';

export default function EmployeeList() {

  const [employees, setEmployee] = useState([]);
  const [employeeToUpdate, setemployeeToUpdate] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmployees()
  }, []);

  async function fetchEmployees() {
    try {
      const employees = await EmployeeService.fetchEmployees();
      setEmployee(employees);
    } catch (err) {

    }
  }

  //ADD NEW CODE HERE
  async function updateEmployee() {
    try {
      // await EmployeeService.deleteEmployee(employeeToRemove.id);
      // await FileService.deleteFile(employeeToRemove.downloadUrl);

      // setEmployee(employees.filter(emploee => emploee.id !== employeeToRemove.id));
      hideModal();
    } catch (err) {

    }

  }

  function hideModal() {
    setemployeeToUpdate(null);
    setShowModal(false);
  }

  return (
    <div className='container my-4'>
  

      <div className='d-flex flex-wrap'>
        {
          employees.map(emploee =>
            <div key={emploee.id} className="card" >

              <img src={emploee.photo} className="card-img-top movie-img" alt="profile cover" />
              
              <div className="card-body">
                <h5 className="card-title">{emploee.name}</h5>
              </div>

              <div className='remove-button btn btn-secondary' onClick={() => {
                setemployeeToUpdate(emploee);
                setShowModal(true);
              }}>
                <i className='bi bi-arrow-up'></i>
              </div>
            </div>
          )
        }
      </div>


      <Modal show={showModal} onHide={() => hideModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to update {employeeToUpdate?.name}'s admin privileges ?
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={() => hideModal()}>
            Close
          </button>
          <button className='btn btn-success' onClick={updateEmployee} >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
