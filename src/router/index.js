import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/Layout.vue";
import Error404 from "../components/errorComponent/404.vue";

const HelloWorld = () => import("@/views/HelloWorld/Index.vue");

let routes = [
  {
    path: "/",
    redirect: "/HelloWorld",
    component: Layout,
    children: [
      {
        name: "HelloWorld",
        path: "/HelloWorld",
        component: HelloWorld,
      },
    ],
  },
  {
    path: "/:path(.*)*",
    name: "404",
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
