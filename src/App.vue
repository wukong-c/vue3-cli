<template>
  <el-config-provider size="default" :z-index="3000" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
let a = 1;
</script>
<style lang="scss"></style>
