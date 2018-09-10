
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pg = require('pg')


var conString = "postgres://wxbfytgm:KdRKPy-mYapgjMU6Neo_nugS3PUG_i3Q@stampy.db.elephantsql.com:5432/wxbfytgm";



var app = express();
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




var path = require('path');
const port = process.env.PORT || 3000;






app.get('/', () => {});

// GET method route
app.get('/blog/get', function (req, res) {
    var client = new pg.Client(conString);
    client.connect(function(err){
        if(err) {
            return console.error('could not connect to postgres', err);
          }
       client.query("select * from posts", function(err, result) {
            if(err) {
              return console.error('error running query', err);
            }
            
            res.send(result.rows);
            client.end();
           
       

         });
        
    });
    
  });
  


  // POST method route
  app.post('/blog/post', function (req, res) {
   
    var client = new pg.Client(conString);
    
    
    client.connect(function(err){
        if(err) {
            return console.error('could not connect to postgres', err);
          }
          
         var query = "insert into posts values('"+req.body.titolo.replace(/['"]/g,'')+"','"+ req.body.descr.replace(/['"]/g,'')+"','"+req.body.data+"','"+req.body.img+"')";
         client.query(query , function(err, result,) {
            
            if(err) {
             
              res.send("errore"); 
              client.end();
            }else{
              res.send(result);
              client.end();

            }
         });
         
    });
    
  });


  app.post('/login', function(req, res){
    var client = new pg.Client(conString);

    client.connect(function(err){
      if(err){

        return console.error("database connection failed!", err);
      }

      var query = "select * from cred where username='"+req.body.user+"'";
      client.query(query, function(err, result){

        if(err){
          console.log("query fallita!");
          res.send("error");
          client.end();

        }else{
          console.log("query riuscita!");
          res.send(result.rows);
          client.end();

        }



      });


    });

  });

app.listen(port, function () {
  console.log('Application listening on port 3000!');
});
