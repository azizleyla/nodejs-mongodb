const Router = require("express");
const {
    getDoctors,
    addDoctor,
    deleteDoctor,
    updateDoctor,
} = require("../controllers/doctors");
const { authentification } = require("../middleware/authentification");
const { authorization } = require("../middleware/authorization");
const { checkIsAuth } = require("../utils/helpers");
const doctorRouter = Router();

doctorRouter.get(
    "/",
    checkIsAuth(['admin']),
    getDoctors,
);
doctorRouter.post("/add", addDoctor);
doctorRouter.delete("/delete/:id", deleteDoctor);
doctorRouter.put("/update/:id", updateDoctor);

module.exports = doctorRouter;
