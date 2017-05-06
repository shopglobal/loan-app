/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');

module.exports = {

  login: (req, res) => {

    //测试用
    /*let user ={
      "createdAt": 1493433225022,
      "updatedAt": 1493433225022,
      "id": 2,
      "username": "及速达22",
      "phone": "13102171390",
      "orders": []
    };
    req.session.user = user;
    res.json(user);*/

    //console.log(req.session);
    let signUser = req.session.user;
    let signCode = req.session.code;

    let phone = req.param('phone');
    let verificationCode = req.param('verificationCode');
    console.log(phone, verificationCode);
    if (signUser !== undefined && signCode !== undefined && phone !== undefined && verificationCode !== undefined
      && signUser.phone === phone && signCode === verificationCode) {
      req.session.code = undefined;
      return res.json(signUser);
    } else {
      return res.json(undefined);
    }

  },

  adminLogin:(req ,res)=>{
    User.findOne(req.allParams()).exec((err , user)=>{
      if(err){
        return res.serverError(err);
      }
      if(user === undefined){
        return res.json(undefined);
      }else {
        req.session.user = user;
        return res.json(user);
      }
    });
  },

  hasLogin: (req, res) => {
    return res.json(req.session.user);
  },

  generateVerification: (req, res) => {
    let data = req.allParams();
    signin(data);

    function signin(data) {
      User.findOne(data).exec((err, user) => handleSignin(err, user));

      var handleSignin = (err, user) => {
        if (user === undefined) {
          createUser();
        } else {
          req.session.user = user;
        }
      }


      var createUser = () => {
        Setting.find({}).exec((err, settings) => {
          data.username = settings[0].msgSignature + new Date().getMilliseconds();
          User.create(data).meta({fetch: true}).exec((err, newUser) => {
            if (err) {
              return res.serverError(err);
            }
            req.session.user = newUser;
          });
        });
      }
    };

    Setting.findOne({id: 1}).exec((err, setting) => {
      if (setting !== undefined) {
        var code = (Math.random() * Math.pow(10, 4) + "").substr(0, 4);

        let msgJson = {
          account: setting.msgAccount,
          password: setting.msgPassword,
          msg: "【" + setting.msgSignature + "】" + setting.msgTemplate + "：" + code,
          phone: data.phone + "",
        };

        //使用request
        request({
          url: setting.msgUrl,
          method: "POST",
          json: true,
          headers: {
            "accept": "*",
            "Content-Type": "application/json",
          },
          body: msgJson
        }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            //console.log(response);
            req.session.code = code;
            return res.ok();
          }
          //console.log(body);
        });

      }
    });

  },


  logout: (req, res) => {
    console.log(req.allParams());
    let user = req.session.user;
    console.log(user);
    if (req.param('id') === user.id && req.param('phone') === user.phone) {
      req.session.user = undefined;
      return res.ok();
    }else {
      return res.send('err');
    }
  },

};

