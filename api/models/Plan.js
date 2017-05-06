/**
 * Plan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    time:{
      type:'string'
    },
    rate:{
      type:'string',
    },
    platforms:{
      collection:'platform',
      via:'plans'
    },
    orders:{
      collection:'order',
      via:'plan'
    }

  }
};

