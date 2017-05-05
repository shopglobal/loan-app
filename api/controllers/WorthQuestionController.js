/**
 * WorthQuestionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getWorthQuestionSortByProp:(req ,res)=>{
    WorthQuestion.find().sort(req.param('prop') + " " + req.param('ascOrDesc')).exec((err , questions)=>{
      if(err){
        return res.serverError(err);
      }
      if(questions === undefined){
        questions = [];
      }
      return res.json(questions);
    });

  },
};

