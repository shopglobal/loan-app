/**
 * PlanController
 *
 * @description :: Server-side logic for managing plans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  setPlatform: (req, res) => {
    Plan.replaceCollection(req.param('id'), 'platforms').members(req.param('platforms')).exec((err) => {
      if (err) {
        return res.serverError(err);
      }
      return res.ok();
    });
  },

  selectOnePlanSomeProps: (req, res) => {
    let props = req.param('props').split(',');
    let id = req.param('id');
    Plan.findOne({
      where:{id: id},
      select: props
    }).exec((err, plan) => {
      if (err) {
        return res.serverError(err);
      }
      return res.json(plan);
    });
  },

  selectSomePropsPlan: (req, res) => {
    let props = req.param('props').split(',');
    Plan.find({
      select: props
    }).sort('updatedAt DESC').exec((err, plans) => {
      if (err) {
        return res.serverError(err);
      }
      if (plans === undefined) {
        plans = [];
      }
      return res.json(plans);
    });
  },

};

