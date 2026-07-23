import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase/firestore";
import type { UserProfile } from "../../../types/user";

interface CreateUserProfile {
  uid: string;
  email: string;
  name: string;
}

export const createUserProfile = async ({
  uid,
  email,
  name,
}: CreateUserProfile) => {
  const profile = {
    uid,
    email,
    name,
    photoURL: null,
    currency: "UAH",
    createdAt: new Date(),
  };

  await setDoc(doc(db, "users", uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });

  return profile;
};

export const getUserProfile = async (
  uid: string,
): Promise<UserProfile | null> => {
  const docRef = doc(db, "users", uid);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfile;
};
