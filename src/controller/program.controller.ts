import { Program, ProgramDocument } from '../model/program.model'
import { SuperAdmin } from "../model/superAdmin.model";
import { validationResult } from 'express-validator'
import { response } from '../helper/commonResponseHandler'
import { clientError, errorMessage } from '../helper/ErrorMessage'
import csv = require('csvtojson')


var activity = "Program"


export const getAllProgram = async (req, res, next) => {
    try {
        const program = await Program.find({ isDeleted: false })
        response(req, res, activity, 'Level-1', 'GetAll-Program', true, 200, program, clientError.success.fetchedSuccessfully)

    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'GetAll-Program', false, 500, {}, errorMessage.internalServer, err.message)

    }
}


export const getSingleProgram = async (req, res, next) => {
    try {
        const program = await Program.findOne({ _id: req.query._id })
        response(req, res, activity, 'Level-1', 'GetSingle-Program', true, 200, program, clientError.success.fetchedSuccessfully)

    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'GetSingle-Program', false, 500, {}, errorMessage.internalServer, err.message)

    }
}



export let createProgram = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const programDetails: ProgramDocument = req.body;
            const createData = new Program(programDetails);
            let insertData = await createData.save();

            response(req, res, activity, 'Level-2', 'Create-Program', true, 200, insertData, clientError.success.savedSuccessfully);

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Create-Program', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Create-Program', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}





export let updateProgram = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const programDetails: ProgramDocument = req.body;
            let updateData = await Program.findByIdAndUpdate({ _id: programDetails._id }, {
                $set: {
                    universityName: programDetails.universityName,
                    country: programDetails.country,
                    courseType: programDetails.courseType,
                    programTitle: programDetails.programTitle,
                    applicationFee: programDetails.applicationFee,
                    currency: programDetails.currency,
                    flag: programDetails.flag,
                    discountedValue: programDetails.discountedValue,
                    campus: programDetails.campus,
                    courseFees: programDetails.courseFees,
                    inTake: programDetails.inTake,
                    duration: programDetails.duration,
                    englishlanguageTest: programDetails.englishlanguageTest,
                    universityInterview: programDetails.universityInterview,
                    greGmatRequirement: programDetails.greGmatRequirement,
                    academicRequirement: programDetails.academicRequirement,
                    commission: programDetails.commission
                },

            })
            response(req, res, activity, 'Level-2', 'Update-Program', true, 200, updateData, clientError.success.updateSuccess);

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Program', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Update-Program', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}



export let deleteProgram = async (req, res, next) => {

    try {
        const program = await Program.findOneAndDelete({ _id: req.query._id })

        response(req, res, activity, 'Level-2', 'Delete-Program', true, 200, program, 'Successfully Remove Program');
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Program', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


/**
 * @author Balan K K
 * @date   17-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get All Program For Web
 */


export let getAllProgramForWeb = async (req, res, next) => {
    try {
        const programDetails = await Program.find({ isDeleted: false }).sort({ createdAt: -1 });
        response(req, res, activity, 'Level-2', 'Get-All-Program', true, 200, programDetails, clientError.success.fetchedSuccessfully);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-All-Program', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


/**
 * @author Balan K K
 * @date 15-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter Program Details
 */

export let getFilteredProgram = async (req, res, next) => {

    try {

        var findQuery;
        var andList: any = []
        var limit = req.body.limit ? req.body.limit : 0;
        var page = req.body.page ? req.body.page : 0;
        andList.push({ isDeleted: false })
        andList.push({ status: 1 })
      
        if (req.body.universityName) {
            andList.push({ universityName: req.body.universityName })
        }
        if (req.body.country) {
            andList.push({ country: req.body.country })
        }
        if (req.body.campus) {
            andList.push({ campus: req.body.campus })
        }
        if (req.body.courseType) {
            andList.push({ courseType: req.body.courseType })
        }
        if (req.body.programTitle) {
            andList.push({ programTitle: req.body.programTitle })
        }
        if (req.body.universityInterview) {
            andList.push({ universityInterview: req.body.universityInterview })
        }
        if (req.body.englishlanguageTest) {
            andList.push({ englishlanguageTest: req.body.englishlanguageTest })
        }
        if (req.body.courseFee) {
            andList.push({ courseFee: req.body.courseFee })
        }
    
        findQuery = (andList.length > 0) ? { $and: andList } : {}

        const programList = await Program.find(findQuery).sort({ createdAt: -1 }).limit(limit).skip(page)

        const programCount = await Program.find(findQuery).count()
        response(req, res, activity, 'Level-1', 'Get-FilterProgram', true, 200, { programList, programCount }, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterProgram', false, 500, {}, errorMessage.internalServer, err.message);
    }
};



/**
 * @author Balan K K
 * @date 15-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter Program Details for Applied student
 */

export let getFilteredProgramForAppliedStudent = async (req, res, next) => {
    try {

        var findQuery;
        var andList: any = []
        var limit = req.body.limit ? req.body.limit : 0;
        var page = req.body.page ? req.body.page : 0;
        andList.push({ isDeleted: false })
        andList.push({ status: 1 })
  
        if (req.body.appliedStudentId) {
            andList.push({ appliedStudentId: req.body.appliedStudentId })
        }
        if (req.body.universityName) {
            andList.push({ universityName: req.body.universityName })
        }
        if (req.body.programTitle) {
            andList.push({ programTitle: req.body.programTitle })
        }
        if (req.body.country) {
            andList.push({ country: req.body.country })
        }
        if (req.body.campus) {
            andList.push({ campus: req.body.campus })
        }
        if (req.body.courseType) {
            andList.push({ courseType: req.body.courseType })
        }

        findQuery = (andList.length > 0) ? { $and: andList } : {}

        const programList = await Program.find(findQuery).sort({ createdAt: -1 }).limit(limit).skip(page).populate('studentId', { name: 1, email: 1, mobileNumber: 1 }).populate('universityName');

        const programCount = await Program.find(findQuery).count()
        response(req, res, activity, 'Level-1', 'Get-FilterProgram For Applied-Student', true, 200, { programList, programCount }, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterProgram For Applied-Student', false, 500, {}, errorMessage.internalServer, err.message);
    }
};



/**
 * @author Balan K K
 * @date 20-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used CSV file to JSON and Store to Database
 */


export const csvToJson = async (req, res) => {

    try {
        let programList = []

        csv().fromFile(req.file.path).then(async (res) => {
            for (let i = 0; i < res.length; i++) {
                programList.push({
                    universityName: res[i].UniversityName,
                    campus: res[i].Campus,
                    applicationFee: res[i].ApplicationFee,
                    country: res[i].Country
                })
            }
            await Program.insertMany(programList)

        })
        response(req, res, activity, 'Level-1', 'CSV-File-Insert-Database', true, 200, {}, 'Successfully CSV File Store Into Database');

    } catch (err) {
        response(req, res, activity, 'Level-3', 'CSV-File-Insert-Database', false, 500, {}, errorMessage.internalServer, err.message);
    }

}