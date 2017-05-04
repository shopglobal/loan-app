/**
 * LoanStrategyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var path = require('path');

module.exports = {

  getStrategySortByProp:(req , res)=>{
    Strategy.find().sort(req.param('prop') + " " + req.param('ascOrDesc')).exec((err , strategies)=>{
      if(err){
        return res.serverError(err);
      }
      if(strategies === undefined){
        strategies = [];
      }
      return res.json(strategies);
    });
  },

  uploadIcon: (req, res) => {
    req.file('file').upload({
      dirname: path.resolve(sails.config.appPath, path.join('assets','images','strategyIcon')),
    }, function (err, uploadedFiles) {
      if (err) return res.serverError(err);

      let name = uploadedFiles[0].fd;
      return res.json({
        url: path.join('/images','strategyIcon', path.basename(name)),
        //filename:name,
      });
    });
  },

};

