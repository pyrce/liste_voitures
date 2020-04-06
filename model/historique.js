var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var genreSchema = Schema(
  {
    _id: {
      type: ObjectId,
      required: true
    },
    model: String,
    marque: String,
    date:Date
  },
  { collection: "historique" }
);
module.exports = mongoose.model("historique", genreSchema);
