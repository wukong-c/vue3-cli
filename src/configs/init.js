//如需预加载数据
import baseStore from "@/store/base.store";
function initSystem() {
  const store = baseStore();
  console.log(store.name);

  return new Promise(resolve => {
    //模拟请求
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export default initSystem;
