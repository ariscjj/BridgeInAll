import React, { useEffect, useState } from "react";
import NavBar from "./components/main_frame/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import EmployeeTable from "./components/employees/components/EmployeeTable";
import EmployeeInput from "./components/employees/components/EmployeeInput";
import SubsidiaryListPage from "./components/subsidiaries/SubsidiaryListPage";
import NewSubsidiary from "./components/subsidiaries/NewSubsidiary";
import HomePage from "./components/main_frame/HomePage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import SubsidiaryPage from "./components/subsidiaries/SubsidiaryPage";
import EditSubsidiary from "./components/subsidiaries/EditSubsidiary";
import AdminRegisterPage from "./components/auth/AdminRegisterPage";
import AdminList from "./components/admin_edit/AdminList";

import { Subsidiary } from "./components/subsidiaries/Subsidiary";
import SubsidiaryService from "./components/subsidiaries/subsidiary.service";
import { auth } from "./components/firebase/firebase";
import { Profile } from "./components/auth/Profile";
import ProfileService from "./components/auth/profile.service";

import Spinner from "./components/common/Spinner";
import RequireAuth from "./components/common/RequireAuth";

function App() {
  const [subsidiaries, setSubsidiaries] = useState([]);
  const [user, setUser] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsUserUpdated(true);
    });
  }, []);

  async function onSubsidiaryCreate(name, country, address, count, status) {
    const subsidiary = await SubsidiaryService.createSubsidiary(
      new Subsidiary(null, name, country, address, count, status)
    );
    setSubsidiaries([...subsidiaries, subsidiary]);
  }

  async function onProfileCreate(id, name, surname, role, approved) {
    const profile = await ProfileService.saveProfile(
      new Profile(id, name, surname, role, approved)
    );
    setProfiles([...profiles, profile]);
  }

  function onLogoutClicked() {
    setUser(null);
  }

  return (
    <>
      <BrowserRouter>
        <NavBar user={user} onLogoutClicked={onLogoutClicked} />
        {isUserUpdated ? (
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth user={user}>
                    <HomePage user={user} />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/register"
                element={<RegisterPage onProfileCreate={onProfileCreate} />}
              />
              <Route
                path="/adminregister/nCYn0s5EePSj9hyj5JFo9RGYh5w1"
                element={
                  <AdminRegisterPage onProfileCreate={onProfileCreate} />
                }
              />
              <Route path="/employeelist" element={<EmployeeTable />} />
              <Route path="/addemployee" element={<EmployeeInput />} />
              <Route path="/subsidiarylist" element={<SubsidiaryListPage />} />
              <Route
                path="/approveadmin"
                element={<AdminList profiles={profiles} />}
              />
              <Route
                path="/addsubsidiary"
                element={
                  <NewSubsidiary onSubsidiaryCreate={onSubsidiaryCreate} />
                }
              />
              <Route path="subsidiary">
                <Route
                  path=":id"
                  element={
                    <SubsidiaryPage subsidiaries={subsidiaries} user={user} />
                  }
                />
              </Route>
              <Route path="editsubsidiary">
                <Route
                  path=":id"
                  element={<EditSubsidiary subsidiaries={subsidiaries} />}
                />
              </Route>
            </Routes>
          </div>
        ) : (
          <div className="mt-3 text-center">
            <Spinner />
          </div>
        )}
      </BrowserRouter>
      <NavBar>
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </NavBar>
    </>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item">
        <span className="menu-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "Subsidiaries"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem>Countries</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronIcon />}>
            Subsidiaries Add Subsidiary
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-menu">
      <a href="#" className="nav-item" onClick={() => setOpen(!open)}></a>
      {open && props.children}
    </li>
  );
}

export default App;
