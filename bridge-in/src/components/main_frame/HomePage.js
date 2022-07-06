import React, { useState, useEffect } from "react";
import ProfileService from "../auth/profile.service";
import { useNavigate } from "react-router-dom";
import { Role } from "../auth/Profile";

export default function HomePage(props) {
  const navigate = useNavigate();
  //const [url, setUrl] = useState("");
  const [profile, setProfile] = useState(null);

  // async function getUrl(prof) {
  //   const val = await ProfileService.homeUrl(prof?.role, prof?.approved);
  //   console.log(val, prof);
  //   setUrl(val);
  // }

  useEffect(() => {
    if (!profile && props.user) {
      onProInitialLoad();
    }
  }, [props.user]);

  async function onProInitialLoad() {
    const prof = await ProfileService.fetchProfile(props.user);
    setProfile(prof);
  }

  return (
    <div className="container text-center m-5">
      {props.user && profile ? (
        <>
          {profile.role === Role.employee ? (
            <>{navigate("/employeehome")}</>
          ) : (
            <></>
          )}
          {profile.role === Role.company ? (
            <>{navigate("/subsidiarylist")}</>
          ) : (
            <></>
          )}
          {profile.role === Role.admin ? (
            <>
              {profile.approved ? (
                <>
                  <h1>Welcome Admin!</h1>
                </>
              ) : (
                <>
                  <div className=" border">
                    <h1>You are still pending approval</h1>
                  </div>
                </>
              )}
            </>
          ) : (
            <></>
          )}
          {profile.role === Role.superAdmin ? (
            <>
              <h1>Welcome superAdmin!</h1>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <h1>Welcome to Bridge in HomePage</h1>
        </>
      )}
    </div>
  );
}
