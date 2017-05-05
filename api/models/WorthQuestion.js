/**
 * WorthQuestion.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    question:{
      type:'string'
    },

    order:{
      type:'number',
      columnType:'int'
    },

    answerCount:{
      type:'number',
      columnType:'int',
      defaultsTo:4,
    },

    answer1:{
      type:'string'
    },
    worth1:{
      type:'number',
      columnType:'int'
    },

    answer2:{
      type:'string'
    },
    worth2:{
      type:'number',
      columnType:'int'
    },

    answer3:{
      type:'string'
    },
    worth3:{
      type:'number',
      columnType:'int'
    },

    answer4:{
      type:'string'
    },
    worth4:{
      type:'number',
      columnType:'int'
    },

  },

};

