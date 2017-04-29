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
    },

    icon:{
      type:'string',
      defaultsTo:'/images/icon/icon.png',
    },

    date:{
      type:'string',
    },

    content:{
      type:'string'
    },
    //顺序字段
    order:{
      type:'number',
      columnType:'int',
      defaultsTo:1,

    },


  },

};

