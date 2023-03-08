import { IUserResponse } from './../models/user';
import { api } from '.';

export const getProfile = () => {
    return api.get(`/profile`) as Promise<any>;
};

export const getUsers = (users: string[]) => {
    return api.post(`/users`, {
        users,
    }) as Promise<any>;
};
