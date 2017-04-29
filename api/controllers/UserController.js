/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//var request = require('request-json');
var request = require('request');

module.exports = {

  login: (req, res) => {
    let signUser = req.session.user;

    if(req.param('phone') === signUser.phone && req.param('verificationCode')==req.session.code){
      return res.json(signUser);
    }else {
      return res.json({});
    }

  },

  hasLogin: (req, res) => {
    return res.json(req.session.user);
  },

  generateVerification: (req, res) => {
    let data = req.allParams();
    signin(data);

    function signin(data){
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
        let code = parseInt(Math.random() * Math.pow(10, 4)) + "";

        let msgJson = {
          account: setting.msgAccount,
          password: setting.msgPassword,
          msg: "【" + setting.msgSignature + "】" + setting.msgTemplate + "：" + code,
          phone: data.phone+"",
        };
        console.log(msgJson);
        console.log(setting);

        //使用request
        request({
          url: setting.msgUrl,
          method: "POST",
          json: true,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(msgJson)
        }, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(response);
          }
          console.log(body);
        });

        //使用request-json
        /*var client = request.createClient('https://vsms.253.com/');

        //var data = {data:{channel : "aaa",appkey : "bbb"},sign : "4444",token : "555"};
        client.post('msg/send/json', msgJson, function(err, res, body) {
          console.log(res.statusCode,body);
        });*/

      }
    });

  },


  logout: (req, res) => {
    req.session.user = undefined;
    return res.ok();
  },

};

