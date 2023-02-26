import { IUserResponse } from './../models/user';
import { api } from '.';

export const getProfile = () => {
    return api.get(`/profile`) as Promise<IUserResponse>;
}