import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from "vue-router";
import {useUserStore} from "../store/store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Index",
    meta: {
      auth: true,
      title: "聊天间"
    },
    component: () => import("@/pages/index/Index.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/auth/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/auth/Register.vue")
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/**
 * 全局路由守卫
 */
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.auth) {
    if (userStore.isLoggedIn) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;
