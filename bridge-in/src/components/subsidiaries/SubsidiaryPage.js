import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubsidiaryService from "./subsidiary.service";

export default function SubsidiaryPage() {
  let { id } = useParams();
  const userstatus = true;
  const navigate = useNavigate();

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

  const sub = subsidiaries.find((subsidiary) => subsidiary.id === id);

  return (
    <div className="container mt-3">
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
        {
          /*props.*/ userstatus ? (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/editsubsidiary/" + sub?.id)}
            >
              Edit
            </button>
          ) : (
            <div></div>
          )
        }
      </div>
    </div>
  );
}
