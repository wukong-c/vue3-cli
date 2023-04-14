//开发环境下使用unplugin-vue-components自动引入导致编译及其缓慢，故开发环境使用全量引入
import * as path from "path";

export default function fullImportPlugin() {
  let config;
  return {
    name: "fullImportElementPlus",
    async configResolved(conf) {
      config = conf;
    },
    transform(code, id) {
      // 判断当前处理的是否是 src/main.js
      if (path.join(config.root, "src/main.js") === id) {
        const name = "ElementPlus";

        // 引入 ElementPlus 和 样式
        const prepend = `import ${name} from 'element-plus';\nimport 'element-plus/dist/index.css';\n`;

        // 通过匹配字符串来使用 ElementPlus （此处替换规则根据 main.ts 的情况而定）
        // 相当于将字符串 `app.mount('#app')` 替换成 `app.use(ElementPlus).mount('#app')`
        code = code.replace(".mount(", $1 => `.use(${name})` + $1);
        return prepend + code;
      }
    },
  };
}
