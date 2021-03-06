const controller = {};
const fs = require("fs");
const https= require("https");
const mongoose=require("mongoose");
const hist=require("../model/historique")
const moment=require("moment")
var ObjectId=mongoose.Types.ObjectId;
var base =
  typeof process.env.MONGODB_URI != "undefined"
    ? process.env.MONGODB_URI
    : "mongodb://localhost:27017/listes_voitures";

mongoose.connect(base, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
/**recupere la liste des voitures via une api et renvoie les donnes dans la vue
 * @params {object} req 
 * @params {object} res  reponse renvoyé
 * @version 1.0
 */
controller.liste = (req, res) => {
  https.get('https://www.carqueryapi.com/api/0.3/?cmd=getMakes', (datas) => {
   // if (err) console.log(err);

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
/**recupere la listes des models
 *  * @params {object} req contient la marque d'unn voitures
 * @params {object} res  liste des modèles de la marque
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
/**recupere la fiche d'un modèle
 * @params {object} req 
 * @params {object} object json avec les données du modèle
 */
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
         histo.date=new Date();
         histo.save();
           res.send(fbResponse[0])
         

        
     });
   
     
   });
};
/**recupere les cinq  denières recheches effectué
 * @params {object} req 
 * @params {object} res  reponse renvoyé
 */
controller.historiques=(req, res)=>{

hist.find({ }).sort({_id:-1}).limit(5).then((datas)=>{
res.send(datas);
})

}
module.exports = controller;
