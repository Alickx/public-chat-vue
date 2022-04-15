<template>
  <main class="relative min-h-screen bg-yellow-200 flex justify-center items-center p-4">
    <div class="relative bg-white shadow overflow-hidden" style="width: 1024px; height: 500px">
      <div class="absolute top-0 left-0 w-full h-full flex">
        <div class="relative w-1/2 h-full bg-white flex justify-center items-center p-14"
             :class='{ "isShowRight":isShowRight }'>
          <div class="space-y-5">
            <h2 class="text-2xl font-semibold uppercase text-center w-full mb-3" style="color: #555">注册一个新账号</h2>
            <n-popover trigger="focus">
              <template #trigger>
                <input type="text" v-model="userRegModel.username"
                       class="relative rounded-md w-full p-3 border-none outline-none shadow-nonetext-sm tracking-tight font-normal"
                       style="background-color: #f5f5f5" placeholder="用户名"/>
              </template>
              <span>不要瞎搞，不能为中文，自己看着办</span>
            </n-popover>
            <n-popover trigger="focus">
              <template #trigger>
                <input type="password" v-model="userRegModel.password"
                       class="relative rounded-md w-full p-3 border-none outline-none shadow-none  text-sm tracking-tight font-normal"
                       style="background-color: #f5f5f5" placeholder="密码"/>
              </template>
              <span>不要泄露常用密码，随便玩玩</span>
            </n-popover>
            <input type="password" v-model="userRegModel.secondaryPassword"
                   class="relative rounded-md w-full p-3 border-none outline-none shadow-none text-sm tracking-tight font-normal"
                   style="background-color: #f5f5f5" placeholder="再次输入密码"/>
            <button class="px-2 py-2 bg-red-500 text-white rounded-sm w-20" @click="showNext">下一步</button>
            <p class="mt-3">已有账号？
              <router-link to="/login">登录</router-link>
            </p>
          </div>
        </div>
        <div class="relative w-1/2 h-full">
          <img src="src/assets/bg.jpg" class="absolute top-0 right-0 w-full h-full bg-cover" alt="">
        </div>
        <div class="relative w-1/2 h-full bg-white flex justify-center items-center p-14"
             :class='{ "isShowRight":!isShowRight }'>
          <div class="space-y-5 w-full">
            <h2 class="text-xl font-semibold uppercase text-center w-full mb-3">请选择您的默认头像和用户名</h2>
            <div class="grid gap-4 grid-cols-4">
              <img class="rounded-full h-12 object-cover cursor-pointer shadow p-2"
                   :style=' index === avatarChooseIndex && avatarChooseStyle ' :src="data.url"
                   v-for="(data,index) in avatarGroup"
                   @click="chooseAvatar(data.url,index)" alt>
            </div>
            <n-popover>
              <template #trigger>
                <input type="text" v-model="userRegModel.nickName"
                       class="relative rounded-md w-full p-3 border-none outline-none shadow-nonetext-sm tracking-tight font-normal"
                       style="background-color: #f5f5f5" placeholder="呢称"/>
              </template>
              <span>不要过分嗷</span>
            </n-popover>
            <button class="px-2 py-2 bg-red-500 text-white rounded-sm w-20" @click="register">正式注册</button>
            <p>
              <n-button text @click.stop="hideNext">返回上一步</n-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>


import {ref} from "vue";
import {IRegisterParams} from "../../api/type/IRegister";
import {UserService} from "../../api/service/UserService";
import {useMessage} from "naive-ui";

const message = useMessage()
let isShowRight = ref<boolean>(false);
let avatarChooseIndex = ref<number>(0);
const userRegModel = ref<IRegisterParams>({
  avatar: "", password: "", secondaryPassword: "", username: "", nickName: ""
});

const avatarGroup = [
  {url: 'http://localhost:8888/20180226105942_T58Mv.jpeg'},
  {url: 'http://localhost:8888/20180905151420_k5Ueh.jpeg'},
  {url: 'http://localhost:8888/20180905151708_fTUsh.jpeg'},
  {url: 'http://localhost:8888/20180905151701_AXUVs.jpeg'},
  {url: 'http://localhost:8888/20180905151705_vAGJ2.jpeg'},
  {url: 'http://localhost:8888/20180905151707_mmtaX.jpeg'},
  {url: 'http://localhost:8888/20180905151709_SkLh2.jpeg'},
  {url: 'http://localhost:8888/20180905151711_AKUuW.jpeg'},
]
const avatarChooseStyle = {
  "borderWidth": "2px",
  "borderStyle": "solid",
  "borderColor": "#228be6",
}

const chooseAvatar = (avatar: string, index: number) => {
  userRegModel.value.avatar = avatar;
  avatarChooseIndex.value = index;
};

const showNext = () => {
  //username正则
  if (!/^[a-zA-Z0-9_]{4,16}$/.test(userRegModel.value.username)) {
    alert("用户名格式不正确");
    return;
  }
  //密码正则
  if (!/^[a-zA-Z0-9_]{6,16}$/.test(userRegModel.value.password)) {
    alert("密码格式不正确");
    return;
  }
  if (userRegModel.value.password === userRegModel.value.secondaryPassword) {
    isShowRight.value = true;
  } else {
    alert("两次密码不一致");
  }
}

const hideNext = () => {
  isShowRight.value = false;
}

const register = () => {
  //呢称正则
  if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,16}$/.test(userRegModel.value.nickName)) {
    alert("呢称格式不正确");
    return;
  }

  //注册
  UserService.register(userRegModel.value).then(res => {
    if (res.code === 200) {
      message.success("注册成功,即将跳转登陆页面");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      message.error(res.message);
    }
  })
}


</script>

<style scoped>


.isShowRight {
  display: none;
}


</style>