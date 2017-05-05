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
  'get /platform/select/:props':'PlatformController.selectSomePropsPlatform',
  'patch /platform/:id/setLabel':'PlatformController.setLabel',
  'patch /platform/:id/setPlan':'PlatformController.setPlan',
  'post /platform/uploadLogo':'PlatformController.uploadLogo',



  'get /label/name/:name':'LabelController.getLabelByName',
  'get /label/show':'LabelController.getShowLabel',
  'get /label/select/:props':'LabelController.selectSomePropsLabel',
  'get /label/noPlatforms':'LabelController.getLabelNoPlatforms',
  'post /label/uploadIcon':'LabelController.uploadIcon',
  'patch /label/:id/setPlatform':'LabelController.setPlatform',


  'post /user/login':'UserController.login',
  'get /user/hasLogin':'UserController.hasLogin',
  'get /user/logout':'UserController.logout',
  'get /user/verification/:phone':'UserController.generateVerification',

  'get /guide':'GuideController.getOrderedGuide',

  'get /order/user/:id':'OrderController.getOrderByUser',

  'get /ad/location/:location':'AdController.getAdByLocation',
  'post /ad/uploadImage':'AdController.uploadImage',
  'get /ad/select/:props':'AdController.selectSomePropsAd',

  'get /commonquestion/sort/:prop/:ascOrDesc':'CommonQuestionController.getCommonQuestionSortByProp',

  'get /worthquestion/sort/:prop/:ascOrDesc':'WorthQuestionController.getWorthQuestionSortByProp',

  'get /strategy/sort/:prop/:ascOrDesc':'StrategyController.getStrategySortByProp',
  'post /strategy/uploadIcon':'StrategyController.uploadIcon',


};
