import {request} from '../myAxios';
import {ILoginParams} from "../type/ILoginParams";
import {ILoginResponse} from "../type/IResponse";
import {IResponse} from "../type/IResponse";
import {IRegisterParams} from "../type/IRegister";

export class UserService {
  public static async login(iLoginParams: ILoginParams) {
    const res = request('/login', iLoginParams, 'POST')
    return res as Promise<ILoginResponse>
  }

  public static async register(iRegisterParams: IRegisterParams) {
    const res = request('/register', iRegisterParams, 'POST')
    return res as Promise<IResponse>
  }
}