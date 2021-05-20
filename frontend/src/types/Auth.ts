export interface IFormInputs {
  email: string;
  password: string;
}

export interface User extends IFormInputs {
  token: string;
  exp: number;
}

export interface IContext {
  user: User | null | undefined;
  signUp: (data: IFormInputs) => Promise<void>;
  signIn: (data: IFormInputs) => Promise<void>;
  signOut: () => Promise<void>;
}
