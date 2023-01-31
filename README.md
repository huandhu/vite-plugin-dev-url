# vite-plugin-dev-url
这是一个 vite 插件，主要用于给 vite 开发服务器启动时，打印的地址连接添加用户的自定义属性及参数，包括 path、search 及 hash
<img src="img/dome.jpeg">

## 安装
```bash
npm i -D vite-plugin-dev-url
```
添加插件到 `vite.config.ts`:
```ts
// vite.config.ts
import vitePluginDevUrl from 'vite-plugin-dev-url'

export default {
  plugins: [
    vitePluginDevUrl({ query: { token: 'abc', userId: 123 }, path: '/test', hash: '#normal' })
  ],
  server: {
    host: "0.0.0.0",
  },
}
```
## Query 参数是异步方法

```ts
// vite.config.ts
import vitePluginDevUrl from 'vite-plugin-dev-url'

export default {
  plugins: [
    vitePluginDevUrl({ query: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ psToken: 'abc', psUserId: 123 })
          }, 1e3)
        })
      }, path: '/promise', hash: '#ps'
    })
  ],
  server: {
    host: "0.0.0.0",
  },
}
```
## options
| options| description                                                              | type                | default |
|--------|------------------------------------------------------------------------- |---------------------|---------|
| open   | 在开发服务器启动时自动在浏览器中打开应用程序, query、path、hash等会自动拼接到url上  | boolean             | false   |
| query  | url 上的 query 部分。                                                      | object or function  | {}      |
| path   | url 上的 path 部分。                                                       | string              | ''      |
| hash   | url 上的 hash 部分。                                                       | string              | ''      |