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
        const doctorUpdate = { ...req.body }; // Copy req.body to avoid direct mutation
        if (req.file) {
            // Assuming you are storing the file path in img_path
            doctorUpdate.img_path = req.file.path; // Adjust as per your file storage setup
        }

        const doctor = await Doctor.findByIdAndUpdate(doctorId, doctorUpdate, { new: true });
        const updateResult = await Doctor.updateMany({}, { $set: { img_path: req.file.path } });
        console.log(req.file)
        if (!doctor) {
            return next(new AppError(404, "Doctor with that id not found"));
        }
        appSuccess(res, doctor, 'Doctor updated succesfully')


    } catch (err) {
        next(err)
    }
}

const getDoctorById = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctor.findById(doctorId)
        if (!doctor) {
            return next(new AppError(404, "Doctor with that id not found"));

        }
        appSuccess(res, doctor)
    } catch (err) {
        next(err)
    }
}
module.exports = {
    getDoctors,
    getDoctorById,
    addDoctor,
    deleteDoctor,
    updateDoctor
};
