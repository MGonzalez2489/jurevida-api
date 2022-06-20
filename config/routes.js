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

  'POST /auth/login': 'AuthController.logIn',
  'GET /auth/validateToken': 'AuthController.validateToken',

  'GET /roles': 'RolesController.getAll',

  'GET /users/:publicId': 'UsersController.getOne',
  'GET /users': 'UsersController.getAll',
  'POST /users': 'UsersController.postUser',
  'PUT /users/:publicId': 'UsersController.putUser',
  'DELETE /users/:publicId': 'UsersController.deleteUser',

  //Contributions
  'POST /users/:publicId/council/contribution': 'ContributionController.create',
  'GET /users/council/contribution': 'ContributionController.getAll',

  'PUT /resetPassword/:publicId': 'PasswordController.resetPassword',
  // Associates
  'GET /associates': 'AssociatesController.getAll',
  'GET /associates/:publicId': 'AssociatesController.getOne',

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
