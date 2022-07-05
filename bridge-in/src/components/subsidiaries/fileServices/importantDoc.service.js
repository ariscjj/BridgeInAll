import {
    collection,
    query,
    addDoc,
    getDocs,
    deleteDoc,
    doc
  } from 'firebase/firestore';
  
  import { db } from '../../firebase/firebase';
  import { ImportantDocs } from "./importantDocs";
  
  class ImportantDocService {
  
    constructor() {
      this.collection = 'importantDocs';
    }
  
    async fetchImportantDocs() {
      const collectionRef = collection(db, this.collection);
      const q = query(collectionRef);
  
      const querySnapshot = await getDocs(q);
      const importantDocs = [];
  
      querySnapshot.forEach((docSnap) => {
        importantDocs.push(ImportantDocs.fromFirebase(docSnap));
      });
  
      return importantDocs;
    }
  
    async createImportantDoc(importantDoc) {
      const collectionRef = collection(db, this.collection);
  
      const docRef = await addDoc(collectionRef, importantDoc.toJson());
  
      importantDoc.id = docRef.id;
      return importantDoc;
    }
  
    async deleteImportantDoc(importantDocId) {
      const docRef = doc(db, this.collection, importantDocId);
      await deleteDoc(docRef);
    }
  }
  
  const service = new ImportantDocService();
  export default service;