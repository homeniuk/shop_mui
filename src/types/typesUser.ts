
export interface UserState {
    token: string,
    login: string,
    isAuth: boolean,
    isUserLogining: boolean,
    errorOnLogin: string | null
}

export type TypeLoginEnter = {
    email: string,
    password: string,
}

export type TypeLoginReturn = {
    message: string,
    login: string,
    access_token: string,
}

export type TypeRegisterForm = {
    login: string,
    email: string,
    password: string,
    passwordConfirmation: string,
}

export type TypeRegisterEnter = {
    login: string,
    email: string,
    password: string,
}

export type TypeRegisterReturn = {
    message: string,
    login: string,
    access_token: string,
}







