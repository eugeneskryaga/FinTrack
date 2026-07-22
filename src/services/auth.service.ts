import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase/auth";
import { createUserProfile } from "./user.service";

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const register = async ({ email, password, name }: RegisterData) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await createUserProfile({
    uid: credential.user.uid,
    email: credential.user.email,
    name,
  });

  return credential.user;
};
