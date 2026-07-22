import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../lib/firebase/auth";
import { createUserProfile } from "../../profile/services/user.service";

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const registerUser = async ({ email, password, name }: RegisterData) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(credential.user, { displayName: name });

  await createUserProfile({
    uid: credential.user.uid,
    email: credential.user.email,
    name,
  });

  return credential.user;
};
