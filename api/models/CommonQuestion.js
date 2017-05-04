/**
 * CommonQuestion.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    question:{
      type:'string'
    },
    answer:{
      type:'string'
    },
    //顺序字段
    order:{
      type:'number',
      columnType:'int',
      defaultsTo:1
    },
  },

};

