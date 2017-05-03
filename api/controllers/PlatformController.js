/**
 * PlatformController
 *
 * @description :: Server-side logic for managing platforms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  setLabel: (req, res) => {
    Platform.replaceCollection(req.param('id'), 'labels').members(req.param('labels')).exec((err) => {
      if (err) {
        return res.serverError(err);
      }
      return res.ok();
    });
  },
  getPlatformByLabelName: (req, res) => {

    Label.findOne(req.allParams()).populate('platforms').exec((err, label) => {
      if (err) {
        return res.serverError(err);
      }
      let platforms = [];
      if (label !== undefined) {
        platforms = label.platforms;
      }
      //console.log(platforms);
      res.json(platforms);
    });
  },
  setPlan: (req, res) => {
    Platform.replaceCollection(req.param('id'), 'plans').members(req.param('plans')).exec((err) => {
      if (err) {
        return res.serverError(err);
      }
      return res.ok();
    });
  },

  uploadLogo: (req, res) => {
    req.file('file').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images/platformLogo'),
    }, function (err, uploadedFiles) {
      if (err) return res.serverError(err);

      let name = uploadedFiles[0].fd;
      return res.json({
        url:"/images/platformLogo"+name.substr(name.lastIndexOf('\\')),
        //filename:name,
      });
    });
  },

};

