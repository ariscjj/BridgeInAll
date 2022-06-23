import "./App.css";
import NavBar from "./components/main_frame/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeTable from "./components/employees/components/employees/EmployeeTable";
import EmployeeInput from "./components/employees/components/employees/EmployeeInput";
import SubsidiaryListPage from "./components/subsidiaries/SubsidiaryListPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/employeelist" element={<EmployeeTable />} />
            <Route path="/addemployee" element={<EmployeeInput />} />
            <Route path="/subsidiarylist" element={<SubsidiaryList />} />
            <Route path="/addsubsidiary" element={<AddSubsidiary />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
