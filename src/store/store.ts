import {defineStore} from "pinia";
import {IUser} from "../api/type/IUser";
import {ref} from "vue";



export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<IUser>({
      id: -1,
      username: '',
      nickName: '',
      avatar: '',
    });
    const token = ref<string>("");
    const refreshToken = ref<string>("");
    const isLoggedIn = ref<boolean>(false);

    const logout = ()=>{
      user.value = {
        id: -1,
        username: '',
        nickName: '',
        avatar: '',
      };
      token.value = "";
      refreshToken.value = "";
      isLoggedIn.value = false;
    };

    return {
      user,
      token,
      refreshToken,
      isLoggedIn,
      logout
    };
  }, {
    persist: {
      key: 'user',
      storage: window.localStorage,
      serializer: {
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      }
    }
  }
);
