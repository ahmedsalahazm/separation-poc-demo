module.exports = ({ env }) => ({
  /**
   * SEPARATION SWITCH.
   * false  -> this app serves ONLY the API + /admin backend routes.
   *           The React dashboard is built and hosted by strapi-frontend.
   */

  serveAdminPanel: env.bool('SERVE_ADMIN_PANEL', false),
  autoOpen: env.bool("AUTO_OPEN_ADMIN_PANEL", false),

  /**
   * Public URL of the separately hosted dashboard.
   * Used for emails (invites, password reset) so links point at the right host.
   */
  url: "/",//env('ADMIN_URL', 'http://localhost:8080'),

  /**
   * The admin stores its access token in a JS-readable cookie written on the
   * DASHBOARD's own origin. Strapi defaults the cookie path to `/admin`, which
   * only works when the panel is served from `/admin`. This dashboard is served
   * from the root of its own host, so the cookie must be scoped to `/` or the
   * SPA writes a token it can never read back -> endless 401s after login.
   *
   * Value is inlined into the bundle at build time. Changing it needs a rebuild.
   */
  auth: {
    // cookie: {
    //   path: env('ADMIN_COOKIE_PATH', '/'),
    // },
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
});
