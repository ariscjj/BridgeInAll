import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  //get the dropdowns from the document 
  const dropdowns = document.querySelectorAll('.dropdown');

  //loop through all dropdown elements
  dropdowns.forEach(dropdown => {
    //get inner elements from each dropdown
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
      select.classList.toggle('select-clicked');
      caret.classList.toggle('caret-rotate');
      menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
      options.addEventListener('click', () => {
        selected.innerText = option.innerText;
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
        options.forEach(option => {
          option.classList.add('active');
        });
      });
    });
  });

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
