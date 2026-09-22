'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/customers',
      handler: 'api::customers.customer.find',
      config: {
        auth: false,
      },
    },
  ],
};
