import vitePluginDevUrl from '../src/index'

export default {
  plugins: [
    vitePluginDevUrl({ query: () => ({ fnToken: 'abc', fnUserId: 123 }), path: '/function', hash: '#fn' })
  ],
  server: {
    host: "0.0.0.0",
  },
}