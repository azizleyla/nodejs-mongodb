const Doctor = require("../../src/models/Doctor");
const AppError = require("../../src/utils/appError");

const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find();
        return res.status(200).json({
            status: "success",
            data: doctors
            
        });
    } catch (err) {
        next(err)
    }
};

const addDoctor = async (req, res, next) => {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({
        status: "success",
        data: doctor
    });
};

const deleteDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        // Find the doctor by ID and delete it
        const doctor = await Doctor.findByIdAndDelete(doctorId)
        if (!doctor) {
            return next(new AppError(404, "Doctor with that id not found"));
        }
        return res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err)
    }

}

const updateDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, req.body, { new: true });
        if (!doctor) {
            return next(new AppError(404, "Doctor with that id not found"));
        }
        return res.status(201).json({
            status: 'success',
            data: doctor
        });

    } catch (err) {
        next(err)
    }
}
module.exports = {
    getDoctors,
    addDoctor,
    deleteDoctor,
    updateDoctor
};
