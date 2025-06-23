import { createRouter, createWebHistory } from "vue-router";
import ChatBoard from "../views/ChatBoard.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import RoomList from "../views/RoomList.vue";

const routes = [
  {
    path: "/",
    name: "RoomList",
    component: RoomList,
    meta: { requiresAuth: true },
  },
  {
    path: "/chat",
    name: "ChatBoard",
    component: ChatBoard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = sessionStorage.getItem("user");
  if (requiresAuth && !user) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
