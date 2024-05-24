import { User, UserDocument } from '../model/user.model'
import { validationResult } from 'express-validator'
import { response } from '../helper/commonResponseHandler'
import { clientError, errorMessage } from '../helper/ErrorMessage'

var activity = "User"


export const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find({ isDeleted: false })
        response(req, res, activity, "Level-1", "GetAll-User", true, 200, user, clientError.success.fetchedSuccessfully)

    } catch (err: any) {
        response(req, res, activity, "Level-1", 'GetAll-User', false, 500, {}, errorMessage.internalServer, err.message)

    }
}


export const getSingleUser = async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.query._id })
        response(req, res, activity, 'Level-1', 'GetSingle-User', true, 200, data, clientError.success.fetchedSuccessfully)
    } catch (err: any) {
        response(req, res, activity, 'Level-1', 'GetSingle-User', false, 500, {}, errorMessage.internalServer, err.message)
    }
}


export let createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userDetails: UserDocument = req.body;
            const createData = new User(userDetails);
            let insertData = await createData.save();
            response(req, res, activity, 'Level-2', 'Create-User', true, 200, insertData, clientError.success.savedSuccessfully);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Create-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Create-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};


export const updateUser = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const userDetails: UserDocument = req.body;
            let userData = await User.findByIdAndUpdate({ _id: userDetails._id }, {
                $set: {
                    role: userDetails.role,
                    status: userDetails.status
                }
            });
            response(req, res, activity, 'Level-2', 'Update-User Details', true, 200, userData, clientError.success.updateSuccess);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-User Details', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Update-User Details', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

export let deleteUser = async (req, res, next) => {

    try {
        let id = req.query._id;
        const staff = await User.findByIdAndDelete({ _id: id })
        response(req, res, activity, 'Level-2', 'Delete-UserDetail', true, 200, staff, 'Successfully Remove User');
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-UserDetail', false, 500, {}, errorMessage.internalServer, err.message);
    }
};