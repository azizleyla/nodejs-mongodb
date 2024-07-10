const { Error } = require("mongoose");
const Doctor = require("../../models/Doctor");
const AppError = require("../../utils/appError");
const appSuccess = require("../../utils/appSuccess");
const { parseSocialMedia } = require("../../utils/helpers");


const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find().exec();
        appSuccess(res, doctors)
        console.log('Fetched doctors from MongoDB:', doctors);

    } catch (err) {
        next(new AppError(err))
    }
};

const addDoctor = async (req, res, next) => {
    try {
        const doctorData = {
            ...req.body,
            social_media: parseSocialMedia(req.body.social_media)
        }

        if (req.file) {
            doctorData.img_path = req.file.path; // Add img_path to the request body
        }
        const doctor = await Doctor.create(doctorData);
        appSuccess(res, doctor, 'Doctor created succesfully')

    } catch (err) {
        next(new AppError(err))
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
        return next(err);
    }

}

const updateDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const doctorUpdate = {
            ...req.body,
            social_media: parseSocialMedia(req.body.social_media)
        };
        if (req.file) {
            // Assuming you are storing the file path in img_path
            doctorUpdate.img_path = req.file.path; // Adjust as per your file storage setup
        }

        const doctor = await Doctor.findByIdAndUpdate(doctorId, doctorUpdate, { new: true });
        if (!doctor) {
            return next(new AppError(404, "Doctor with that id not found"));
        }
        appSuccess(res, doctor, 'Doctor updated succesfully')


    } catch (err) {
        next(new AppError(err))
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
        next(new AppError(err))
    }
}
module.exports = {
    getDoctors,
    getDoctorById,
    addDoctor,
    deleteDoctor,
    updateDoctor
};
