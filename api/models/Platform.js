/**
 * Platform.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    logo: {
      type: 'string'
    },
    slogan: {
      type: 'string'
    },
    applyQuantity: {
      type: 'number',
      columnType:'bigint',
    },
    successQuantity: {
      type: 'number',
      columnType:'bigint',
    },
    grade: {
      type: 'number',
      columnType:'float',
    },
    fastestTime: {
      type: 'string'
    },
    averageTime: {
      type: 'string'
    },
    condition: {
      type: 'string'
    },
    necessary: {
      type: 'string'
    },
    declaration: {
      type: 'string'
    },
    minLimit: {
      type: 'number',
      columnType:'int',
    },
    maxLimit: {
      type: 'number',
      columnType:'int',
    },
    plans: {
      collection:'plan',
      via:'platform'
    },
    labels: {
      collection:'label',
      via:'platforms'
    },
    orders:{
      collection:'order',
      via:'platform'
    },
    url:{
      type:'string'
    },
  }
};

