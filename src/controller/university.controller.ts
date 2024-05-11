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
            // const superadmin = await SuperAdmin.findOne({ $and: [{ isDeleted: false }, { universityName: req.body.universityName }] });
            const superadmin = await SuperAdmin.findOne({ _id: req.query._id });
            if (!superadmin) {
                const universityDetails: UniversityDocument = req.body;
          
                const createData = new University(universityDetails);
                let insertData = await createData.save();
             
                response(req, res, activity, 'Level-2', 'Save-University', true, 200, insertData, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Save-University', true, 422, {}, 'University already registered');
            }

        } catch (err: any) {
       
            response(req, res, activity, 'Level-3', 'Save-University', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Save-University', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}