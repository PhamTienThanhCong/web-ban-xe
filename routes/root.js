const api_user = require('./api_user');
const api_appointment = require('./api_appointment');

module.exports = (app) => {
  // api routes
  app.use('/api', api_user);
  app.use('/api', api_appointment);

  // other routes
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
}
