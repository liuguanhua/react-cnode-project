# react-cnode-project

### React 版 Cnode 社区

技术栈： WebPack^3.6、React^16.3、React-Router-Dom^4.2、Antd^3.5、React-Dom^16.3、Redux、React-Redux、Es6、Flex、Sass

链接：[在线访问](//liuguanhua.github.io/cnode)

![qrcode](https://raw.githubusercontent.com/liuguanhua/react-cnode-project/master/src/assets/images/cnode-qrcode.png)

![demo](https://raw.githubusercontent.com/liuguanhua/react-cnode-project/master/src/assets/images/small-demo.gif)

### 目录

```
react-cnode-project/
   |
   ├──src/
       |
       ├──assets/                    * 资源文件(图标、图片、样式)
       |
       ├──component/                 * 公共组件
       │
       │──script/                    * 脚本(Rem适配、Axios请求、路由配置、工具函数)
       |
       ├──store/                     * Redux
       │
       ├──view/                      * 视图展示页面
       │
       │__index.js                   * 入口文件
       │
       │__registerServiceWorker.js   * ServiceWorker
   |
   ├──config-overrides.js            * 增加WebPack配置及修改Antd主题颜色
```

### 功能

* 登录、登出
* 发表话题
* 个人消息
* 评论、点赞帖子
* 查看用户资料

### 运行

```
下载：git clone https://github.com/liuguanhua/react-cnode-project.git
进入：cd react-cnode-project
安装：yarn install
开发：yarn start
生产：yarn build
```

<!-- "homepage": "https://liuguanhua.github.io/cnode/",
"homepage": "http://localhost:1111/react-cnode-project/build/", -->
