import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';

const DefaultContainer = () => import("@/components/DefaultContainer.vue");
const LoginContainer = () => import("@/components/LoginContainer.vue");

const Home = () => import("@/views/Home/Home.vue");
const Login = () => import("@/views/Login/Login.vue");

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'start',
    redirect: '/login',
    component: DefaultContainer,
    children: [{
      path: "escritorio",
      name: "home",
      component: Home
    }]
  },
  {
    path: "/login",
    redirect: "/login",
    name: "startLogin",
    component: LoginContainer,
    children: [{
      path: "/",
      name: "login",
      component: Login
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: "open active",
  scrollBehavior: () => ({
    y: 0
  }),
  routes
});

router.beforeEach((to, from, next) => {
  let datos = store.getters['datosUsuario'];
  if (to.name === "login") {
    next();
  } else if (datos.login) {
    next();
  } else {
    next({
      name: 'login'
    });
  }

});

export default router