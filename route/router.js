const express = require("express");
const router = express();
const operationController = require("../controller/livresController.js");

router.get("/", (req, res)=>{res.render("liste")});
router.get("/liste", operationController.liste);
router.get("/historiques", operationController.historiques);
router.post("/getinfo/:id", operationController.getinfo);
router.post("/getfiche/:id", operationController.getfiche);
module.exports = router;
