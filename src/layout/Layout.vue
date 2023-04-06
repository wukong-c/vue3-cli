<template>
  <div id="layout">
    <header>head</header>
    <div class="routerBox">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
#layout {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .routerBox {
    flex: 1;
    overflow: auto;
  }
}
header {
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  background-color: #f2f2f2;
}
</style>
