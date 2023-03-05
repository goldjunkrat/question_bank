# question_bank
微信小程序--中医知识题库

微信搜索"工具箱的测试程序"即可体验

本程序模块:
1.首页(可开启快速刷题)
2.刷题页
3.题库分类
4.题目列表
5.收藏夹
6.错题本
7.历史记录


pages中一个文件夹即为一个页面\n
components为构成页面的组件\n
store为vuex的状态管理中心\n
mixin为混入,其中封装了登录功能\n
mixins封装了分享功能\n
api中有着对请求使用promise进行的二次封装\n
App.vue中是小程序启动的生命周期,有持久化登录的验证\n
main.js为入口文件,插件和全局事件总线以及全局混入在此处注册使用\n
package.json为本程序所用到的依赖,执行npm install可安装\n
pages.json为小程序的路由配置及全局配置\n
