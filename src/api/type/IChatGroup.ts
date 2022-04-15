export interface IChatGroup {
  id: number;
  groupName: string;
  avatar: string;
  createdTime: Date;
  updatedTime: Date;
  deleted: number;
  state: number;
  version: number;
}