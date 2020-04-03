const controller = {};
const fs = require("fs");
const https= require("https");
/**recupere la lsite des tuilisateurs et renvoie les donnes dans la vue
 * @version 1.0
 */
controller.liste = (req, res) => {
  https.get('https://www.carqueryapi.com/api/0.3/?cmd=getMakes', (datas) => {
   // if (err) console.log(err);
console.log("getmakes")
   var body = '';

    datas.on('data', function(chunk){
        body += chunk;
    });

    datas.on('end', function(){
        var fbResponse = JSON.parse(body);
       // console.log("Got a response: ", fbResponse);
       res.send(fbResponse.Makes)
    });
  
    
  });
};
/**recupere les infos d'un utilisateur
 *  @version 1.0
 */
controller.getinfo = (req, res) => {
  https.get('https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make='+req.params.id, (datas) => {
   // if (err) console.log(err);

   var body = '';

    datas.on('data', function(chunk){
        body += chunk;
    });

    datas.on('end', function(){
        var fbResponse = JSON.parse(body);
       // console.log("Got a response: ", fbResponse);
       res.send(fbResponse)
    });
  
    
  });
};

controller.getfiche = (req, res) => {

  https.get('https://www.carqueryapi.com/api/0.3/?cmd=getModel&model='+req.params.id, (datas) => {
    // if (err) console.log(err);
 
    var body = '';
 
     datas.on('data', function(chunk){
         body += chunk;
     });
 
     datas.on('end', function(){
         var fbResponse = JSON.parse(body);
         
        res.send(fbResponse[0])
     });
   
     
   });
};

module.exports = controller;
