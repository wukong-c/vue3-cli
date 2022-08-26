import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "virtual:svg-icons-register";
import componentsArr from "./components/index.js";
import * as directive from "./directive";
import initSystem from "./configs/init";
import "element-plus/theme-chalk/src/index.scss";
import "./styles/index.scss";

const app = createApp(App);

//element-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//自定义指令
for (let i in directive) {
  app.directive(i, directive[i]);
}
// 公共组件 注册
componentsArr.forEach(item => {
  app.component(item.__name, item);
});

app.use(createPinia());
app.use(router);

initSystem().then(() => {
  app.mount("#app");
});
