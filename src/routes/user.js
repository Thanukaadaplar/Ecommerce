const { verifyToken,verifyTokenAndAdmin,} = require("../routes/verifyToken");

const User = require("../models/User")
const router = require("express").Router();



/**
* @swagger
* components:
*    schema:
*        shop:
*            type:object
*            properties:
*               username:
*                  type: string
*               email:
*                  type: string
*               isAdmin:
*                  type: string
*/


//-----------------------UPDATE---------------------------------
/**
 * @swagger
 * /{id}:
 *  put:
 *      summary: This api Used to update the data to mongodb
 *      description:This api Used to update the data to mongodb
 *      parameters:
 *          - in:path
 *            name:id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type:integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                   $ref:'#components/schema/shop'
 *      responses:
 *          200:
 *              description: Updated succesuufully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:array
 *                          items:                        
 */

router.put('/:id',verifyToken, async(req, res) => { 
    try{
        console.log("updated");
        const updateData = req.body;
        const newUser = await User.findByIdAndUpdate(req.params.id, updateData)
        const update = await newUser.save()
        res.json(updateData);
    }catch(err){
        res.send(err)
    }
});

//----------------------------DELETE-----------------------
router.delete("/:id", verifyToken, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //---------------------getuser--------------------------
/**
 * @swagger
 * /find/{id}:
 *  get:
 *      summary: To get info from MOngodb
 *      description:This api is used to fetch data from MOngodb
 *      parameters:
 *          - in:path
 *            name:id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type:integer
 *      responses:
 *          200:
 *              description: To test Get method
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:array
 *                          items:
 *                              $ref:'#components/schema/shop'
 */

  router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
     const user= await User.findById(req.params.id);
     const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //-----------------------GET ALL USER------------------------
    
/**
 * @swagger
 * /:
 *   get:
 *     summary: This api is used to check get method is working or not
 *     description: This api is used to check get method is working or not
 *     responses:
 *        200:
 *           description: To test Get method
 *           content:
 *               application/json:
 *                  schema:
 *                     type:array
 *                        items:
 *                           $ref:'#components/schema/shop'
 */
router.get("/", verifyTokenAndAdmin, async (req, res) => {
   try {
     const users= await User.find();
        
      res.status(200).json(users);
    } catch (err) {
       res.status(500).json(err);
    }
  });

 module.exports= router;
 