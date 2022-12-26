const api_user = require('./api_user');
const api_appointment = require('./api_appointment');
const api_service = require('./api_service');
const api_order = require('./api_order');

module.exports = (app) => {
  // api routes
  app.use('/api', api_user);
  app.use('/api', api_appointment);
  app.use('/api', api_service);
  app.use('/api/order', api_order);

  // other routes
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
}
