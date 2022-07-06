import {
  getDoc,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { Profile } from "./Profile";
import { Role } from "../auth/Profile";

class ProfileService {
  constructor() {
    this.collection = "profiles";
  }

  async saveProfile(profile) {
    const docRef = doc(db, this.collection, profile.id);

    await setDoc(docRef, profile.toJson());
  }

  async fetchProfile(user) {
    const docRef = doc(db, this.collection, user.uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return Profile.fromFirebase(docSnap);
    } else {
      return new Profile(user.uid);
    }
  }

  async fetchAdmins() {
    const collectionRef = collection(db, this.collection);
    const q = query(collectionRef, where("role", "==", Role.admin));
    const querySnapshot = await getDocs(q);
    const profiles = [];

    querySnapshot.forEach((docSnap) => {
      profiles.push(Profile.fromFirebase(docSnap));
    });

    return profiles;
  }

  homeUrl(role, approved) {
    if (role === Role.employee) {
      return "/employeehome";
    } else if (role === Role.company) {
      return "/subsidiarylist";
    } else if (role === Role.admin && !approved) {
      return "/adminpending";
    } else if (role === Role.admin && approved) {
      return "/adminhome";
    } else if (role === Role.superAdmin) {
      return "/superadminhome";
    }
  }
}

const service = new ProfileService();

export default service;
