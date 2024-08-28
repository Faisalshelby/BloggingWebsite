//Function to verify if the user is present in the session
function verifyUser(req,res,next){
    if (req.session.user){
        next();
    }
    else {
        res.redirect("/login");
    }

}

module.exports =verifyUser;