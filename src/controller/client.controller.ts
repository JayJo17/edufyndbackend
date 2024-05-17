import { Client, ClientDocument} from '../model/client.model'
import { validationResult } from "express-validator";
import { response, } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";



var activity = "Client";



export let getAllClient = async (req, res, next) => {
    try {
        const data = await Client.find({ isDeleted: false });
        response(req, res, activity, 'Level-1', 'GetAll-Client', true, 200, data, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'GetAll-Client', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


export let getSingleClient = async (req, res, next) => {
    try {
        const client = await Client.findOne({ _id: req.query._id });
        response(req, res, activity, 'Level-1', 'Get-Single-Client', true, 200, client, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Single-Client', false, 500, {}, errorMessage.internalServer, err.message);
    }
}



export let saveClient = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const clientDetails: ClientDocument = req.body;
            const createData = new Client(clientDetails);
            let insertData = await createData.save();

            response(req, res, activity, 'Level-2', 'Save-Client', true, 200, insertData, clientError.success.savedSuccessfully);

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-Client', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Client', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};



export let updateClient = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const clientDetails: ClientDocument = req.body;
            let clientData = await Client.findByIdAndUpdate({ _id: clientDetails._id }, {
                $set: {
                  
                    typeOfClient: clientDetails.typeOfClient,
                    businessName: clientDetails.businessName,
                    businessMailID: clientDetails.businessMailID,
                    businessContactNo: clientDetails.businessContactNo,
                    website:clientDetails.website,
                    staff: clientDetails.staff,
                    name:clientDetails.name,
                    contactNo: clientDetails.contactNo,
                    emailID: clientDetails.emailID,
                    address: clientDetails.address,
                    status: clientDetails.status,
                }
            });

            response(req, res, activity, 'Level-2', 'Update-Client', true, 200, clientData, clientError.success.updateSuccess);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Client', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Update-Client', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}



export let deleteClient = async (req, res, next) => {

    try {
        const client = await Client.findOneAndDelete({ _id: req.query._id })

        response(req, res, activity, 'Level-2', 'Delete-Client', true, 200, client, 'Successfully Remove Client');
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Client', false, 500, {}, errorMessage.internalServer, err.message);
    }
};