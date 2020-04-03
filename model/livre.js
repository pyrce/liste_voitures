var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var livreSchema = Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  titre: String,
  auteur: String,
  description: String,
  prix: Number,
  genre_id: {
    type: ObjectId,
    ref: "genre"
  }
});
module.exports = mongoose.model("livres", livreSchema);
