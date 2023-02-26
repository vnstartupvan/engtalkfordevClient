export interface ILoginReponse {
    _id: string;
    username: string;
    accessToken: string;
    password: string;
    fullname: string;
    email: string;
}

export interface IRegisterReponse {
    username: string;
}
