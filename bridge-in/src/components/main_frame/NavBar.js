import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import ProfileService from "../auth/profile.service";
import { Role } from "../auth/Profile";
import "./NavBar.css";

function NavBar(props) {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!profile && props.user) {
      onProInitialLoad();
    }
  });

  async function onProInitialLoad() {
    console.log("setting profile");
    const prof = await ProfileService.fetchProfile(props.user);
    setProfile(prof);
    console.log(prof);
  }

  async function onLogoutClicked() {
    setLoading(true);
    await signOut(auth);
    navigate("/");
    setLoading(false);
  }

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Bridge-In
            <i className="fas fa-code"></i>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {props.user && profile ? (
              <>
                {console.log(profile)}
                {profile.role === Role.employee ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/addemployee"
                        //activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                      >
                        Onboard Employee
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                {profile.role === Role.company ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/employeelist"
                        //activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                      >
                        Employee List
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/subsidiarylist"
                        //activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                      >
                        Subsidiary List
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/addsubsidiary"
                        //activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                      >
                        Add Subsidiary
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                {console.log(
                  "this is the admin profile status: " + profile?.admin
                )}
                {console.log("this is the profile status: " + profile)}
                {profile.role === Role.admin ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/addemployee"
                        //activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                      >
                        Add Employee
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/subsidiarylist"
                        //activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                      >
                        Subsidiary List
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/addsubsidiary"
                        //activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                      >
                        Add Subsidiary
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                {profile.role === Role.superAdmin ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/addemployee"
                        //activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                      >
                        Add Employee
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/subsidiarylist"
                        //activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                      >
                        Subsidiary List
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/addsubsidiary"
                        // //activeClassName="active"

                        className="nav-links active"
                        onClick={handleClick}
                      >
                        Add Subsidiary
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                <li className="nav-item">
                  <button
                    className="btn"
                    style={{ borderColor: "white", color: "white" }}
                    loading={loading}
                    onClick={onLogoutClicked}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/register"
                    //activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    //activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
