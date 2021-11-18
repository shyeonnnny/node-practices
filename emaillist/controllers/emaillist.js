const model = require('../models/emaillist');
// exports.index = function() {} => 좋은방법
module.exports = {
    index: async function(req, res){
        const results = await model.findAll(function(){});
        res.render('index', {
            list: results || [] // null인경우 [](빈배열)넘겨줌
        });
    },
    form: function(req, res){
        res.render('form');
    },
    add: async function(req, res){
        const results = await model.insert(req.body);
        res.redirect("/");
    }
}