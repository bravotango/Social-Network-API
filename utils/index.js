const moment = require('moment');

module.exports = {
  longDate(date) {
    return moment(date).format('LLLL');
  },
  shortDate(date) {
    return moment(date).format('llll');
  },
};
