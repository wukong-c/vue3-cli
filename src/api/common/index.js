import $axios from "@/plugins/axios";

export default {
  //登录
  login: body => {
    return $axios.post("plc/login", body);
  },
};
