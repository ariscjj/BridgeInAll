import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubsidiaryService from "./subsidiary.service";
import ImportantDocService from "./fileServices/importantDoc.service";
import "./fileServices/importantDocs.css"

export default function SubsidiaryPage(userstatus) {
  let { id } = useParams();
  const fakeuserstatus = true;
  const navigate = useNavigate();

  const [subsidiaries, setSubsidiaries] = useState([]);
  const [importantDocuments, setImportantDocuments] = useState([]);

  useEffect(() => {
    if (!subsidiaries.length) {
      onInitialLoad();
      fetchImportantDocuments();

    }
  }, []);

  async function fetchImportantDocuments() {
    try {
      const importantDocs = await ImportantDocService.fetchImportantDocs();
      setImportantDocuments(importantDocs);
    } catch (err) {
        //todo handle errors
    }
  }


  async function onInitialLoad() {
    const subsidiaries = await SubsidiaryService.fetchSubsidiary();
    setSubsidiaries(subsidiaries);
  }

  const sub = subsidiaries.find((subsidiary) => subsidiary.id === id);
  const filteredDocs = importantDocuments.filter(importantDoc => importantDoc.subsidiaryId == id );

  return (
    <div className="container mt-3">
      <div class="d-grid gap-2 d-md-flex justify-content-md-start p-2">
      <button type="button" class="btn btn-primary" 
      onClick={(e) => navigate('/subsidiarylist')}>Back</button>
      </div>
      <div className="card text-center">
        <h1>{sub?.name}</h1>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <td className="fw-bold">Address</td>
              <td>{sub?.address}</td>
            </tr>
            <tr>
              <td className="fw-bold">Country</td>
              <td>{sub?.country}</td>
            </tr>
            <tr>
              <td className="fw-bold">Employee Count</td>
              <td>{sub?.count}</td>
            </tr>
            <tr>
              <td className="fw-bold">Subsidiary Status</td>
              <td>{sub?.status}</td>
            </tr>
          </tbody>
        </table>
        {fakeuserstatus ? (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/editsubsidiary/" + sub?.id)}
          >
            Edit
          </button>
        ) : (
          <div></div>
        )}
 <div className='d-flex flex-wrap'>
        {
          filteredDocs.map(importantDoc => 
            
            <div key={importantDoc.id} className="card" >
              <img src={importantDoc.downloadUrl} className="card-img-top importantDoc" alt="movie cover" />
              <div className="card-body">
                <h5 className="card-title">{importantDoc.name}</h5>
              </div>
            </div> 
) 
        } 
      </div>


      </div>
    </div>
  );
}
