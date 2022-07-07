import {
  collection, addDoc,
  query, getDocs,
  doc, updateDoc,
  setDoc, 
  deleteDoc
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import { Employee } from '../models/employee';

class EditEmployeeService {

  constructor() {
    this.collection = 'editEmp';
  }

  async createEmployee(employee) {
    // const collectionRef = collection(db, this.collection);

    const docRef = doc(db, this.collection, employee.id); 
    // const collectionRef = collection(db, this.collection);
    console.log("got collection")
    // const docRef = await setDoc(collectionRef, 
    //
    //
    // await addDoc(collectionRef, {
    //   id: employee.id,
    //   photo: employee.photo,
    //   name: employee.name,
    //   birthday: employee.birthday,
    //   address: employee.address,
    //   city: employee.city,
    //   postalCode: employee.postalCode,
    //   country: employee.country,
    //   role: employee.role,
    //   email: employee.email,
    //   phone: employee.phone,
    //   status: employee.status
    // });

    await setDoc(docRef, 
      {
        id: employee.id,
        photo: employee.photo,
        name: employee.name,
        birthday: employee.birthday,
        address: employee.address,
        postalCode: employee.postalCode,
        city: employee.city,
        country: employee.country,
        role: employee.role,
        email: employee.email,
        phone: employee.phone,
        status: employee.status
      }
    );


      // employee.toJson()); 
    console.log("adding doc");

    // await updateDoc(docRef, employee.toJson());
    console.log("updatedDoc");

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
        data.id,
        data.photo,
        data.name,
        data.birthday,
        data.address,
        data.postalCode,
        data.city,
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
    console.log("from the JS service editEmp:");
    console.log(employee);

    await updateDoc(docRef, {
      photo: employee.photo,
      name: employee.name,
      birthday: employee.birthday,
      address: employee.address,
      postalCode: employee.postalCode,
      city: employee.city,
      country: employee.country,
      role: employee.role,
      email: employee.email,
      phone: employee.phone,
      status: employee.status
    });

    return employee;
  }

  async deleteEmployee(employee) {
    const docRef = doc(db, this.collection, employee.id);
    console.log("DELETING" + employee.id);
    await deleteDoc(docRef);
    console.log("DELETING");
  }
} 

const service = new EditEmployeeService();

export default service;

