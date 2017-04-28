/**
 * GuideController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getOrderedGuide:(req, res)=> {
    Guide.find().sort('order').exec((err , guides)=>{
      if (err){
        return res.serverError(err);
      }
      if(guides===undefined){
        guides = [];
      }
      return res.json(guides);
    });
  }

};

