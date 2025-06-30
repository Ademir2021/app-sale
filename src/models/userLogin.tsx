export type UserLogin ={
    login:string;
    password:string;
}

type Role = 'ROLE_ADMIN' | 'ROLE_USER'

export type UserResponse ={
  token:string;
  username:string
  roles:Role
}

export interface User {
  login: string;
  role: Role;
  token: string
}

export interface AuthContextType {
  user: User | null;
  login_: (UserLogin: UserLogin) => boolean | any;
  logout: () => void;
  isAuthenticated: boolean;
  msg: string
  headers:Object | any
}