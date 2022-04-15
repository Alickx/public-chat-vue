import {useUserStore} from "../store/store";
import {HeadType, IsPrivate, Message, MessageRequest, MessageType, User} from "../proto/MessageProto";
import {ref} from "vue";

const store = useUserStore();
export class messageUtils{
  //创建一条群聊信息
  static createMessage(content:string,groupId:number){
    const user = ref<User>({
      avatar: store.user.avatar, id: store.user.id, nickName: store.user.nickName, username: store.user.username
    });
    let timestamp = new Date().getTime() + "";
    //构造消息
    const messageReq = ref<MessageRequest>({
      groupId: groupId,
      isPrivate: IsPrivate.IS_PRIVATE_FALSE,
      messageContent: content,
      receiver: undefined,
      sender: user.value,
      timestamp: timestamp,
      type: MessageType.MESSAGE_TYPE_TEXT
    });

    const message = ref<Message>({
      messageRequest: messageReq.value,
      type: HeadType.HEAD_TYPE_MESSAGE_REQUEST,
      authenticationRequest: undefined,
      messageResponse: undefined,
      notification: undefined
    });
    return message.value;
  }



}