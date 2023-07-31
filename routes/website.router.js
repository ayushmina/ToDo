const router = require("express").Router();
// Controllers

const website=require("../controller/index");

// website pannel
router.route("/createTask").post(website.createTask);

router.route("/gettasks").get(website.gettasks);

router.route("/gettask").post(website.getTaskkId);

router.route("/updateTask").post(website.updateTask);

router.route("/deleteTask").post(website.deleteTask);



module.exports = router;