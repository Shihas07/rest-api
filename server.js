const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./router/user");
const adminRouter=require("./router/admin")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser")
const { swaggerSpec, swaggerUi } = require('./swagger'); 



app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", userRouter);
app.use("/admin",adminRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


mongoose
  .connect("mongodb://localhost:27017/Restapi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`this is port${port}`);
});
