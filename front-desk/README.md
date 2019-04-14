## 基本环境

### `TypeScript` + `NEXT.js` + `Koa` + `React` + `Redux` + `Less` + `Antd`

## 前台安装流程

1. 环境准备 

   - [Git](https://git-scm.com/downloads "")
   - [Node](https://nodejs.org/en/ "")

2. 克隆项目

   ```shell
   git clone https://github.com/MiDouShiTongTong/auction-frontend.git
   ```

3. 进入  `frontend-desk `目录，运行 `cmd` 执行以下命令

   ```shell
   npm config set registry https://registry.npm.taobao.org
   ```

   ```shell
   npm install
   ```

   等待命令执行完成, 运行 `可用脚本`

## 可用脚本

### `npm run start`

运行开发环境

### `npm run build`

打包项目

### `npm run start-prod`

运行生产环境 运行生产环境需要先`打包项目`

## 目录说明

front-desk

|── server `服务端文件`

​	|── app-router.js `应用的路由`

|── src `源代码文件`

​	|── api `API 接口方法`

​	|── static `资源文件[css, js, image]等`

​	|── component `组件`

​	|── config `业务配置文件`

​	|── pages `路由对应的页面`

​	|── store `redux 状态管理`

​	|── util `工具库`







