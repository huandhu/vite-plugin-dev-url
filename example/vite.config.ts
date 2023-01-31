import vitePluginDevUrl from '../src/index'

export default {
  plugins: [
    vitePluginDevUrl({ query: { token: 'abc', userId: 123 }, path: '/test', hash: '#normal' })
  ],
  server: {
    host: "0.0.0.0",
  },
}