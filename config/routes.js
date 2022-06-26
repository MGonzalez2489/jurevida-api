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
  'POST /auth/login': 'AuthController.logIn',
  'GET /auth/validateToken': 'AuthController.validateToken',

  //users
  'GET /users': 'UsersController.getAll',

  'GET /users/:publicId': 'UsersController.getOne',
  //Users > Council
  'GET /users/council': 'CouncilController.getAll',
  'GET /users/:publicId/council': 'CouncilController.getOne',
  'POST /users/council': 'CouncilController.create',
  'PUT /users/:publicId/council': 'CouncilController.putUser',
  // Users > Sponsor
  'POST /users/sponsor': 'SponsorController.create',
  // Users > associated
  'GET /users/associates': 'AssociatedController.getAll',
  //'PUT /users/:publicId': 'UsersController.putUser',
  //'DELETE /users/:publicId': 'UsersController.deleteUser',

  //Contributions
  'POST /users/:publicId/council/contribution': 'ContributionController.create',
  'DELETE /contribution/:publicId': 'ContributionController.delete',

  //'PUT /resetPassword/:publicId': 'PasswordController.resetPassword',

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
