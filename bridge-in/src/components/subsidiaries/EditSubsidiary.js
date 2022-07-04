import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import SubsidiaryService from "./subsidiary.service";
import { useParams } from "react-router-dom";
import ImageSelector from "./fileServices/ImageSelector";
import { ImportantDocs } from "./fileServices/importantDocs";
import ImportantDocService from "./fileServices/importantDoc.service";
import FileService from "./fileServices/file.service";



export default function EditSubsidiary() {
  const [name, setName] = useState("");
  const [employeeNum, setEmployeeNum] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  let { id } = useParams();

  const [subsidiaries, setSubsidiaries] = useState([]);

  useEffect(() => {
    if (!subsidiaries.length) {
      onInitialLoad();
    }
  }, []);

  async function onInitialLoad() {
    const subsidiaries = await SubsidiaryService.fetchSubsidiary();
    setSubsidiaries(subsidiaries);
  }

  const subsidiaryToUpdate = subsidiaries.find(
    (subsidiary) => subsidiary.id === id
  );

  async function updateSubsidiary(e) {
    console.log(subsidiaryToUpdate);
    e.preventDefault();
    if (name) {
      console.log("is running for name");
      subsidiaryToUpdate.name = name;
    }
    if (employeeNum) {
      console.log("is running for num");
      subsidiaryToUpdate.count = employeeNum;
    }
    if (address) {
      console.log("is running for address");
      subsidiaryToUpdate.address = address;
    }
    if (status) {
      console.log("is running for status");
      subsidiaryToUpdate.status = status;
    }

    await createNewImportantDoc();


    console.log(subsidiaryToUpdate);
    setName("");
    setEmployeeNum("");
    setAddress("");
    setStatus("");
    setFile(null);
    setFileName("");

    await SubsidiaryService.updateSubsidiary(subsidiaryToUpdate);


    //not sure if this will work to set the subsidiaries
    setSubsidiaries(
      subsidiaries.map((sub) => {
        return sub.id === subsidiaryToUpdate.id ? subsidiaryToUpdate : sub;
      })
    );

   
    
  }

  async function createNewImportantDoc(){
    try {
      const downloadUrl = await uploadFile();
      console.log("is running file upload");

      await ImportantDocService.createImportantDoc(new ImportantDocs({
        id: null,
        name: fileName,
        downloadUrl: downloadUrl,
        subsidiaryId: subsidiaryToUpdate.id,
      }));


      navigate('/subsidiary/' + subsidiaryToUpdate.id);
      
    } catch (err) {
      // TODO handle this
      console.log("error");
    }
  }

  async function uploadFile() {
    console.log("upload file is being called");
    return FileService.uploadImage(file, (progress) => {
      console.log(progress);
    });
  }

  return (
    <div className="container text-center">
      <h1 className="m-3">Update</h1>
      <div class="d-grid gap-2 d-md-flex justify-content-md-start">
      <button type="button" class="btn btn-primary" 
      onClick={(e) => navigate('/subsidiary/' + subsidiaryToUpdate.id)}>Back</button>
      </div>
      <div className="card p-2">
        <form onSubmit={updateSubsidiary}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Name"
          />
          <input
            value={employeeNum}
            onChange={(e) => setEmployeeNum(e.target.value)}
            type="text"
            className="form-control  mb-3"
            placeholder="EmployeeNum"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Address"
          />
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            type="text"
            className="form-control mb-3"
            placeholder="Status"
          />

{/* <div class="input-group mb-3"> 
<div class="input-group-prepend">
    <label class="input-group-text" for="inputGroupSelect01">Options</label>
  </div>
          <select class="custom-select" id="inputGroupSelect01" 
            onChange={(e) => setStatus(e.target.value)}>
            <option selected>Status</option>
            <option value={status}>Incorporating</option>
            <option value={status}>Incorporated</option>
            <option value={status}>WindingDown</option>
            <option value={status}>Closed</option>
          </select>
          </div> */}

      <ImageSelector
            onFileChange={(file) => setFile(file)}
            title = ""
          />
{file ? 
<div className="mb-3">
            <label className="form-label">
              FileName
            </label>
            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          : <></>}

          <div className="d-grid gap-2 mt-4">
            <button className="btn btn-outline-primary" type="submit">
              Update Subsidiary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
