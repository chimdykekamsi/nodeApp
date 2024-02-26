const express = require("express");
const dotenv = require("dotenv").config();
const contactRoute = require("./routes/contactRoute");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorHandler");
const _db = require("./config/dbConnection");

_db();

const app = express();

const port = process.env.PORT||5000;

app.use(express.json());
app.use('/api/contacts',contactRoute);
app.use('/api/users',userRoute);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})