import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase/firestore";

interface CreateUserProfile {
  uid: string;
  email: string | null;
  name: string;
}

export const createUserProfile = async ({
  uid,
  email,
  name,
}: CreateUserProfile) => {
  await setDoc(doc(db, "users", uid), {
    uid,
    email,
    name,
    photoURL: null,
    currency: "UAH",
    createdAt: serverTimestamp(),
  });
};
