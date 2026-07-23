import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../../lib/firebase/auth";
import type { LoginData, RegisterData } from "../../../types/auth";
import { createUserProfile } from "../../users/services/user.service";

export const registerUser = async ({ email, password, name }: RegisterData) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(credential.user, { displayName: name });

  const profile = await createUserProfile({
    uid: credential.user.uid,
    email,
    name,
  });

  return profile;
};

export const loginUser = async ({ email, password }: LoginData) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);

  return credential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};
