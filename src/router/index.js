import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path : '/about',
      name : 'about',
      component : ()=>import('../views/AboutView.vue')
    },
    {
      name: "NotFound",
      path: "/:pathMatch(.*)*",
      component: () => import("../views/PageNotFound.vue"),
    },
  ],
});

export default router;
