const api_user = require('./api/api_user');
const api_appointment = require('./api/api_appointment');
const api_service = require('./api/api_service');
const api_order = require('./api/api_order');

const view_admin = require('./view/admin/admin');

module.exports = (app) => {
  // api routes
  app.use('/api', api_user);
  app.use('/api', api_appointment);
  app.use('/api', api_service);
  app.use('/api/order', api_order);

  // view routes
  app.use('/admin', view_admin);

  // other routes
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
}
