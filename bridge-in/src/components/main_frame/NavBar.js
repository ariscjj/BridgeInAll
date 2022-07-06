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
  }, [props.user]);

  async function onProInitialLoad() {
    //console.log("setting profile");
    const prof = await ProfileService.fetchProfile(props.user);
    //console.log(prof.name, " ", prof);
    setProfile(prof);
  }

  async function onLogoutClicked() {
    setLoading(true);
    await signOut(auth);
    setProfile(null);
    props.onLogoutClicked();
    navigate("/");
    setLoading(false);
  }

  //get the dropdowns from the document
  const dropdowns = document.querySelectorAll(".dropdown");

  //loop through all dropdown elements
  dropdowns.forEach((dropdown) => {
    //get inner elements from each dropdown
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    select.addEventListener("click", () => {
      select.classList.toggle("select-clicked");
      caret.classList.toggle("caret-rotate");
      menu.classList.toggle("menu-open");
    });

    options.forEach((option) => {
      options.addEventListener("click", () => {
        selected.innerText = option.innerText;
        select.classList.remove("select-clicked");
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
        options.forEach((option) => {
          option.classList.add("active");
        });
      });
    });
  });

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact="true" to="/" className="nav-logo">
            Bridge-In
            <i className="fas fa-code"></i>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* {//console.log(profile.role)} */}
            {props.user && profile ? (
              <>
                {profile.role === Role.employee ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        exact="true"
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
                        exact="true"
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
                        exact="true"
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
                        exact="true"
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
                {profile.role === Role.admin ? (
                  <>
                    {profile.approved ? (
                      <>
                        <li className="nav-item">
                          <NavLink
                            exact="true"
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
                            exact="true"
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
                            exact="true"
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
                  </>
                ) : (
                  <></>
                )}
                {profile.role === Role.superAdmin ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        exact="true"
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
                        exact="true"
                        to="/approveadmin"
                        //activeClassName="active"
                        className="nav-links"
                        onClick={handleClick}
                      >
                        Admin Approval
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        exact="true"
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
                        exact="true"
                        to="/addsubsidiary"
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
                <li className="nav-item">
                  <button
                    className="btn"
                    style={{ borderColor: "white", color: "white" }}
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
                    exact="true"
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
                    exact="true"
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
