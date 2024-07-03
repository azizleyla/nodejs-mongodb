const Router = require("express");
const {
    getDoctors,
    addDoctor,
    deleteDoctor,
    updateDoctor,
    getDoctorById,
} = require("../controllers/doctors");
const { checkIsAuth } = require("../utils/helpers");
const { upload } = require("../middleware/image");


const doctorRouter = Router();

doctorRouter.get(
    "/",
    checkIsAuth(['admin', 'doctor']),
    getDoctors,
);
doctorRouter.get("/doctor/:id", checkIsAuth(['admin', 'doctor']), getDoctorById);
doctorRouter.post("/add", upload.single('img_path'), addDoctor);
doctorRouter.delete("/delete/:id", deleteDoctor);
doctorRouter.put("/update/:id", upload.single('img_path'), updateDoctor);

module.exports = doctorRouter;
