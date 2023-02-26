import { ILoginReponse, IRegisterReponse } from '@libs/models/auth';
import { LocalStorage } from 'utils/common/LocalStorage';
import { api } from '.';

export const login = (username: string, password: string) => {
    return api.post('/login', {
        username,
        password,
    }) as Promise<ILoginReponse>;
};

export const register = (
    username: string,
    password: string,
    fullname: string,
    email: string,
) => {
    return api.post('/register', {
        username,
        password,
        fullname,
        email,
    }) as Promise<IRegisterReponse>;
};

export const logout = async (all?: boolean) => {
    LocalStorage.removeData('user');
    await api.post('/auth/logout', {
        all: all || false,
    });
};
