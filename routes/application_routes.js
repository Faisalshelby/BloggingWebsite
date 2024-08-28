const express = require("express");
const {getAllAvatars} = require("../modules/avatar.js");
const router = express.Router();
const userDao = require("../modules/users-dao")
//Renders the homePage


router.get("/", async  function(req, res) {
        const avatars = getAllAvatars();
    res.render("home",{avatars : avatars});
});



module.exports = router;