/**
 * AdController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getAdByLocation:(req , res)=>{
    Ad.find(req.allParams()).exec((err , ads)=>{
      if(err){
        return res.serverError(err);
      }
      if(ads === undefined){
        ads=[];
      }
      return res.json(ads);
    });
  },

};

