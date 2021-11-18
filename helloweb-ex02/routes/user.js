const express = require('express');

const router = express.Router();

// user?no=10
router.route("").get(function(req, res){
    res.render('user/info', {
        no: req.query.no || 0 // no 없으면 0
    });
});

router.route("/info/:no").get(function(req, res){
    res.render('user/info', {
        no: req.params.no || 0 // no 없으면 0
    });
});

router.route("/join").get(function(req, res){
    res.render('user/join');
});

router.route("/join").post(function(req, res){
    console.log(req.body);
    res.redirect("/");
});

router.route("/api").get(function(req, res){
    const vo = {
        no: 10,
        name: '둘리',
        email: 'dooly@gmail.com',
        gender: 'male'
    };
    // res.writeHead(200,{
    //     'Content-Type': "application/json"
    // } );
    // res.end(JSON.stringify(vo));
    res.send(vo);
});


// router.route("/01").get(function(req, res){
//     res.render('hello/01');
// });

// router.route("/02").get(function(req, res){
//     const data = {
//         no: req.query.no || '',
//         email: req.query.email || ''
//     };

//     res.render('hello/02', data);
// });

module.exports = router;