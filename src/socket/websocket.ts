import {HeadType, IsPrivate, Message, MessageType} from "../proto/MessageProto";
import {useUserStore} from "../store/store";

const userStore = useUserStore();

class Socket {
  set socketUrl(value: string) {
    this._socketUrl = value;
  }


  set option(value: { heartTime: number; errorCallback: Function | null; openCallback: Function | null; debug: boolean; reconnectTime: number; reconnectCount: number; closeCallback: Function | null; arraybuffer: boolean; isReconnect: boolean; messageCallback: Function | null }) {
    this._option = value;
  }

  set websocket(value: WebSocket | null) {
    this._websocket = value;
  }

  set sendPingInterval(value: any) {
    this._sendPingInterval = value;
  }

  set reconnectInterval(value: any) {
    this._reconnectInterval = value;
  }

  set activeLink(value: boolean) {
    this._activeLink = value;
  }

  set reconnectNum(value: number) {
    this._reconnectNum = value;
  }

  private _socketUrl: string;
  private _option: {
    heartTime: number;
    errorCallback: Function | null;
    openCallback: Function | null;
    debug: boolean;
    reconnectTime: number;
    reconnectCount: number;
    closeCallback: Function | null;
    // heartMsg: string;
    arraybuffer:boolean;
    isReconnect: boolean;
    messageCallback: Function | null;
  };
  private _websocket: WebSocket | null;
  private _sendPingInterval: any;
  private _reconnectInterval: any;
  private _activeLink: boolean;
  private _reconnectNum: number = 0;

  constructor(socketUrl: string, option?: object) {
    this._socketUrl = socketUrl;
    this._option = {
      heartTime: 5000, // 心跳时间间隔
      // heartMsg: "ping", // 心跳信息,默认为'ping'
      isReconnect: true, // 是否自动重连
      reconnectTime: 5000, // 重连时间间隔
      reconnectCount: -1, // 重连次数 -1 则不限制
      openCallback: null, // 连接成功的回调
      closeCallback: null, // 关闭的回调
      messageCallback: null, // 消息的回调
      errorCallback: null, // 错误的回调
      arraybuffer: true, // 是否支持arraybuffer
      debug: false,  //是否打开debug模式
      ...option
    };
    this._websocket = null;
    this._sendPingInterval = null;  //心跳定时器
    this._reconnectInterval = null;  //重连定时器
    this._activeLink = true;  //socket对象是否可用
    this._reconnectNum = 0; //重连次数限制
    this.init();
  }

  /**
   * 初始化
   */
  init() {
    if (!("WebSocket" in window)) {
      throw new Error("当前浏览器不支持");
    }
    if (!this._socketUrl) {
      throw new Error("请配置连接地址");
    }
    this._websocket = null;
    this._websocket = new window.WebSocket(this._socketUrl);
    if (this._option.arraybuffer && this._websocket) {
      this._websocket.binaryType = "arraybuffer";
    }
    this.websocketOnOpen(null);
    this.websocketOnMessage(null);
    this.websocketOnError(null);
    this.websocketOnClose(null);
  }

  /**
   * 连接成功
   */
  websocketOnOpen(callback: Function | null) {
    if (!(this._websocket instanceof window.WebSocket)) return;
    this._websocket.onopen = (event) => {
      if (this._option.debug) console.log("%c websocket链接成功", "color:green");
      // this.sendPing(this.option.heartTime, this.option.heartMsg);
      this.sendPing(this._option.heartTime);
      const onOpenMessage = {
        type: HeadType.HEAD_TYPE_MESSAGE_AUTHENTICATION_REQUEST,
        authenticationRequest: {
          token: userStore.token
        }
      }
      this.send(Message.encode(onOpenMessage).finish());
      if (typeof callback === "function") {
        callback(event);
      } else {
        (typeof this._option.openCallback === "function") && this._option.openCallback(event);
      }
    };

  }

  /**
   * 发送数据
   * @param message
   */
  send(message: any) {
    if (!(this._websocket instanceof window.WebSocket)) return;
    if (this._websocket.readyState !== this._websocket.OPEN) {
      new Error("没有连接到服务器，无法发送消息");
      return;
    }
    this._websocket.send(message);
  }

  /**
   * 触发接收消息事件
   * @param callback
   */
  websocketOnMessage(callback: Function | null) {
    if (!(this._websocket instanceof window.WebSocket)) return;
    this._websocket.onmessage = (event) => {
      // 收到任何消息，重新开始倒计时心跳检测
      if (typeof callback === "function") {
        callback(event.data);
      } else {
        (typeof this._option.messageCallback === "function") && this._option.messageCallback(event.data);
      }
    };
  }

  /**
   * 连接错误
   * @param callback
   */
  websocketOnError(callback: Function | null) {
    if (!(this._websocket instanceof window.WebSocket)) return;
    this._websocket.onerror = (event) => {
      if (this._option.debug) console.error("连接发生错误", event);
      if (typeof callback === "function") {
        callback(event);
      } else {
        (typeof this._option.errorCallback === "function") && this._option.errorCallback(event);
      }
    };
  }

  /**
   * 连接关闭
   */
  websocketOnClose(callback: Function | null) {
    if (!(this._websocket instanceof window.WebSocket)) return;
    this._websocket.onclose = (event) => {
      if (this._option.debug) console.warn("socket连接关闭,关于原因:", event);
      clearInterval(this._sendPingInterval);
      clearInterval(this._reconnectInterval);
      if (this._activeLink && this._option.isReconnect) {
        this.onReconnect();
      } else {
        this._activeLink = false;
        if (this._option.debug) console.log("%c websocket链接完全关闭", "color:green");
      }
      if (typeof callback === "function") {
        callback(event);
      } else {
        (typeof this._option.closeCallback === "function") && this._option.closeCallback(event);
      }
    };
  }

  /**
   * 连接事件
   */
  onReconnect() {
    if (this._option.debug) console.warn(`非正常关闭,${this._option.reconnectTime}毫秒后触发重连事件`);
    if (this._option.reconnectCount === -1 || this._option.reconnectCount > this._reconnectNum) {
      this._reconnectInterval = setTimeout(() => {
        this._reconnectNum++;
        if (this._option.debug) console.warn(`正在准备第${this._reconnectNum}次重连`);
        this.init();
      }, this._option.reconnectTime);
    } else {
      this._activeLink = false;
      if (this._option.debug) console.warn(`已重连${this._reconnectNum}次仍然没有响应,取消重连`);
      clearInterval(this._reconnectInterval);
    }
  }

  /**
   * 移除socket并关闭
   */
  removeSocket() {
    this._activeLink = false;
    if (!(this._websocket instanceof window.WebSocket)) return;
    this._websocket.close(1000);
  }


  /**
   * 心跳机制
   * @param time
   * @param ping
   */
  // sendPing(time = 5000, ping = "ping") {
  //   clearInterval(this.sendPingInterval);
  //   if (time === -1) return;
  //   this.send(ping);
  //   this.sendPingInterval = setInterval(() => {
  //     this.send(ping);
  //   }, time);
  // }
  sendPing(time = 5000) {
    clearInterval(this._sendPingInterval);
    if (time === -1) return;
    const ping = {
      messageRequest: undefined, messageResponse: undefined, notification: undefined, type: HeadType.HEAD_TYPE_KEEPALIVE_REQUEST,
      authenticationRequest: undefined
    }
    let pingMessage = Message.encode(ping).finish();
    this._sendPingInterval = setInterval(() => {
      this.send(pingMessage);
    }, time);
  }

  /**
   * 返回websocket实例
   * @returns {null}
   */
  getWebsocket() {
    return this._websocket;
  }

  /**
   * 查看连接状态
   */
  getActiveLink() {
    return this._activeLink;
  }
}

export default Socket;