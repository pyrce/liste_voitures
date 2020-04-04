const controller = {};
const fs = require("fs");
const https= require("https");
const mongoose=require("mongoose");
const hist=require("../model/historique")

var ObjectId=mongoose.Types.ObjectId;
var base =
  typeof process.env.MONGODB_URI != "undefined"
    ? process.env.MONGODB_URI
    : "mongodb://localhost:27017/listes_voitures";

mongoose.connect(base, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
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
         histo=new hist();
         histo._id=new ObjectId();
         histo.model=req.params.id;
         histo.marque=req.body.marque;
         histo.save();
           res.send(fbResponse[0])
         

        
     });
   
     
   });
};

controller.historiques=(req, res)=>{

hist.find({ }).sort({_id:-1}).limit(5).then((datas)=>{
res.send(datas);
})

}
module.exports = controller;
