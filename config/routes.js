/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.com/anatomy/config/routes-js
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

  '/': {
    view: 'index'
  },
  '/admin':{
    view:'admin'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'get /platform/label/:name':'PlatformController.getPlatformByLabelName',
  'patch /platform/:id/setLabel':'PlatformController.setLabel',
  'patch /platform/:id/setPlan':'PlatformController.setPlan',



  'get /label/name/:name':'LabelController.getLabelByName',
  'get /label/show':'LabelController.getShowLabel',
  'get /label/noPlatforms':'LabelController.getLabelNoPlatforms',


  'post /user/login':'UserController.login',
  'get /user/hasLogin':'UserController.hasLogin',
  'get /user/logout':'UserController.logout',


};
