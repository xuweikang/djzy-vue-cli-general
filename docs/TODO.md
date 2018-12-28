# TODO
> TODO文件里列出所有在djzy-app-h5里有，但djjk-vue里暂时没有的功能。主要考虑这些功能点：1）功能多余或者对用户使用体验造成干扰；2）不利于项目简洁，存在引入bug风险，增大测试复杂度。

* 问诊单草稿功能（将草稿保存到server，以及从server 上获取并渲染草稿）
* doctorList & friendsFollowList 底部的slogan图标
* doctorList & doctorDetail 分享医生名片功能
* 页面事件的CNZZ上报功能


## 滑动组件要求
* 支持切换回定位（可以配合vuex一起）
* 支持上滑（infinite）和下拉（refresh）
* 如果下拉（refresh）是加载很多，支持下拉之后位置不动