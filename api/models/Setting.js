/**
 * Setting.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    serviceTele:{
      type:'string',
    },
    msgSignature:{
      type:'string',
    },
    msgTemplate:{
      type:'string',
    },
    msgAccount:{
      type:'string',
    },
    msgPassword:{
      type:'string',
    },
    msgUrl:{
      type:'string',
    },

  },

};

