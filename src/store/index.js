import baseStore from "./base.store";
//各模块统一出口
export default function store() {
  return {
    baseStore: baseStore(),
  };
}
