const proxyPath = 'https://api.example.com'

module.exports = {
  devServer: {
    port: 8115,
    public: 'dev.example.com',
    proxy: {
      '/api/': {
        target: proxyPath
      },
      '/auth/': {
        target: proxyPath
      },
      '/socket.io': {
        target: proxyPath,
        ws: true
      },
      '^/websocket': {
        target: proxyPath,
        ws: true
      }
    }
  }
}
