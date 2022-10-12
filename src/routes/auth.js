const router = require("express").Router();
const User = require("../models/User")
// const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


const {authSchema} = require('../helpers/validation');
const { response } = require("express");
// const{signAccessToken} = require('../helpers/jwt_helper')


//------------------REGISTER----------------------------------

/**
 * @swagger
 * /:
 *  post:
 *      sumary:This api is used to check register is working or not
 *      description:    This api is used to check register is working or not
 *      responses:
 *          200:
 *              description: To test
 */
router.post("/register", async (req, res) => {
    try{
      
        const newUser = new User({
            username: req.body.username,
            email: req.body.email.toLowerCase(),
            password:  req.body.password
      
          });
            const result = await authSchema.validateAsync(req.body)
            console.log(result)
            const val = await newUser.save();
             res.json(val);
            // const accessToken = await signAccessToken(val.id) 
            // res.send({accessToken})
          }
    
     catch (err) {
        if(err.isJoi === true) err.status = 422
        res.send(err)
    }
});

// -----------------LOGIN------------------------------
router.post('/login', async(req, res,next) => {
    try{
        var personinfo = req.body;
    const user = await User.findOne({email:personinfo.email.toLowerCase()})
    if(!user){
        res.send("user not registered")
    }
    const isMatch = await user.isValidPassword(personinfo.password)
    if(!isMatch){
        res.send("username/password not valid")
    }

    const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        ); 
        // res.send({accessToken})

    // res.send("logged in successfully")

    const { password, ...others } = user._doc;  
    res.status(200).json({...others, accessToken});

}
    catch(error){
        if(error.isJoi ===true){
            res.send ("invalid mail/password")
        } 
      next(error)
    }
});



module.exports= router;