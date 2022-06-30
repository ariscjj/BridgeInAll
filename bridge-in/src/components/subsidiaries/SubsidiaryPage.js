import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubsidiaryService from "./subsidiary.service";
import Flag from "react-world-flags";
import ProfileService from "../auth/profile.service";

export default function SubsidiaryPage({ user }) {
  let { id } = useParams();
  const navigate = useNavigate();

  const [subsidiaries, setSubsidiaries] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log(user);
    if (!subsidiaries.length) {
      onSubInitialLoad();
    }
    if (!profile) {
      onProInitialLoad();
    }
  }, []);

  async function onSubInitialLoad() {
    const subsidiaries = await SubsidiaryService.fetchSubsidiary();
    setSubsidiaries(subsidiaries);
  }

  async function onProInitialLoad() {
    console.log("setting profile");
    const prof = await ProfileService.fetchProfile(user);
    setProfile(prof);
  }

  console.log("user ", { user });
  console.log("profile ", { profile });
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
      </div>
    </div>
  );
}
