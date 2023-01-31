import vitePluginDevUrl from '../src/index'

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