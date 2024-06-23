require("dotenv").config()

const express = require('express');
const { router } = require('./routes/doctor.routes');
const connectDB = require('./db/connect');
const app = express();

app.use(express.json());

app.use("/api/v1/doctors", router)

const port = process.env.PORT || 8000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log("server started on port 8000");
        });
    } catch (err) {
        console.log(err);
    }
}
start()
