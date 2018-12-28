import PluginComponent from './loading.vue'

const Loading = {};

// 注册
Loading.install = function (Vue) {
  // 生成一个Vue的子类
  // 同时这个子类也就是组件
  const PluginConstructor = Vue.extend(PluginComponent)
  // 生成一个该子类的实例
  const instance = new PluginConstructor();

  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法
  Vue.prototype.$loading = (action = "start", mask = false, text = '正在加载') => {
    instance.text = text;
    instance.mask = mask;
    switch (action) {
      case 'start':
        instance.show = true;
        break;
      case 'stop':
        instance.show = false;
        break;
      default:
        instance.show = true;
        break;
    }
  }
}

export default Loading
