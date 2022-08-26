import axios from "axios";
import { ElMessage } from "element-plus";
import permission from "../utils/permission";

const $axios = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASEURL,
  timeout: 300000,
});
/*
  **********************************************
  所有的接口都统一写在  src/api文件夹下面 *********
  **********************************************
*/

// 请求拦截
$axios.interceptors.request.use(config => {
  if (config.url !== "/login") {
    config.headers.Authorization = window.localStorage.getItem("token");
    config.headers["accessToken"] = window.localStorage.getItem("token");
  }
  return config;
});

// 响应拦截
//路由菜单特殊处理
const whiteList = [];
function inWhite(url) {
  return !!whiteList.find(item => url.includes(item));
}
$axios.interceptors.response.use(
  response => {
    let resData = response.data;
    if (inWhite(response.config.url)) {
      return resData;
    }
    let { isNotTransformRequestResult } = response.config;
    // 下载文件流  如果返回的是流形式  直接自动下载  并且 大小>89 也就是  文件存在
    if (
      Object.prototype.toString.call(resData) === "[object Blob]" &&
      !isNotTransformRequestResult &&
      resData.size > 89
    ) {
      let fileName = "导出文件.xlsx";
      if (response.headers["content-disposition"]) {
        fileName = decodeURIComponent(
          response.headers["content-disposition"]
        ).replace("attachment;filename*=utf-8''", "");
        // .replace(".xlsx", "");
      }
      const link = document.createElement("a");
      const blob = new Blob([resData], {
        type: "application/vnd.ms-excel",
      });
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      ElMessage.success("导出成功");
      return;
    } else if (
      // 流存在 但是文件不存在
      Object.prototype.toString.call(resData) === "[object Blob]" &&
      !isNotTransformRequestResult &&
      resData.size <= 89
    ) {
      ElMessage.warning("远端服务没有这个文件, 请上传文件之后在下载");
    }
    // 正常接收数据  如果 isNotTransformRequestResult字段存在  则把这个数据实体返回
    if (isNotTransformRequestResult) {
      return resData;
    } else if (
      Object.prototype.toString.call(resData) === "[object Blob]" &&
      resData.code !== "000000"
    ) {
      // 如果是文件流形式，且状态码为000000  啥也不干
      return false;
    } else if (
      Object.prototype.toString.call(resData) !== "[object Blob]" &&
      resData.code !== "000000"
    ) {
      // 如果 不是 文件流形式，且状态码为000000  统一提示
      ElMessage.error(resData.data || resData.mesg);
      return false;
    } else {
      if (resData.data === undefined) resData.data = true;
      return resData.data;
    }
  },
  error => {
    let errorStatus = error.response.status;
    if (errorStatus == 401 || errorStatus == 403) {
      //退出登录
      permission.loseEfficacy();
      return;
    }
    const code = String(error.response.status).substring(0, 1);
    switch (code) {
      case "4":
        ElMessage({
          message: "参数错误,请联系管理员",
          type: "error",
          duration: 3000,
        });
        break;
      case "5":
        ElMessage({
          message: error.response.statusText || "Error",
          type: "error",
          duration: 3000,
        });
        break;
      default:
        // 报错统一提示
        ElMessage({
          message: "Error",
          type: "error",
          duration: 3000,
        });
        break;
    }
  }
);

export default $axios;
