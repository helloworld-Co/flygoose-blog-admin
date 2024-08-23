# hellowolrd-blog-new

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## 飞鹅周边 (可访问一下地址访问体验)

##### 飞鹅官网 - flygoose.helloworld.net

##### 飞鹅博客 - flygoose-blog.helloworld.net

##### 飞鹅管理系统 - flygoose-admin.helloworld.net

##### helloworld 开发者社区 - www.helloworld.net

## 部署相关

#### 环境安装

确保你已经全局安装了 Node.js 和 npm / yarn，并且版本满足 Vue3 项目需求。node 版本 16+即可。

###### yarn 安装

```sh
npm install --g yarn
```

1. 安装 Node.js
   1. 访问 Node.js 官方网站（https://nodejs.org/en/download/） 来进行下载。
   2. 确认安装成功后，通过命令行 `node -v`来检查 Node.js 和 npm 的版本信息。
2. 克隆项目到本地

#### 依赖安装 + 项目启动 + 项目打包

在项目根目录下使用 cmd 终端 or vscode 编辑器终端进行初始化依赖安装、启动、打包。

##### 依赖安装

```sh
pnpm install / pnpm install / yarn install
```

在此建议使用 pnpm 进行安装，如果没有安装 pnpm，可以再 package.json 文件中将如下代码注释

```sh
"preinstall": "npx only-allow pnpm"
```

##### 项目启动

```sh
npm run dev / yarn run dev
```

##### 项目接口请求地址修改

在根目录找到 `.env.development` 文件

##### (注：在此项目中，`.env.development`、`.env.production` 文件是用来区分不同环境，具体可根据项目需求进行修改)

```sh
// 接口请求地址
VITE_API_BASE_URL = "https://test-blog.helloworld.net/api/"
// 图片地址
VITE_API_BASE_UPLOAD_IMG_URL = "https://test-blog.helloworld.net"
```

##### 项目打包（具体可查看 package.json 文件中的 scripts 配置,根据项目需求进行修改）

```sh
npm run build:prod  // 打包生产环境
npm run build:dev  // 打包开发环境
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

commit your code use pnpm commit
