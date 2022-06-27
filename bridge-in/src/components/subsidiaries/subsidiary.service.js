import {
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/Firebase";
import { Subsidiary } from "../models/Subsidiary";

class SubsidiaryService {
  constructor() {
    this.collection = "subsidiaries";
  }

  async createSubsidiary(sub) {
    const collRef = collection(db, this.collection);

    const docRef = await addDoc(collRef, sub.toJson());

    sub.id = docRef.id;
    return sub;
  }

  async fetchSubsidiary() {
    const collRef = collection(db, this.collection);
    const q = query(collRef);
    const queSnap = await getDocs(q);

    const subs = [];
    queSnap.forEach((doc) => {
      subs.push(Subsidiary.fromFirebase(doc));
    });
    return subs;
  }

  async updateSubsidiary(sub) {
    const docRef = doc(db, this.collection, sub.id);
    await updateDoc(docRef, sub.toJson());
    return sub;
  }

  async deleteSubsidiary(subId) {
    const docRef = doc(db, this.collection, subId);
    await deleteDoc(docRef);
  }
}

const service = new SubsidiaryService();

export default service;
