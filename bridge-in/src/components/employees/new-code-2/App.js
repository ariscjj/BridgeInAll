import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import NavBar from './common/NavBar';
import EmployeeInput from './components/employees/EmployeeInput'
import EmployeeTable from './components/employees/EmployeeTable'
import EditEmployeeInput from './components/employees/EditInput'
import EditTable from './components/employees/EditTable'
import IndInput from './components/employees/empView/IndInput'
import IndEdit from './components/employees/empView/IndEdit'


export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='add-employee' element={<EmployeeInput />} />
        <Route path='employee-table' element={<EmployeeTable />} />
        <Route path='employee-edit' element={<EditEmployeeInput/>} />
        <Route path='edit-table' element={<EditTable/>} />
        <Route path='ind-input' element={<IndInput />} />
        <Route path='ind-edit' element={<IndEdit />} />

      </Routes>
    </BrowserRouter>
  )
}
