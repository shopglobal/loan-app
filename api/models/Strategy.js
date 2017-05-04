/**
 * LoanStrategy.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title:{
      type:'string'
    },

    readQuantity:{
      type:'number',
      columnType:'int',
      defaultsTo:0
    },

    icon:{
      type:'string',
      defaultsTo:'/images/icon/icon.png',
    },

    content:{
      type:'string'
    },

  },

};

