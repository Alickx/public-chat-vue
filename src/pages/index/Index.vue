<template>
  <div class="flex flex-row">
    <div class="flex flex-row h-screen">
      <div class="w-16 h-full flex flex-col items-center py-5 space-y-5" style="background-color:#2e2e2e;">
        <img class="h-10 w-10"
             :src="userStore.user.avatar" alt="">
        <n-button text>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" viewBox="0 0 20 20"
               fill="currentColor">
            <path fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd"/>
          </svg>
        </n-button>
        <n-button text @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
        </n-button>
      </div>
      <ul class="flex flex-col h-full overflow-y-auto w-auto sm:w-72" style="background-color:#e0dede;">
        <n-scrollbar>
          <li class="flex flex-row space-x-2 px-5 py-2 items-center hover:bg-gray-100" v-for="data in chatGroupList">
            <img class="h-12 w-auto rounded-sm"
                 :src="data.avatar" alt="">
            <span class="font-sans font-medium overflow-hidden">{{ data.groupName }}</span>
          </li>
        </n-scrollbar>
      </ul>
    </div>
    <div class="w-screen flex flex-col h-screen">
      <div class="flex h-24 items-center bg-gray-100 border-b-2 border-gray-300">
        <span class="ml-14 text-xl">公共聊天室</span>
      </div>
      <div class="overflow-y-auto relative z-auto h-full w-full before:box-border border-none" ref="scrollRef"
           style="background-color:#f5f5f5">
        <div class="px-10 py-4 space-y-10">
          <div class="flex" :class='{"flex-row-reverse": data.sender.id === userStore.user.id}'
               v-for="data in messageList">
            <img class="h-10 w-10 rounded-sm"
                 :src="data.sender.avatar"
                 alt="">
            <div class="flex flex-col space-y-1 mx-2">
              <p class="flex mx-2" :class='{"flex-row-reverse": data.sender.id === userStore.user.id}'>{{ data.sender.nickName }}</p>
              <div class="rounded-md w-52 mr-2 ml-2 flex" :class='{"flex-row-reverse": data.sender.id === userStore.user.id}'>
                <span class="break-normal px-2 py-2 rounded-md w-auto block whitespace-pre-wrap overflow-hidden" style="word-wrap: break-word"
                      :style="MessageStyle(data.sender.id)">{{ data.messageContent }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="background-color:#f5f5f5;">
        <div class="w-full border-t-2 h-12 flex flex-row items-center px-3 space-x-4 hidden">
          <n-button text>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clip-rule="evenodd"/>
            </svg>
          </n-button>
          <n-button text>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                    clip-rule="evenodd"/>
              <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z"/>
            </svg>
          </n-button>
          <n-button text>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 13h6M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
          </n-button>
          <n-button text>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clip-rule="evenodd"/>
            </svg>
          </n-button>
        </div>
        <div>
          <n-input
              ref="sendMessageButtonRef"
              :round="false"
              maxlength="100"
              show-count
              :autofocus="true"
              v-model:value="inputText"
              type="textarea"
              placeholder=""
              :autosize="{
                minRows:4,
              maxRows: 4,
      }"
          />
        </div>
        <div class="flex flex-row-reverse bg-white">
          <n-popover trigger="click" v-if="inputText.trim()=== ''">
            <template #trigger>
              <n-button type="primary" size="large" @click="sendMessage" @keyup.enter="sendMessage">发送</n-button>
            </template>
            <span>不能发送空白消息</span>
          </n-popover>
          <n-button v-else type="primary" size="large" @click="sendMessage" @keyup.enter="sendMessage">发送</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Socket from "../../socket/websocket";
import {HeadType, Message, MessageRequest} from "../../proto/MessageProto";
import {nextTick, onMounted, ref} from "vue";
import {useUserStore} from "../../store/store";
import {messageUtils} from "../../utils/MessageUtils";
import {GroupService} from "../../api/service/GroupService";
import {IChatGroup} from "../../api/type/IChatGroup";
import {useRouter} from "vue-router";

const userStore = useUserStore();
let wsUrl = "ws://localhost:9898/chat";
let socket = new Socket(wsUrl, {
  debug: false,
  arraybuffer: true
});
let inputText = ref<string>("");

const router = useRouter();
const messageList = ref<MessageRequest[]>([])
const chatGroupList = ref<IChatGroup[]>();
const sendMessageButtonRef = ref<HTMLInputElement>();
const MessageStyle = (id: number) => {
  if (id === userStore.user.id) {
    return {
      backgroundColor: "#95ec69"
    }
  } else {
    return {
      backgroundColor: "#ffffff"
    }
  }
}
const scrollRef = ref<HTMLInputElement>();


//当滚动条在最底下的时候自动滚动
const scrollToBottom = () => {
  nextTick(() => {
    //如果在底部则自动滚动，不在则不滚动
    if (scrollRef.value) {
      if (scrollRef.value.scrollHeight - scrollRef.value.scrollTop - scrollRef.value.clientHeight < 150) {
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
      }
    }
  })
}

const logout = ()=>{
  router.push("/login")
  userStore.logout()
}


/**
 * 接收到消息
 */
socket.websocketOnMessage((resp: ArrayBuffer) => {
  const data = new Uint8Array(resp);
  const message = Message.decode(data);
  if (message.type === HeadType.HEAD_TYPE_MESSAGE_REQUEST) {
    messageList.value.push(message.messageRequest as MessageRequest);
    scrollToBottom();
  } else if (message.type === HeadType.HEAD_TYPE_MESSAGE_NOTIFICATION) {
  }
})

/**
 * 发送消息
 */
const sendMessage = () => {
  //不能发送空白信息
  if (inputText.value.trim() === "") {
    return;
  }
  const message = messageUtils.createMessage(inputText.value, 1);
  const data = Message.encode(message).finish();
  socket.send(data);
  inputText.value = "";
  if (sendMessageButtonRef.value) {
    sendMessageButtonRef.value.focus();
  }
}


onMounted(()=>{
  GroupService.list().then(resp=>{
    chatGroupList.value = resp.data;
  })
})


</script>

<style>


</style>
