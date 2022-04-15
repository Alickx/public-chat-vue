<template>
  <div class="min-h-screen bg-[url('@/assets/bg.jpg')] bg-cover bg-center">
    <div class="flex items-center justify-center min-w-full">
      <div class="shadow max-w-md w-full space-y-8 mt-20 p-20 bg-white bg-opacity-75 backdrop-blur-sm rounded-lg">
        <div>
          <img class="mx-auto h-24 w-auto rounded-full"
               src="https://songtiancloud-1300061766.cos.ap-guangzhou.myqcloud.com/img/202110211257177.jpg"
               alt="Workflow">
          <h2 class="mt-6 text-center text-3xl font-sans text-gray-900">登录进入聊天室</h2>
        </div>
        <form class="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="username" class="sr-only">用户名</label>
              <input id="username" name="username" v-model="loginModel.username" type="text" autocomplete="text"
                     required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     placeholder="用户名">
            </div>
            <div>
              <label for="password" class="sr-only">密码</label>
              <input id="password" name="password" v-model="loginModel.password" type="password"
                     autocomplete="current-password" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     placeholder="密码">
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" v-model="rememberMe"
                     class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"> 记住我 </label>
            </div>
            <div class="text-sm">
              <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">没有账号? 注册</router-link>
            </div>
          </div>
          <div>
            <button type="submit"
                    @click.prevent="loginHandler"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"/>
            </svg>
          </span>
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ILoginParams} from "../../api/type/ILoginParams";
import {UserService} from "../../api/service/UserService";
import {useUserStore} from "../../store/store";
import {useMessage} from "naive-ui";
import {storeToRefs} from "pinia";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const message = useMessage();
const loginModel = ref<ILoginParams>({
  username: '',
  password: ''
});
const {user} = storeToRefs(userStore);

let rememberMe = ref<boolean>(false);

/**
 * 登录
 */
const loginHandler = async () => {
  const res = await UserService.login(loginModel.value)
  if (res.code === 200) {
    userStore.$patch((state) => {
      state.token = res.data.accessToken;
      state.user = res.data.user;
      state.refreshToken = res.data.refreshToken;
      state.isLoggedIn = true;
    })
    message.success('登入成功');
    await router.push("/")
  } else {
    message.error(res.message);
    loginModel.value.password = '';
  }
};


</script>

<style scoped>

</style>
