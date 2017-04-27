/**
 * LabelController
 *
 * @description :: Server-side logic for managing labels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getLabelByName: function (req, res) {
    Label.findOne(req.allParams()).populate('platforms').exec((err, label) => {
      if (err) {
        return res.serverError(err);
      }
      if(label === undefined){
        label={};
      }
      return res.json(label);
    });
  },

  getShowLabel:(req, res)=>{
    Label.find({show:true}).exec((err , labels)=>{
      if(err){
        res.serverError(err);
      }
      if(labels === undefined){
        labels=[];
      }

      res.json(labels);
    });
  },
  getLabelNoPlatforms:(req, res)=>{
    Label.find().exec((err , labels)=>{
      if(err){
        res.serverError(err);
      }
      if(labels === undefined){
        labels=[];
      }

      res.json(labels);
    });
  },
};

