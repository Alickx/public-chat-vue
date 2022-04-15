import {IUser} from "./IUser";

export interface ILoginResponse {
    code: number,
    message: string,
    success: string,
    data: {
        accessToken: string,
        refreshToken: string,
        user: IUser,
    }
}

export interface IResponse {
    code: number,
    message: string,
    success: string,
    data: any
}