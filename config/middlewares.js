module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      /**
       * The dashboard now lives on a different origin, so it must be
       * explicitly allowed. Add every public dashboard origin here.
       */
      origin: [process.env.ADMIN_URL || 'http://admin.local'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      /**
       * Must be an explicit list, NOT '*'.
       * With credentials:true the browser rejects a wildcard header list,
       * and the admin sends `Authorization` on every request.
       */
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
        'X-Requested-With',
        'Strapi-Response-Format',
        'Strapi-Admin-Session',
      ],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
