const api = require('./api')

module.exports = (app) => {
  // api routes
  app.use('/api', api);

  // other routes
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
}
