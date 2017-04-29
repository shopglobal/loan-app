/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getOrderByUser: (req, res) => {

    Order.find({user: req.param('id')}).populate('platform').sort('dateTime DESC').exec((err, orders) => {
      if (err) {
        return res.serverError(err);
      }
      if (orders === undefined) {
        orders = [];
      }
      return res.json(orders);
    });
  }
};

