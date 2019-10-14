const { environment } = require('@rails/webpacker')

environment.config.externals = {
  Routes: 'Routes'
};

module.exports = environment
