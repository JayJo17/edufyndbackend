import { University, UniversityDocument} from '../model/university.model'
import { validationResult } from "express-validator";
import * as TokenManager from "../utils/tokenManager";
import { response, } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { decrypt, encrypt } from "../helper/Encryption";

var activity = "Student";


export let saveUniversity = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const university = await University.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
          
            if (!university) {
                req.body.password = await encrypt(req.body.password)
                const universityDetails: UniversityDocument = req.body;
                // studentDetails.createdOn = new Date();
          
                const createData = new University(universityDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["universityName"],
                    loginType: 'university'
                });
                const result = {}
                result['_id'] = insertData._id
                // result['email'] = insertData.email;
                let finalResult = {};
                finalResult["loginType"] = 'university';
                finalResult["universityDetails"] = result;
                finalResult["token"] = token;
                response(req, res, activity, 'Level-2', 'Save-University', true, 200, finalResult, clientError.success.registerSuccessfully);
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