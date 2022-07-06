/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': { view: 'pages/homepage' },

  //auth
  'POST /auth/login': { action: 'auth/login' },
  'GET /auth/validateToken': { action: 'auth/validate-token' },

  //users
  'GET /users': { action: 'users/get-all' },
  'GET /users/:publicId': { action: 'users/get-one' },
  'PUT /users/:publicId': { action: 'users/update' },
  'DELETE /users/:publicId': { action: 'users/delete' },

  //Users > Council
  'GET /users/council': { action: 'council/get-all' },
  'GET /users/:publicId/council': { action: 'council/get-one' },
  'POST /users/council': { action: 'council/create' },

  // Users > Sponsor
  'POST /users/sponsor': { action: 'sponsor/create' },
  // Users > associated
  'GET /users/associates': { action: 'associated/get-all' },

  //Contributions
  'POST /users/:publicId/council/contribution': {
    action: 'contribution/create',
  },
  'DELETE /users/:publicId/council/contribution': {
    action: 'contribution/delete',
  },
  'GET /documents': { action: 'documents/get-all' },

};
