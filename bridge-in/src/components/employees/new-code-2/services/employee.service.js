import {
  collection, addDoc,
  query, getDocs,
  doc, updateDoc,
  deleteDoc
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import { Employee } from '../models/employee';

class EmployeeService {

  constructor() {
    this.collection = 'employees';
  }

  async createEmployee(employee) {
    const collectionRef = collection(db, this.collection);
    // const docRef = await addDoc(collectionRef, 
    //   {
    //     id: employee.id,
    //     photo: employee.photo,
    //     name: employee.name,
    //     country: employee.country,
    //     role: employee.role,
    //     email: employee.email,
    //     phone: employee.phone,
    //     status: employee.status
    //   }
    // );

    await addDoc(collectionRef, {
      id: employee.id,
      photo: employee.photo,
      name: employee.name,
      birthday: employee.birthday,
      address: employee.address,
      city: employee.city,
      postalCode: employee.postalCode,
      country: employee.country,
      role: employee.role,
      email: employee.email,
      phone: employee.phone,
      status: employee.status
    });
    console.log("adding doc");
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
        data.birthday,
        data.address,
        data.city,
        data.postalCode,
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
    console.log("getting docref");
    const docRef = doc(db, this.collection, employee.id);
    console.log(docRef);
    // await updateDoc(docRef, employee.toJson());
    console.log("from the JS service:");
    console.log(employee);

    console.log("updating jservice");
    await updateDoc(docRef, {
      photo: employee.photo,
      name: employee.name,
      birthday: employee.birthday,
      address: employee.address,
      city: employee.city,
      postalCode: employee.postalCode,
      country: employee.country,
      role: employee.role,
      email: employee.email,
      phone: employee.phone,
      status: employee.status
    });
    console.log("updated");

    return employee;
  }

  async deleteEmployee(employeeId) {
    const docRef = doc(db, this.collection, employeeId);

    await deleteDoc(docRef);
  }
} 

const service = new EmployeeService();

export default service;



