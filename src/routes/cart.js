const { verifyToken,verifyTokenAndAdmin,} = require("../routes/verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

//CREATE

router.post("/", verifyToken,async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart= await newCart.save();
    res.json(savedCart);
  } catch (err) {
    res.send('Error'+ err);
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const Body = req.body;
    const updatedCart = await Product.findByIdAndUpdate(req.params.id, Body);
    res.json(updatedCart);
  } catch (err) {
    res.send('Error'+ err);
  }
});

 //DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.send("Cart has been deleted...");
  } catch (err) {
    res.send('Error'+ err);
  }
});

 //GET  USER CART

router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId});
    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL 

router.get('/',verifyTokenAndAdmin, async (req, res) => {
  try {
      const carts = await Cart.find()
      res.json(carts)
  } catch (err) {
      res.send('Error' + err)
  }
})


module.exports = router;