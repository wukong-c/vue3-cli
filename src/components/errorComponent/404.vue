<template>
  <div class="errorComponent">
    <p>
      404 Not Found
      <el-button type="text" @click="goIndex"> 返回首页 </el-button>
    </p>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    function goIndex() {
      router.replace("/");
    }
    return {
      goIndex,
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
  p {
    font-size: 28px;
  }
  .el-button {
    font-size: 28px;
    transform: translateY(-2px);
  }
}
</style>
