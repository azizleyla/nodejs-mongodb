const Router = require("express");
const {
    getDoctors,
    addDoctor,
    deleteDoctor,
    updateDoctor,
    getDoctorById,
} = require("../controllers/doctors");
const { upload } = require("../middleware/image");
const { checkAuth } = require("../controllers/users");


const doctorRouter = Router();

doctorRouter.get(
    "/",
    checkAuth(),
    getDoctors,
);
doctorRouter.get("/doctor/:id", checkAuth(), getDoctorById);
doctorRouter.post("/add", checkAuth(), upload.single('img_path'), addDoctor);
doctorRouter.delete("/delete/:id", checkAuth(), deleteDoctor);
doctorRouter.put("/update/:id", checkAuth(), upload.single('img_path'), updateDoctor);

module.exports = doctorRouter;
