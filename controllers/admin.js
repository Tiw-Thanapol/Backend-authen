const Order = require('../models/Order')

exports.changeOrderStatus = async (req,res)=>{
    try{
        const { orderId, orderstatus } = req.body;
        //Update Order Status (ตรงในี้ใช้DataจากMongoDBหรือSQLได้)
        let orderUpdate = await Order.findByIdAndUpdate(
            orderId,
            { orderstatus},
            {new: true}
        )
        res.send(orderUpdate)
    } catch(err) {
        console.log('Change order status error:', err)
        res.status(500).send("Create Product ERROR!!!")
    }
}
exports.getOrderAdmin = async (req, res) => {
    try {  
      let order = await Order
        .find()
        .populate("products.product")
        .populate("orderdBy","username")
        
        .exec();
  
      res.json(order);
    } catch (err) {
      res.status(500).send("Get Order Error");
    }
  };