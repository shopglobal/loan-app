/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  login: (req, res) => {

    let hasLogin = req.session.user;

    if (hasLogin!==undefined) {
      console.log('has login');
      return res.json(hasLogin);
    }

    User.findOne(req.allParams()).exec((err, user) => handleLogin(err, user));

    var handleLogin = (err, user) => {
      if (user===undefined) {
        createUser();
      }else {
        returnResult(user);
      }
    }


    var createUser = () => {
      Setting.find({}).exec((err, settings) => {
        let user = req.allParams();
        user.username = settings[0].msgSignature + new Date().getMilliseconds();
        User.create(user).meta({fetch: true}).exec((err, newUser) => {
          if (err) {
            return res.serverError(err);
          }
          returnResult(newUser);
        });
      });
    }

    var returnResult = (user)=>{
      req.session.user = user;
      return res.json(user);
    }
  },

  hasLogin: (req, res) => {
    return res.json(req.session.user);
  },


  logout: (req, res) => {
    req.session.user = undefined;
    return res.ok();
  },

};

