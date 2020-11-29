const production = require('./config/webpack.prod');
const development = require('./config/webpack.dev');

module.exports = ({ prod }) => {
  if (prod) return production;
  return development;
};
