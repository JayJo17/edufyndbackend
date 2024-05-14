import { University, UniversityDocument } from '../model/university.model'
import { SuperAdmin } from "../model/superAdmin.model";
import { validationResult } from "express-validator";
import { response, } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";


var activity = "University";



export let getAllUniversity = async (req, res, next) => {
    try {
        const data = await University.find({ isDeleted: false });
        response(req, res, activity, 'Level-1', 'GetAll-University', true, 200, data, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'GetAll-University', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


export let getSingleUniversity = async (req, res, next) => {
    try {
        const student = await University.findOne({ _id: req.query._id });
        response(req, res, activity, 'Level-1', 'Get-Single-University', true, 200, student, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Single-University', false, 500, {}, errorMessage.internalServer, err.message);
    }
}


export let createUniversity = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {

            const superadmin = await SuperAdmin.findOne({ _id: req.body.superAdminId });

            if (superadmin) {
                const universityDetails: UniversityDocument = req.body;

                const createData = new University(universityDetails);
                let insertData = await createData.save();

                response(req, res, activity, 'Level-2', 'Create-University-By-Superadmin', true, 200, insertData, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Create-University', true, 422, {}, 'Not Authorized to create University');
            }

        } catch (err: any) {

            response(req, res, activity, 'Level-3', 'Create-University', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Create-University', false, 422, {}, errorMessage.notAuthorized, JSON.stringify(errors.mapped()));
    }
}





export let updateUniversityBySuperAdmin = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const superadmin = await SuperAdmin.findOne({ _id: req.query._id });

            if (superadmin) {
                const universityDetails: UniversityDocument = req.body;
                const updateData = await University.findOneAndUpdate({ _id: req.body._id }, {
                    $set: {
                        universityName: universityDetails.universityName,
                        universityLogo: universityDetails.universityLogo,
                        country: universityDetails.country,
                        campus: universityDetails.campus,
                        ranking: universityDetails.ranking,
                        averageFees: universityDetails.averageFees,
                        popularCategories: universityDetails.popularCategories,
                        admissionRequirement: universityDetails.admissionRequirement,
                        offerTAT: universityDetails.offerTAT,
                        founded: universityDetails.founded,
                        institutionType: universityDetails.institutionType,
                        applicationFees: universityDetails.applicationFees,
                        costOfLiving:universityDetails.costOfLiving,
                        grossTuition:universityDetails.grossTuition

                    },
                    $addToSet: {
                        commission: universityDetails.commission

                    }
                })
                response(req, res, activity, 'Level-2', 'Update-University', true, 200, updateData, clientError.success.updateSuccess);
            }
            else {
                response(req, res, activity, 'Level-3', 'Update-University', true, 422, {}, 'Not Authorized to update University');
            }

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-University', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Update-University', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}



export let deleteUniversity = async (req, res, next) => {

    try {
            const university = await University.findOneAndDelete({ _id: req.query._id})

            response(req, res, activity, 'Level-2', 'Delete-University', true, 200, university, 'Successfully Remove University');
        }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-University', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


export let saveUniversity = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const universityDetails: UniversityDocument = req.body;
            const { filename } = req.file

            const createData = new University({ ...universityDetails, universityLogo: filename });
            let insertData = await createData.save();
           
            response(req, res, activity, 'Level-2', 'Save-University', true, 200, insertData , clientError.success.savedSuccessfully);

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-University', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-University', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

