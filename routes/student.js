var express = require('express');
var router = express.Router();
var url = require('url');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var request = require('superagent');
 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EmeraldField Academy' });
});

router.post('/search', urlencodedParser,function(req, res){
    if (!req.body) return res.sendStatus(400)
    var phone = req.body;
  request
    .get('http://localhost:8080/api/searchstudentdetails')
    .query(phone)
    .end(function(err, data) {
      console.log(data);
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      } else {
        var studentdetails = data.body;
        console.log(studentdetails)
        res.render('studentdetails', { studentdetails: studentdetails} );
      }
    })
    
})



router.get('/new', function(req, res){
    
  res.render('addstudent', { title: 'Add New student data' } );
      
    });
    




router.post('/new', urlencodedParser,function(req, res){
    if (!req.body) return res.sendStatus(400)
    var insertvalues = req.body;
    console.log(insertvalues);
  request
    .post('http://localhost:8080/api/addstudent')
    .send(insertvalues)
    .end(function(err, data) {
     
        var studentId = data.body;
        console.log(studentId)
        res.render('addstudent', { studentId: studentId} );
      
    })
    
})

router.post('/edit', urlencodedParser,function(req, res){
    if (!req.body) return res.sendStatus(400)
    var ID = req.body;
  request
    .get('http://localhost:8080/api/getstudentdetails')
    .query(ID)
    .end(function(err, data) {
      console.log(data);
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      } else {
        
        var details = data.body;
        console.log(details)
        res.render('edit', { details: details} );
      }
    })
    
})

router.put('/studentdetails', urlencodedParser,function(req, res){
    if (!req.body) return res.sendStatus(400)
    var ID = req.body;
  request
    .put('http://localhost:8080/api/updatestudent/:stuId')
    .query(ID)
    .send(data)
    .end(function(err, data) {
      console.log(data);
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      } else {
        
        var details = data.body;
        console.log(details)
        res.render('studentdetails', { details: details} );
      }
    })
    
})




router.post('/delete', urlencodedParser,function(req, res){
    if (!req.body) return res.sendStatus(400)
    var insertvalues = req.body;
    console.log(insertvalues);
  request
    .post('http://localhost:8080/api/addstudent')
    .send(insertvalues)
    .end(function(err, data) {
     
        var studentId = data.body;
        console.log(studentId)
        res.render('addstudent', { studentId: studentId} );
      
    })
    
})



















module.exports = router;