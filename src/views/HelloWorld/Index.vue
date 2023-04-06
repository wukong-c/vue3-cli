<template>
  I'm {{ name }}
  <div v-loading="true" class="helloWorld">Hello World</div>
  <el-button type="danger" @click="notify">test</el-button>
</template>
<script>
export default {
  name: "HelloWorld",
};
</script>
<script setup>
import { ElMessage, ElNotification } from "element-plus";
const name = ref("Peppa Pig");
function notify() {
  ElNotification({
    title: "Prompt",
    message: "This is a message that does not automatically close",
    duration: 0,
  });
  ElMessage({
    type: "success",
    message: "",
    duration: 10000,
  });
}
</script>

<style lang="scss" scoped>
.helloWorld {
  text-align: center;
  margin-top: 200px;
  font-size: 20px;
  color: $TC;
}
</style>
