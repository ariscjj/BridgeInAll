import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubsidiaryService from "./subsidiary.service";
import Flag from "react-world-flags";
import ProfileService from "../auth/profile.service";
import ImportantDocService from "./fileServices/importantDoc.service";
import "./fileServices/importantDocs.css";

export default function SubsidiaryPage({ user }) {
  let { id } = useParams();
  const navigate = useNavigate();

  const [subsidiaries, setSubsidiaries] = useState([]);
  const [profile, setProfile] = useState(null);
  const [importantDocuments, setImportantDocuments] = useState([]);

  useEffect(() => {
    console.log(user);
    if (!subsidiaries.length) {
      onInitialLoad();
      fetchImportantDocuments();
    }
    if (!profile) {
      onProInitialLoad();
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

  async function onProInitialLoad() {
    console.log("setting profile");
    const prof = await ProfileService.fetchProfile(user);
    setProfile(prof);
  }

  const sub = subsidiaries.find((subsidiary) => subsidiary.id === id);
  const filteredDocs = importantDocuments.filter(
    (importantDoc) => importantDoc.subsidiaryId == id
  );

  return (
    <div className="container mt-3">
      <div class="d-grid gap-2 d-md-flex justify-content-md-start p-2">
        <button
          type="button"
          class="btn btn-primary"
          onClick={(e) => navigate("/subsidiarylist")}
        >
          Back
        </button>
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
              <td>
                <Flag code={sub?.country} width="40" />
              </td>
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
        {profile?.level ? (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/editsubsidiary/" + sub?.id)}
          >
            Edit
          </button>
        ) : (
          <div></div>
        )}
        <div className="d-flex flex-wrap">
          {filteredDocs.map((importantDoc) => (
            <div key={importantDoc.id} className="card">
              <img
                src={importantDoc.downloadUrl}
                className="card-img-top importantDoc"
                alt="movie cover"
              />
              <div className="card-body">
                <h5 className="card-title">{importantDoc.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
