/**
 * LabelController
 *
 * @description :: Server-side logic for managing labels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path = require('path');

module.exports = {

  setPlatform: (req, res) => {
    Label.replaceCollection(req.param('id'), 'platforms').members(req.param('platforms')).exec((err) => {
      if (err) {
        return res.serverError(err);
      }
      return res.ok();
    });
  },

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

  selectSomePropsLabel: (req, res) => {
    let props = req.param('props').split(',');
    Label.find({
      select: props
    }).sort('updatedAt DESC').exec((err, labels) => {
      if(err){
        return res.serverError(err);
      }
      if(labels===undefined){
        labels=[];
      }
      return res.json(labels);
    });
  },

  uploadIcon: (req, res) => {
    req.file('file').upload({
      dirname: path.resolve(sails.config.appPath, path.join('assets','images','labelIcon')),
    }, function (err, uploadedFiles) {
      if (err) return res.serverError(err);

      let name = uploadedFiles[0].fd;
      return res.json({
        url: path.join('/images','labelIcon', path.basename(name)),
        //filename:name,
      });
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

