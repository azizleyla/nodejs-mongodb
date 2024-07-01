const Router = require("express");
const {
    getDoctors,
    addDoctor,
    deleteDoctor,
    updateDoctor,
    getDoctorById,
} = require("../controllers/doctors");
const { checkIsAuth } = require("../utils/helpers");
const multer = require('multer');
const upload = multer();

const doctorRouter = Router();

doctorRouter.get(
    "/",
    checkIsAuth(['admin', 'doctor']),
    getDoctors,
);
doctorRouter.get("/doctor/:id", checkIsAuth(['admin', 'doctor']), getDoctorById);
doctorRouter.post("/add", upload.none(), addDoctor);
doctorRouter.delete("/delete/:id", deleteDoctor);
doctorRouter.put("/update/:id", updateDoctor);

module.exports = doctorRouter;
