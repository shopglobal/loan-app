/**
 * AdController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var path = require('path');

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

  selectSomePropsAd: (req, res) => {
    let props = req.param('props').split(',');
    Ad.find({
      select: props
    }).sort('updatedAt DESC').exec((err, ads) => {
      if(err){
        return res.serverError(err);
      }
      if(ads===undefined){
        ads=[];
      }
      return res.json(ads);
    });
  },

  uploadImage: (req, res) => {
    req.file('file').upload({
      dirname: path.resolve(sails.config.appPath, path.join('assets','images','adImage')),
    }, function (err, uploadedFiles) {
      if (err) return res.serverError(err);

      let name = uploadedFiles[0].fd;
      return res.json({
        url: path.join('/images','adImage', path.basename(name)),
        //filename:name,
      });
    });
  },

};

