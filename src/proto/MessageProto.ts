/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum HeadType {
  /** HEAD_TYPE_KEEPALIVE_REQUEST - 心跳请求PING; */
  HEAD_TYPE_KEEPALIVE_REQUEST = 0,
  /** HEAD_TYPE_KEEPALIVE_RESPONSE - 心跳响应PONG; */
  HEAD_TYPE_KEEPALIVE_RESPONSE = 1,
  /** HEAD_TYPE_MESSAGE_REQUEST - 消息请求; */
  HEAD_TYPE_MESSAGE_REQUEST = 2,
  /** HEAD_TYPE_MESSAGE_RESPONSE - 消息回执; */
  HEAD_TYPE_MESSAGE_RESPONSE = 3,
  /** HEAD_TYPE_MESSAGE_NOTIFICATION - 通知消息 */
  HEAD_TYPE_MESSAGE_NOTIFICATION = 4,
  /** HEAD_TYPE_MESSAGE_AUTHENTICATION_REQUEST - 认证消息 */
  HEAD_TYPE_MESSAGE_AUTHENTICATION_REQUEST = 5,
  UNRECOGNIZED = -1,
}

export function headTypeFromJSON(object: any): HeadType {
  switch (object) {
    case 0:
    case "HEAD_TYPE_KEEPALIVE_REQUEST":
      return HeadType.HEAD_TYPE_KEEPALIVE_REQUEST;
    case 1:
    case "HEAD_TYPE_KEEPALIVE_RESPONSE":
      return HeadType.HEAD_TYPE_KEEPALIVE_RESPONSE;
    case 2:
    case "HEAD_TYPE_MESSAGE_REQUEST":
      return HeadType.HEAD_TYPE_MESSAGE_REQUEST;
    case 3:
    case "HEAD_TYPE_MESSAGE_RESPONSE":
      return HeadType.HEAD_TYPE_MESSAGE_RESPONSE;
    case 4:
    case "HEAD_TYPE_MESSAGE_NOTIFICATION":
      return HeadType.HEAD_TYPE_MESSAGE_NOTIFICATION;
    case 5:
    case "HEAD_TYPE_MESSAGE_AUTHENTICATION_REQUEST":
      return HeadType.HEAD_TYPE_MESSAGE_AUTHENTICATION_REQUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return HeadType.UNRECOGNIZED;
  }
}

export function headTypeToJSON(object: HeadType): string {
  switch (object) {
    case HeadType.HEAD_TYPE_KEEPALIVE_REQUEST:
      return "HEAD_TYPE_KEEPALIVE_REQUEST";
    case HeadType.HEAD_TYPE_KEEPALIVE_RESPONSE:
      return "HEAD_TYPE_KEEPALIVE_RESPONSE";
    case HeadType.HEAD_TYPE_MESSAGE_REQUEST:
      return "HEAD_TYPE_MESSAGE_REQUEST";
    case HeadType.HEAD_TYPE_MESSAGE_RESPONSE:
      return "HEAD_TYPE_MESSAGE_RESPONSE";
    case HeadType.HEAD_TYPE_MESSAGE_NOTIFICATION:
      return "HEAD_TYPE_MESSAGE_NOTIFICATION";
    case HeadType.HEAD_TYPE_MESSAGE_AUTHENTICATION_REQUEST:
      return "HEAD_TYPE_MESSAGE_AUTHENTICATION_REQUEST";
    default:
      return "UNKNOWN";
  }
}

/** 消息类型 */
export enum MessageType {
  /** MESSAGE_TYPE_TEXT - 文本消息 */
  MESSAGE_TYPE_TEXT = 0,
  /** MESSAGE_TYPE_IMAGE - 图片消息 */
  MESSAGE_TYPE_IMAGE = 1,
  /** MESSAGE_TYPE_VOICE - 语音消息 */
  MESSAGE_TYPE_VOICE = 2,
  UNRECOGNIZED = -1,
}

export function messageTypeFromJSON(object: any): MessageType {
  switch (object) {
    case 0:
    case "MESSAGE_TYPE_TEXT":
      return MessageType.MESSAGE_TYPE_TEXT;
    case 1:
    case "MESSAGE_TYPE_IMAGE":
      return MessageType.MESSAGE_TYPE_IMAGE;
    case 2:
    case "MESSAGE_TYPE_VOICE":
      return MessageType.MESSAGE_TYPE_VOICE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MessageType.UNRECOGNIZED;
  }
}

export function messageTypeToJSON(object: MessageType): string {
  switch (object) {
    case MessageType.MESSAGE_TYPE_TEXT:
      return "MESSAGE_TYPE_TEXT";
    case MessageType.MESSAGE_TYPE_IMAGE:
      return "MESSAGE_TYPE_IMAGE";
    case MessageType.MESSAGE_TYPE_VOICE:
      return "MESSAGE_TYPE_VOICE";
    default:
      return "UNKNOWN";
  }
}

/** 消息对象类型 */
export enum IsPrivate {
  /** IS_PRIVATE_TRUE - 私聊 */
  IS_PRIVATE_TRUE = 0,
  /** IS_PRIVATE_FALSE - 群聊 */
  IS_PRIVATE_FALSE = 1,
  UNRECOGNIZED = -1,
}

export function isPrivateFromJSON(object: any): IsPrivate {
  switch (object) {
    case 0:
    case "IS_PRIVATE_TRUE":
      return IsPrivate.IS_PRIVATE_TRUE;
    case 1:
    case "IS_PRIVATE_FALSE":
      return IsPrivate.IS_PRIVATE_FALSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return IsPrivate.UNRECOGNIZED;
  }
}

export function isPrivateToJSON(object: IsPrivate): string {
  switch (object) {
    case IsPrivate.IS_PRIVATE_TRUE:
      return "IS_PRIVATE_TRUE";
    case IsPrivate.IS_PRIVATE_FALSE:
      return "IS_PRIVATE_FALSE";
    default:
      return "UNKNOWN";
  }
}

export interface User {
  /** 用户id */
  id: number;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickName: string;
  /** 头像 */
  avatar: string;
}

/** 聊天消息结构 */
export interface MessageRequest {
  /** 发送者 */
  sender: User | undefined;
  /** 接收者 */
  receiver: User | undefined;
  /** 消息内容 */
  messageContent: string;
  /** 消息类型 1:文本 2:图片 3:语音 */
  type: MessageType;
  /** 是否私聊 */
  isPrivate: IsPrivate;
  /** 时间戳 */
  timestamp: string;
  /** 群id */
  groupId: number;
}

/** 消息回执 */
export interface Response {
  /** true表示发送成功，false表示发送失败 */
  result: boolean;
  /** 错误码 */
  code: number;
  /** 错误描述 */
  msg: string;
  /** 错误描述是否提示给用户:1 提示;0 不提示 */
  expose: number;
}

export interface AuthenticationRequest {
  /** 用户token */
  token: string;
}

/** 通知消息 */
export interface Notification {
  /** 私聊还是群聊 */
  isPrivate: boolean;
  /** 普通消息还是命令消息 */
  isOrder: boolean;
  /** 谁发的 */
  sender: User | undefined;
  /** 发给谁的 */
  receiver: User | undefined;
  /** 消息类型  0:文本 1:图片 2:语音 */
  msgType: MessageType;
  /** 如果是命令消息，消息的名字 */
  orderName: string;
  /** 消息内容 */
  content: string;
  /** 发送时间 */
  timestamp: string;
}

/**
 * 顶层消息是一种嵌套消息，嵌套了各种类型消息
 * 内部的消息类型，全部使用optional字段
 * 根据消息类型 type的值，最多只有一个有效
 */
export interface Message {
  /** 消息类型 */
  type: HeadType;
  /** 消息内容 */
  messageRequest?: MessageRequest | undefined;
  /** 消息响应 */
  messageResponse?: Response | undefined;
  /** 通知消息 */
  notification?: Notification | undefined;
  /** 认证请求 */
  authenticationRequest?: AuthenticationRequest | undefined;
}

function createBaseUser(): User {
  return { id: 0, username: "", nickName: "", avatar: "" };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.nickName !== "") {
      writer.uint32(26).string(message.nickName);
    }
    if (message.avatar !== "") {
      writer.uint32(34).string(message.avatar);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.nickName = reader.string();
          break;
        case 4:
          message.avatar = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      username: isSet(object.username) ? String(object.username) : "",
      nickName: isSet(object.nickName) ? String(object.nickName) : "",
      avatar: isSet(object.avatar) ? String(object.avatar) : "",
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.username !== undefined && (obj.username = message.username);
    message.nickName !== undefined && (obj.nickName = message.nickName);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? 0;
    message.username = object.username ?? "";
    message.nickName = object.nickName ?? "";
    message.avatar = object.avatar ?? "";
    return message;
  },
};

function createBaseMessageRequest(): MessageRequest {
  return {
    sender: undefined,
    receiver: undefined,
    messageContent: "",
    type: 0,
    isPrivate: 0,
    timestamp: "",
    groupId: 0,
  };
}

export const MessageRequest = {
  encode(
    message: MessageRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== undefined) {
      User.encode(message.sender, writer.uint32(10).fork()).ldelim();
    }
    if (message.receiver !== undefined) {
      User.encode(message.receiver, writer.uint32(18).fork()).ldelim();
    }
    if (message.messageContent !== "") {
      writer.uint32(26).string(message.messageContent);
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    if (message.isPrivate !== 0) {
      writer.uint32(40).int32(message.isPrivate);
    }
    if (message.timestamp !== "") {
      writer.uint32(50).string(message.timestamp);
    }
    if (message.groupId !== 0) {
      writer.uint32(56).uint64(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.receiver = User.decode(reader, reader.uint32());
          break;
        case 3:
          message.messageContent = reader.string();
          break;
        case 4:
          message.type = reader.int32() as any;
          break;
        case 5:
          message.isPrivate = reader.int32() as any;
          break;
        case 6:
          message.timestamp = reader.string();
          break;
        case 7:
          message.groupId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageRequest {
    return {
      sender: isSet(object.sender) ? User.fromJSON(object.sender) : undefined,
      receiver: isSet(object.receiver)
        ? User.fromJSON(object.receiver)
        : undefined,
      messageContent: isSet(object.messageContent)
        ? String(object.messageContent)
        : "",
      type: isSet(object.type) ? messageTypeFromJSON(object.type) : 0,
      isPrivate: isSet(object.isPrivate)
        ? isPrivateFromJSON(object.isPrivate)
        : 0,
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "",
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
    };
  },

  toJSON(message: MessageRequest): unknown {
    const obj: any = {};
    message.sender !== undefined &&
      (obj.sender = message.sender ? User.toJSON(message.sender) : undefined);
    message.receiver !== undefined &&
      (obj.receiver = message.receiver
        ? User.toJSON(message.receiver)
        : undefined);
    message.messageContent !== undefined &&
      (obj.messageContent = message.messageContent);
    message.type !== undefined && (obj.type = messageTypeToJSON(message.type));
    message.isPrivate !== undefined &&
      (obj.isPrivate = isPrivateToJSON(message.isPrivate));
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    message.groupId !== undefined &&
      (obj.groupId = Math.round(message.groupId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MessageRequest>, I>>(
    object: I
  ): MessageRequest {
    const message = createBaseMessageRequest();
    message.sender =
      object.sender !== undefined && object.sender !== null
        ? User.fromPartial(object.sender)
        : undefined;
    message.receiver =
      object.receiver !== undefined && object.receiver !== null
        ? User.fromPartial(object.receiver)
        : undefined;
    message.messageContent = object.messageContent ?? "";
    message.type = object.type ?? 0;
    message.isPrivate = object.isPrivate ?? 0;
    message.timestamp = object.timestamp ?? "";
    message.groupId = object.groupId ?? 0;
    return message;
  },
};

function createBaseResponse(): Response {
  return { result: false, code: 0, msg: "", expose: 0 };
}

export const Response = {
  encode(
    message: Response,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.result === true) {
      writer.uint32(8).bool(message.result);
    }
    if (message.code !== 0) {
      writer.uint32(16).uint32(message.code);
    }
    if (message.msg !== "") {
      writer.uint32(26).string(message.msg);
    }
    if (message.expose !== 0) {
      writer.uint32(32).uint32(message.expose);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.bool();
          break;
        case 2:
          message.code = reader.uint32();
          break;
        case 3:
          message.msg = reader.string();
          break;
        case 4:
          message.expose = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response {
    return {
      result: isSet(object.result) ? Boolean(object.result) : false,
      code: isSet(object.code) ? Number(object.code) : 0,
      msg: isSet(object.msg) ? String(object.msg) : "",
      expose: isSet(object.expose) ? Number(object.expose) : 0,
    };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result);
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.msg !== undefined && (obj.msg = message.msg);
    message.expose !== undefined && (obj.expose = Math.round(message.expose));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = createBaseResponse();
    message.result = object.result ?? false;
    message.code = object.code ?? 0;
    message.msg = object.msg ?? "";
    message.expose = object.expose ?? 0;
    return message;
  },
};

function createBaseAuthenticationRequest(): AuthenticationRequest {
  return { token: "" };
}

export const AuthenticationRequest = {
  encode(
    message: AuthenticationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AuthenticationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticationRequest {
    return {
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: AuthenticationRequest): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthenticationRequest>, I>>(
    object: I
  ): AuthenticationRequest {
    const message = createBaseAuthenticationRequest();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseNotification(): Notification {
  return {
    isPrivate: false,
    isOrder: false,
    sender: undefined,
    receiver: undefined,
    msgType: 0,
    orderName: "",
    content: "",
    timestamp: "",
  };
}

export const Notification = {
  encode(
    message: Notification,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.isPrivate === true) {
      writer.uint32(8).bool(message.isPrivate);
    }
    if (message.isOrder === true) {
      writer.uint32(16).bool(message.isOrder);
    }
    if (message.sender !== undefined) {
      User.encode(message.sender, writer.uint32(26).fork()).ldelim();
    }
    if (message.receiver !== undefined) {
      User.encode(message.receiver, writer.uint32(34).fork()).ldelim();
    }
    if (message.msgType !== 0) {
      writer.uint32(40).int32(message.msgType);
    }
    if (message.orderName !== "") {
      writer.uint32(50).string(message.orderName);
    }
    if (message.content !== "") {
      writer.uint32(58).string(message.content);
    }
    if (message.timestamp !== "") {
      writer.uint32(66).string(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Notification {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.isPrivate = reader.bool();
          break;
        case 2:
          message.isOrder = reader.bool();
          break;
        case 3:
          message.sender = User.decode(reader, reader.uint32());
          break;
        case 4:
          message.receiver = User.decode(reader, reader.uint32());
          break;
        case 5:
          message.msgType = reader.int32() as any;
          break;
        case 6:
          message.orderName = reader.string();
          break;
        case 7:
          message.content = reader.string();
          break;
        case 8:
          message.timestamp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Notification {
    return {
      isPrivate: isSet(object.isPrivate) ? Boolean(object.isPrivate) : false,
      isOrder: isSet(object.isOrder) ? Boolean(object.isOrder) : false,
      sender: isSet(object.sender) ? User.fromJSON(object.sender) : undefined,
      receiver: isSet(object.receiver)
        ? User.fromJSON(object.receiver)
        : undefined,
      msgType: isSet(object.msgType) ? messageTypeFromJSON(object.msgType) : 0,
      orderName: isSet(object.orderName) ? String(object.orderName) : "",
      content: isSet(object.content) ? String(object.content) : "",
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "",
    };
  },

  toJSON(message: Notification): unknown {
    const obj: any = {};
    message.isPrivate !== undefined && (obj.isPrivate = message.isPrivate);
    message.isOrder !== undefined && (obj.isOrder = message.isOrder);
    message.sender !== undefined &&
      (obj.sender = message.sender ? User.toJSON(message.sender) : undefined);
    message.receiver !== undefined &&
      (obj.receiver = message.receiver
        ? User.toJSON(message.receiver)
        : undefined);
    message.msgType !== undefined &&
      (obj.msgType = messageTypeToJSON(message.msgType));
    message.orderName !== undefined && (obj.orderName = message.orderName);
    message.content !== undefined && (obj.content = message.content);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Notification>, I>>(
    object: I
  ): Notification {
    const message = createBaseNotification();
    message.isPrivate = object.isPrivate ?? false;
    message.isOrder = object.isOrder ?? false;
    message.sender =
      object.sender !== undefined && object.sender !== null
        ? User.fromPartial(object.sender)
        : undefined;
    message.receiver =
      object.receiver !== undefined && object.receiver !== null
        ? User.fromPartial(object.receiver)
        : undefined;
    message.msgType = object.msgType ?? 0;
    message.orderName = object.orderName ?? "";
    message.content = object.content ?? "";
    message.timestamp = object.timestamp ?? "";
    return message;
  },
};

function createBaseMessage(): Message {
  return {
    type: 0,
    messageRequest: undefined,
    messageResponse: undefined,
    notification: undefined,
    authenticationRequest: undefined,
  };
}

export const Message = {
  encode(
    message: Message,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.messageRequest !== undefined) {
      MessageRequest.encode(
        message.messageRequest,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.messageResponse !== undefined) {
      Response.encode(
        message.messageResponse,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.notification !== undefined) {
      Notification.encode(
        message.notification,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.authenticationRequest !== undefined) {
      AuthenticationRequest.encode(
        message.authenticationRequest,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.messageRequest = MessageRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.messageResponse = Response.decode(reader, reader.uint32());
          break;
        case 4:
          message.notification = Notification.decode(reader, reader.uint32());
          break;
        case 5:
          message.authenticationRequest = AuthenticationRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      type: isSet(object.type) ? headTypeFromJSON(object.type) : 0,
      messageRequest: isSet(object.messageRequest)
        ? MessageRequest.fromJSON(object.messageRequest)
        : undefined,
      messageResponse: isSet(object.messageResponse)
        ? Response.fromJSON(object.messageResponse)
        : undefined,
      notification: isSet(object.notification)
        ? Notification.fromJSON(object.notification)
        : undefined,
      authenticationRequest: isSet(object.authenticationRequest)
        ? AuthenticationRequest.fromJSON(object.authenticationRequest)
        : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = headTypeToJSON(message.type));
    message.messageRequest !== undefined &&
      (obj.messageRequest = message.messageRequest
        ? MessageRequest.toJSON(message.messageRequest)
        : undefined);
    message.messageResponse !== undefined &&
      (obj.messageResponse = message.messageResponse
        ? Response.toJSON(message.messageResponse)
        : undefined);
    message.notification !== undefined &&
      (obj.notification = message.notification
        ? Notification.toJSON(message.notification)
        : undefined);
    message.authenticationRequest !== undefined &&
      (obj.authenticationRequest = message.authenticationRequest
        ? AuthenticationRequest.toJSON(message.authenticationRequest)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.type = object.type ?? 0;
    message.messageRequest =
      object.messageRequest !== undefined && object.messageRequest !== null
        ? MessageRequest.fromPartial(object.messageRequest)
        : undefined;
    message.messageResponse =
      object.messageResponse !== undefined && object.messageResponse !== null
        ? Response.fromPartial(object.messageResponse)
        : undefined;
    message.notification =
      object.notification !== undefined && object.notification !== null
        ? Notification.fromPartial(object.notification)
        : undefined;
    message.authenticationRequest =
      object.authenticationRequest !== undefined &&
      object.authenticationRequest !== null
        ? AuthenticationRequest.fromPartial(object.authenticationRequest)
        : undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
