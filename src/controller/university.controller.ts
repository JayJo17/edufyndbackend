import { University, UniversityDocument} from '../model/university.model'
import { SuperAdmin } from "../model/superAdmin.model";
import { validationResult } from "express-validator";
import * as TokenManager from "../utils/tokenManager";
import { response, } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { decrypt, encrypt } from "../helper/Encryption";

var activity = "University";




export let createUniversity = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
           
            const superadmin = await SuperAdmin.findOne({ _id: req.query._id });
            console.log('superrr', superadmin)
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
        try{
            const superadmin = await SuperAdmin.findOne({ _id: req.query._id });
         
            if (superadmin) {
                const universityDetails : UniversityDocument = req.body;
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







// export let deleteStudent = async (req, res, next) => {
  
//     try {
//         let id = req.query._id;
//         const student = await Student.findByIdAndDelete({ _id: id })
//         // const notification = await Notification.deleteMany({ $or: [{ to: id }, { from: id }] })
//         response(req, res, activity, 'Level-2', 'Delete-Student', true, 200, student, 'Successfully Remove User');
//     }
//     catch (err: any) {
//         response(req, res, activity, 'Level-3', 'Delete-Student', false, 500, {}, errorMessage.internalServer, err.message);
//     }
// };