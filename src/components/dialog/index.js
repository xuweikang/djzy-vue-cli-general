import DialogComponent from './dialog.vue'

const Dialog = {};

// 注册Dialog
Dialog.install = function (Vue) {
  // 生成一个Vue的子类
  // 同时这个子类也就是组件
  const DialogConstructor = Vue.extend(DialogComponent)
  // 生成一个该子类的实例
  const instance = new DialogConstructor();

  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法
  Vue.prototype.$dialog = function (obj) {
    if (!obj) {
      return {
        show: () => { instance.show = true },
        hide: () => { instance.show = false }
      }
    }
    if (Object.keys(obj).length > 0) {
      instance.show = true
    }
    instance.title = obj.title || '提示';
    instance.titleStyle = obj.titleStyle || {}
    instance.content = obj.content;

    instance.cancelText = (obj.cancel && obj.cancel.text) || '';
    instance.confirmText = (obj.confirm && obj.confirm.text) || '';
    instance.cancelStyle = (obj.cancel && obj.cancel.style) || {}
    instance.confirmStyle = (obj.confirm && obj.confirm.style) || {}
    instance.cancelCallback = obj.cancel && obj.cancel.callback;
    instance.confirmCallback = obj.confirm && obj.confirm.callback
  }
}

export default Dialog
