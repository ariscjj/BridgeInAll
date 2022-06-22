import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

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
            <li className="nav-item">
              <NavLink
                exact
                to="/countries"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Countries
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/people"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                People
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/payroll"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Payroll
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/benefits"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              Benefits
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/expenses"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              Expenses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/finances"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              Finances
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/legal"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              Legal
              </NavLink>
            </li>      
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
