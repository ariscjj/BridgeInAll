import {
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { Employee } from "../models/employee";

class EmployeeService {
  constructor() {
    this.collection = "employees";
  }

  async createEmployee(employee) {
    const collectionRef = collection(db, this.collection);
    //console.log("got colloection")
    const d = new Date();
    let time = d.getTime();
    //console.log(time);
    const docRef = await addDoc(collectionRef, {
      id: time,
      photo: employee.photo,
      name: employee.name,
      country: employee.country,
      role: employee.role,
      email: employee.email,
      phone: employee.phone,
      status: employee.status,
    });

    // employee.toJson());
    //console.log("adding doc");

    // employee.id = docRef.id;
    // await updateDoc(docRef, employee.toJson());
    //console.log("updatedDoc");

    return employee;
  }

  async fetchEmployees() {
    const collectionRef = collection(db, this.collection);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const employees = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const employee = new Employee(
        doc.id,
        data.photo,
        data.name,
        data.country,
        data.role,
        data.email,
        data.phone,
        data.status
      );

      employees.push(employee);
    });

    return employees;
  }

  async updateEmployee(employee) {
    const docRef = doc(db, this.collection, employee.id);
    // await updateDoc(docRef, employee.toJson());

    await updateDoc(docRef, {
      photo: employee.photo,
      name: employee.name,
      country: employee.country,
      role: employee.role,
      email: employee.email,
      phone: employee.phone,
      status: employee.status,
    });

    return employee;
  }

  async deleteEmployee(employeeId) {
    const docRef = doc(db, this.collection, employeeId);

    await deleteDoc(docRef);
  }
}

const service = new EmployeeService();

export default service;
