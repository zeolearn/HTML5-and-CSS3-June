var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HTML5CSS3' });
});
router.get('/xhr', function(req, res, next) {
  res.render('xhr', { title: 'HTML5CSS3' });
});
router.get('/file', function(req, res, next) {
  res.render('file', { title: 'HTML5CSS3' });
});
router.get('/api/v1/file', function(req, res, next) {
  res.json({whoami: 'A Json Object', whatDoIbring: "file.html"})
  // res.render('file', { title: 'HTML5CSS3' });
});

// router.get('/api', function(req, res, next) {
//   var rules = [

//         { rulename: "Must be 5 characters" },
//         { rulename: "Must not be used elsewhere" },
//         { rulename: "Must be cool" }

//     ]
//   res.json(rules)
//   //res.status(299).json({status: 'Failed'});
// });

// router.post('/api', function(req, res, next) {
//   var rules = [

//         { rulename: "Must be 5 characters" },
//         { rulename: "Must not be used elsewhere" },
//         { rulename: "Must be cool" },
//         { rulename: "Must be unique" }

//     ]
//   res.json(rules);
// });

module.exports = router;
