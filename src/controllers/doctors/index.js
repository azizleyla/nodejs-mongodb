const { Error } = require("mongoose");
const Doctor = require("../../models/Doctor");
const AppError = require("../../utils/appError");
const appSuccess = require("../../utils/appSuccess");


const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find();
        appSuccess(res, doctors)

    } catch (err) {
        next(err)
    }
};

const addDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.create(req.body);
        appSuccess(res, doctor, 'Doctor created succesfully')

    } catch (err) {
        next(err)
    }

};

const deleteDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        // Find the doctor by ID and delete it
        const doctor = await Doctor.findByIdAndDelete(doctorId)
        if (!doctor) {
            return next(new AppError(404, "Doctor with that id not found"));
        }
        appSuccess(res, doctor, 'Doctor deleted succesfully')


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
        appSuccess(res, doctor, 'Doctor updated succesfully')


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
