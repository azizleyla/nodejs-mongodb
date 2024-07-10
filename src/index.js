require("dotenv").config()

const express = require('express');
const connectDB = require('./db/connect');
const cors = require("cors")
const doctorRouter = require("./routes/doctor.routes");
const { userRouter } = require("./routes/user.routes");
const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/v1/doctors", doctorRouter)
app.use("/api/v1/auth", userRouter)
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8000;

const start = async () => {
    try {
        await connectDB('mongodb+srv://leyla_aziz:Rewnyc1402!@cluster0.qmczpbb.mongodb.net/appointment-system?retryWrites=true&w=majority&appName=Cluster0');

        app.listen(port, () => {
            console.log("server started on port 8000");
        });
    } catch (err) {
        console.log(err);
    }
}
start()
