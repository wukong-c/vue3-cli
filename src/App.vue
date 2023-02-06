<template>
  <el-config-provider v-if="true" size="default" :z-index="3000" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
</script>
<style lang="scss"></style>
