import React, { useEffect, useState } from "react";
import NavBar from "./components/main_frame/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import EmployeeTable from "./components/employees/components/employees/EmployeeTable";
import EmployeeInput from "./components/employees/components/employees/EmployeeInput";
import SubsidiaryListPage from "./components/subsidiaries/SubsidiaryListPage";
import NewSubsidiary from "./components/subsidiaries/NewSubsidiary";
import HomePage from "./components/main_frame/HomePage";
import LoginPage from "./components/main_frame/LoginPage";
import RegisterPage from "./components/main_frame/RegisterPage";

import { Subsidiary } from "./components/subsidiaries/Subsidiary";
import SubsidiaryService from "./components/subsidiaries/subsidiary.service";
import { auth } from "./components/firebase/firebase";

import Spinner from "./components/common/Spinner";
import RequireAuth from "./components/common/RequireAuth";

function App() {
  const [subsidiaries, setSubsidiaries] = useState([]);
  const [user, setUser] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

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

  return (
    <>
      <BrowserRouter>
        <NavBar user={user} />
        {isUserUpdated ? (
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth user={user}>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/employeelist" element={<EmployeeTable />} />
              <Route path="/addemployee" element={<EmployeeInput />} />
              <Route path="/subsidiarylist" element={<SubsidiaryListPage />} />
              <Route
                path="/addsubsidiary"
                element={
                  <NewSubsidiary onSubsidiaryCreate={onSubsidiaryCreate} />
                }
              />
            </Routes>
          </div>
        ) : (
          <div className="mt-3 text-center">
            <Spinner />
          </div>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
