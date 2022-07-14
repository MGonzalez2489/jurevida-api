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
  'GET /users/sponsors': { action: 'sponsor/get-all' },

  // Users > associated
  'GET /users/associates': { action: 'associated/get-all' },

  //Contributions
  'POST /users/:publicId/council/contribution': {
    action: 'contribution/create',
  },
  'DELETE /users/:publicId/council/contribution': {
    action: 'contribution/delete',
  },

  // Documents
  'GET /documents': { action: 'documents/get-all' },
  //'/public/*': serveStatic('./documents/', { skipAssets: true }),
  // Password
  'PUT /resetPassword/:publicId': { action: 'password/reset' },

  //Financial Bank Assistant
  'GET /financial/assistant/bank': { action: 'financial/assistant/get-bank' },
  'GET /financial/assistant/bank/movements': {
    action: 'financial/movement/get-bank-all',
  },
  'DELETE /movement/:publicId': { action: 'financial/movement/delete' },
  'GET /financial/assistant/bank/movements/export': {
    action: 'financial/movement/export',
  },
  'POST /financial/assistant': { action: 'financial/assistant/create' },
  //Financial Bank Period
  'GET /financial/period': { action: 'financial/period/get-bank' },
  // Financial movements
  'POST /financial/assistant/:publicId/income': {
    action: 'financial/movement/create-income',
  },
  'POST /financial/assistant/:publicId/expense': {
    action: 'financial/movement/create-expense',
  },
};
