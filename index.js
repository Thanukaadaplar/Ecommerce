const express = require("express");
const app = express();
const mongoose = require("mongoose")  
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./src/routes/user")
const authRoute = require("./src/routes/auth")
const productRoute = require("./src/routes/product")
const cartRoute = require("./src/routes/cart")
const orderRoute = require("./src/routes/order")



const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")
const options = {
    definition:{
        openapi:'3.0.0',
        info :{
            title:'Boilerplate structure for E-commerce',
            version:'1.0.0'
        },
        servers:[
            {
                url:'http://localhost:5000/'
            }
        ]
    },
   apis:["./index.js","/user.js"]
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))



/**
 * @swagger
 * /:
 *  get:
 *     summary: This api is used to check get method is working or not
 *     description: This api is used to check get method is working or not
 *     responses:
 *         200:
 *            description: To test Get method
 */
app.get('/',(req,resp) => {
    resp.send("welcome to mongodb")
})


mongoose.
connect(process.env.MONGO_URL)
.then(() => console.log("DB connection successfull!"))
.catch((err)=> {
    console.log(err);
});
 app.use(express.json());
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);



app.listen(process.env.PORT || 5000 , ()=>{
    console.log("server is running on "+ process.env.PORT)
});