import { IUser } from "./users";

export interface IContext extends IUser {
    authenticate: (name: string, password: string) => Promise<void>;
    logout: () => void;
}