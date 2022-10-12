const { verifyTokenAndAdmin,} = require("../routes/verifyToken");
const Product = require("../models/Product");
const router = require("express").Router();

//CREATE

router.post("/",verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.send('Error'+ err);
  }
});

//UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Body = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, Body);
    res.json(updatedProduct);
  } catch (err) {
    res.send('Error'+ err);
  }
});

 //DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product has been deleted...");
  } catch (err) {
    res.send('Error'+ err);
  }
});

 //GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS

router.get('/list', async (req, res) => {
  try {
      const products = await Product.find()
      res.json(products)
  } catch (err) {
      res.send('Error' + err)
  }
})


module.exports = router;