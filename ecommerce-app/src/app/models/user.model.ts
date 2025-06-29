export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // optional, not stored after login
  token: string;
}
