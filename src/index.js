const express = require('express');
const mongoose = require('mongoose');
const { router } = require('./routes/doctor.routes');
const app = express();


app.use(express.json());


const uri = "mongodb+srv://leyla_aziz:Rewnyc1402!@cluster0.qmczpbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("connected to MongoDB");
    }
    catch (error) {
        console.log(error);
    }
}

connect();

app.use("/api/doctors", router)



app.listen(8000, () => {
    console.log("server started on port 8000");
});