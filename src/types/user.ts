export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  photoURL: string | null;
  currency: string;
  createdAt: Date;
}
