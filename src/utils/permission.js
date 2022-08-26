import { ElMessageBox, ElMessage } from "element-plus";
import { removeToken } from "./auth";

function getUrlParam(name, url) {
  if (!url) return null;
  let reg = new RegExp("[?&]" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
  let r = url.match(reg); // 匹配目标参数
  if (r != null) {
    return [decodeURIComponent(r[1]), r[0]];
  }
  return [null]; // 返回参数值
}
export default {
  ip: "http://106.225.177.204:8082/jiujiang",
  // 获取 token
  getToken() {
    let localToken = localStorage.token;
    if (localToken) return;
    let href = location.href;
    let [token, tokenStr] = getUrlParam("token", href);
    if (token) {
      localStorage.setItem("token", token);
      location.href = location.href.replace(tokenStr, "");
      return token;
    }
    this.goLogin();
  },

  // 登录失效
  loseEfficacy() {
    ElMessage.warning("登录失效，请重新登录");
    removeToken();
    this.goLogin();
  },
  // 退出
  logout() {
    ElMessageBox.confirm("确定退出登录?", "退出", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    })
      .then(() => {
        removeToken();
        this.goLogin();
      })
      .catch(() => {});
  },

  // 跳转登录
  goLogin() {
    let redirect = location.href.split("?")[0];
    redirect = encodeURIComponent(redirect);
    let url = this.ip + "/#/login?redirect=" + redirect;
    window.location.href = url;
  },
};
