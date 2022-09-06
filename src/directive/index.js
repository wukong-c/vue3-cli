// 按钮节流
export const shake = {
  mounted: function (el, binding) {
    let lock = true;
    el.addEventListener("click", () => {
      if (lock) {
        if (!lock) return;
        lock = false;
        setTimeout(() => {
          binding.value();
          lock = true;
        }, 500);
      }
    });
  },
};

//输入框防抖
export const deinput = {
  mounted: function (el, binding) {
    let timer = null;
    el.addEventListener("input", e => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        binding.value(e.target.value);
      }, 500);
    });
  },
};
