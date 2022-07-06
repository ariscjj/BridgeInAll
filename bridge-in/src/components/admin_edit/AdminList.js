import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ProfileService from "../auth/profile.service";

import "./AdminEmployeeList.js.css";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [adminToUpdate, setAdminToUpdate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    onInitialLoad();
  }, []);

  async function onInitialLoad() {
    try {
      const profiles = await ProfileService.fetchAdmins();
      setAdmins(profiles);
    } catch (err) {
      //console.log("Error ", err);
    }
  }

  async function updateAdmin(admin) {
    try {
      const adminToToggle = admins.find((x) => x.id === admin.id);
      adminToToggle.approved = !adminToToggle.approved;

      await ProfileService.saveProfile(admin);

      setAdmins(
        admins.map((x) => {
          return x.id === admin.id ? adminToToggle : x;
        })
      );
    } catch (err) {
      //TODO
    }
    hideModal();
  }

  function hideModal() {
    setShowModal(false);
    setAdminToUpdate(null);
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Admins</h1>
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th>Admin Name</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name + " " + admin.surname}</td>
              <td>
                {admin.approved ? (
                  <div className="container success text-center">Approved</div>
                ) : (
                  <div className="container danger text-center">Pending</div>
                )}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setAdminToUpdate(admin);
                    setShowModal(true);
                  }}
                >
                  <i className="bi bi-arrow-up"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => hideModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Update admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to update {adminToUpdate?.name}'s admin
          privileges?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => hideModal()}>
            Close
          </button>
          <button
            className="btn btn-success"
            onClick={() => updateAdmin(adminToUpdate)}
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
