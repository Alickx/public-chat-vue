import {IRegisterParams} from "../type/IRegister";
import {request} from "../myAxios";
import {IResponse} from "../type/IResponse";

export class GroupService {
  public static async list() {
    const res = request('/group/list',{}, 'GET')
    return res as Promise<IResponse>
  }
}