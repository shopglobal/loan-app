/**
 * Ad.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    image:{
      type:'string'
    },
    url:{
      type:'string'
    },
    location:{
      type:'number',
      columnType:'int',
      defaultsTo:0,
    },
    title:{
      type:'string'
    }


  },

};

