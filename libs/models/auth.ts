export interface ILoginReponse {
    accessToken: string;
    msg: string;
    refreshToken: string;
    user: {
        _id: string;
        username: string;
        accessToken: string;
        password: string;
        fullname: string;
        email: string;
    };
}

export interface IRegisterReponse {
    username: string;
}
