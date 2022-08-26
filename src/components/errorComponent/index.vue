<template>
  <div class="errorComponent">
    <img src="../../assets/image/collapse.png" alt="" />
    <p>
      页面崩溃了～ 请检查网络或
      <el-button type="text" @click="refresh"> 点击刷新 </el-button>
    </p>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    // location.reload();
    function refresh() {
      location.reload();
    }
    return {
      refresh,
    };
  },
});
</script>
<style scoped lang="scss">
.errorComponent {
  width: 100%;
  height: 50%;
  margin: auto auto;
  text-align: center;
  img {
    height: 500px;
  }
  p {
    font-size: 28px;
  }
  .el-button {
    font-size: 28px;
    transform: translateY(-2px);
  }
}
</style>
