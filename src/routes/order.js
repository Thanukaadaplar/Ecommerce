const Order = require("../models/Order");
const router = require("express").Router();
const { verifyToken,verifyTokenAndAdmin,} = require("../routes/verifyToken");

//CREATE

router.post("/",verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    res.send('Error'+ err);
  }
});

//UPDATE

router.put("/:id", verifyTokenAndAdmin,async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id, req.body);
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//DELETE

  router.delete("/:id",verifyTokenAndAdmin, async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET USER ORDERS

  router.get("/:userId", async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL
  
  router.get("/",verifyTokenAndAdmin, async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;