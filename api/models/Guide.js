/**
 * Guide.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string'
    },

    subtitle: {
      type: 'string'
    },

    icon: {
      type: 'string',
      defaultsTo:'/images/icon/icon.png',
    },

    readQuantity: {
      type: 'number',
      columnType: 'int',
    },

    link: {
      type: 'string'
    },
    //顺序字段
    order: {
      type: 'number',
      columnType: 'int',
      defaultsTo: 1,
    },

  },

};

