var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var genreSchema = Schema(
  {
    _id: {
      type: ObjectId,
      required: true
    },
    nom: String,
    color: String
  },
  { collection: "genre" }
);
module.exports = mongoose.model("genre", genreSchema);
