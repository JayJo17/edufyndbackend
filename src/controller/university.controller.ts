import { University, UniversityDocument } from '../model/university.model'
import { SuperAdmin } from "../model/superAdmin.model";
import { validationResult } from "express-validator";
import { response, } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import csv = require('csvtojson')
import { MongoCryptKMSRequestNetworkTimeoutError } from 'mongodb';


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


export let saveUniversity = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const universityDetails: UniversityDocument = req.body;
            const createData = new University(universityDetails);
            let insertData = await createData.save();

            response(req, res, activity, 'Level-2', 'Save-University', true, 200, insertData, clientError.success.savedSuccessfully);

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-University', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-University', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};



export let updateUniversity = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const universityDetails: UniversityDocument = req.body;
            let universityData = await University.findByIdAndUpdate({ _id: universityDetails._id }, {
                $set: {
                    universityName: universityDetails.universityName,
                    businessName: universityDetails.businessName,
                    banner: universityDetails.banner,
                    universityLogo: universityDetails.universityLogo,
                    countryName: universityDetails.countryName,
                    country: universityDetails.country,
                    flag: universityDetails.flag,
                    campus: universityDetails.campus,
                    ranking: universityDetails.ranking,
                    averageFees: universityDetails.averageFees,
                    popularCategories: universityDetails.popularCategories,
                    admissionRequirement: universityDetails.admissionRequirement,
                    offerTAT: universityDetails.offerTAT,
                    founded: universityDetails.founded,
                    institutionType: universityDetails.institutionType,
                    applicationFees: universityDetails.applicationFees,
                    costOfLiving: universityDetails.costOfLiving,
                    grossTuition: universityDetails.grossTuition,
                    paymentMethod: universityDetails.paymentMethod,
                    amount: universityDetails.amount,
                    percentage: universityDetails.percentage,
                    eligibilityForCommission: universityDetails.eligibilityForCommission,
                    currency: universityDetails.currency,
                    paymentTAT: universityDetails.paymentTAT,
                    tax: universityDetails.tax,
                    commissionPaidOn: universityDetails.commissionPaidOn,

                    modifiedOn: universityDetails.modifiedOn,
                    modifiedBy:  universityDetails.modifiedBy,

                }
            });

            response(req, res, activity, 'Level-2', 'Update-University', true, 200, universityData, clientError.success.updateSuccess);
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
        const university = await University.findOneAndDelete({ _id: req.query._id })

        response(req, res, activity, 'Level-2', 'Delete-University', true, 200, university, 'Successfully Remove University');
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-University', false, 500, {}, errorMessage.internalServer, err.message);
    }
};





export let universityLogo = async (req, res, next) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {

            const { filename } = req.file
            const profile_url = `http://localhost:4409/profile/${req.file.filename}`
            const createData = new University({ universityLogo: profile_url });

            let insertData = await createData.save();

            response(req, res, activity, 'Level-2', 'University-Logo-Uploaded', true, 200, insertData, clientError.success.savedSuccessfully);

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'University-Logo-Uploaded', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'University-Logo-Uploaded', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};


/**
 * @author Balan K K
 * @date   16-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get All University For Web
 */

export let getAllUniversityForWeb = async (req, res, next) => {
    try {
        const universityDetails = await University.find({ isDeleted: false }).sort({ createdAt: -1 });
        response(req, res, activity, 'Level-2', 'Get-All-University', true, 200, universityDetails, clientError.success.fetchedSuccessfully);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-All-University', false, 500, {}, errorMessage.internalServer, err.message);
    }
};

/**
 * @author Balan K K
 * @date 16-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter University Details
 */

export let getFilteredUniversity = async (req, res, next) => {
    try {
        var findQuery;
        var andList: any = []
        var limit = req.body.limit ? req.body.limit : 0;
        var page = req.body.page ? req.body.page : 0;
        andList.push({ isDeleted: false })
        andList.push({ status: 1 })
        if (req.body.universityId) {
            andList.push({ universityId: req.body.universityId })
        }
        if (req.body.universityName) {
            andList.push({ universityName: req.body.universityName })
        }
        if (req.body.businessName) {
            andList.push({ businessName: req.body.businessName })
        }
        if (req.body.country) {
            andList.push({ country: req.body.country })
        }
        if (req.body.campus) {
            andList.push({ campus: req.body.campus })
        }
        if (req.body.ranking) {
            andList.push({ ranking: req.body.ranking })
        }
        if (req.body.popularCategories) {
            andList.push({ popularCategories: req.body.popularCategories })
        }
        findQuery = (andList.length > 0) ? { $and: andList } : {}

        const universityList = await University.find(findQuery).sort({ createdAt: -1 }).limit(limit).skip(page)

        const universityCount = await University.find(findQuery).count()
        response(req, res, activity, 'Level-1', 'Get-FilterUniversity', true, 200, { universityList, universityCount }, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterUniversity', false, 500, {}, errorMessage.internalServer, err.message);
    }
};



/**
 * @author Balan K K
 * @date 16-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter University Details for Agent
 */

export let getFilteredUniversityForAgent = async (req, res, next) => {
    try {

        var findQuery;
        var andList: any = []
        var limit = req.body.limit ? req.body.limit : 0;
        var page = req.body.page ? req.body.page : 0;
        andList.push({ isDeleted: false })
        andList.push({ status: 1 })
        if (req.body.universityId) {
            andList.push({ universityId: req.body.universityId })
        }
        if (req.body.agentId) {
            andList.push({ agentId: req.body.agentId })
        }
        if (req.body.universityName) {
            andList.push({ universityName: req.body.universityName })
        }
        if (req.body.businessName) {
            andList.push({ businessName: req.body.businessName })
        }
        if (req.body.country) {
            andList.push({ country: req.body.country })
        }
        if (req.body.campus) {
            andList.push({ campus: req.body.campus })
        }
        if (req.body.ranking) {
            andList.push({ ranking: req.body.ranking })
        }

        findQuery = (andList.length > 0) ? { $and: andList } : {}

        const universityList = await University.find(findQuery).sort({ createdAt: -1 }).limit(limit).skip(page).populate('agentId', { name: 1, email: 1, mobileNumber: 1 })    //.populate('companyId',{companyName:1});

        const universityCount = await University.find(findQuery).count()
        response(req, res, activity, 'Level-1', 'Get-FilterUniversity-Agent', true, 200, { universityList, universityCount }, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterUniversity-Agent', false, 500, {}, errorMessage.internalServer, err.message);
    }
};



/**
 * @author Balan K K
 * @date 15-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter University Details for Student
 */

export let getFilteredUniversityForStudent = async (req, res, next) => {
    try {

        var findQuery;
        var andList: any = []
        var limit = req.body.limit ? req.body.limit : 0;
        var page = req.body.page ? req.body.page : 0;
        andList.push({ isDeleted: false })
        andList.push({ status: 1 })
        if (req.body.universityId) {
            andList.push({ universityId: req.body.universityId })
        }
        if (req.body.studentId) {
            andList.push({ studentId: req.body.studentId })
        }
        if (req.body.universityName) {
            andList.push({ universityName: req.body.universityName })
        }
        if (req.body.clientName) {
            andList.push({ clientName: req.body.clientName })
        }
        if (req.body.country) {
            andList.push({ country: req.body.country })
        }
        if (req.body.campus) {
            andList.push({ campus: req.body.campus })
        }
        if (req.body.ranking) {
            andList.push({ ranking: req.body.ranking })
        }

        findQuery = (andList.length > 0) ? { $and: andList } : {}

        const universityList = await University.find(findQuery).sort({ createdAt: -1 }).limit(limit).skip(page).populate('studentId', { name: 1, email: 1, mobileNumber: 1 })    //.populate('companyId',{companyName:1});

        const universityCount = await University.find(findQuery).count()
        response(req, res, activity, 'Level-1', 'Get-FilterUniversity-Agent', true, 200, { universityList, universityCount }, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterUniversity-Agent', false, 500, {}, errorMessage.internalServer, err.message);
    }
};



/**
 * @author Balan K K
 * @date 16-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used CSV file to JSON and Store to Database
 */

export const csvToJson = async (req, res) => {
    try {
        let universityList = [];
        // Parse CSV file
        const res = await csv().fromFile(req.file.path);
        // Process CSV data
        for (let i = 0; i < res.length; i++) {
            universityList.push({
                universityName: res[i].UniversityName,
                universityLogo:res[i].UniversityLogo,
                businessName: res[i].BusinessName,
                banner: res[i].Banner,
                country: res[i].Country,
                countryName: res[i].CountryName,
                email: res[i].Email,
                campus: res[i].Campus ? res[i].Campus.split(','): [],
                ranking: res[i].Ranking,
                applicationFees: res[i].ApplicationFees,
                averageFees: res[i].AverageFees,
                popularCategories: res[i].PopularCategories ? res[i].PopularCategories.split(','): [],
                offerTAT: res[i].OfferTAT,
                founded: res[i].Founded,
                institutionType: res[i].InstitutionType,
                costOfLiving: res[i].CostOfLiving,
                admissionRequirement: res[i].AdmissionRequirement,
                grossTuition: res[i].GrossTuition,
                flag: res[i].Flag,
                paymentMethod:res[i].PaymentMethod,
                amount:res[i].Amount,
                percentage: res[i].Percentage,
                eligibilityForCommission: res[i].EligibilityForCommission,
                currency: res[i].Currency,
                paymentTAT: res[i].PaymentTAT,
                tax: res[i].Tax,
                commissionPaidOn: res[i].CommissionPaidOn,
              
                
              
            });
        }
        // Insert into the database
        await University.insertMany(universityList);
        // Send success response
        response(req, res, activity, 'Level-1', 'CSV-File-Insert-Database', true, 200, { universityList }, 'Successfully CSV File Store Into Database');
    } catch (err) {
        console.error(err);
        // Send error response
        response(req, res, activity, 'Level-3', 'CSV-File-Insert-Database', false, 500, {}, 'Internal Server Error', err.message);
    }
};



////////////////////

export const getUniversityWithProgramDetails = async (req, res) => {
    try {
        const mongoose = require('mongoose')
        const universityId = new mongoose.Types.ObjectId(req.query.universityId);

        console.log(typeof universityId)

        if (!universityId) {
            return res.status(400).json({ success: false, message: 'University ID is required' });
        }

        const aggregationPipeline = [
            {
                $match: { _id: universityId }
            },

            {
                $lookup: {
                    from: 'programs',
                    localField: '_id',
                    foreignField: 'universityId',
                    as: 'programDetails'
                }
            },

            {
                $project: {
                    _id: 1,
                    universityName: 1,
                    universityLogo: 1,
                    country: 1,
                    programDetails: {
                        programTitle: 1,
                        courseType: 1,
                        inTake: 1,
                        courseFee: 1,
                        campus: 1,
                    }
                }
            },

        ];

        const result = await University.aggregate(aggregationPipeline);

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'University not found' });
        }
        const university = result[0];

        const response = {
            success: true,
            data: {
                universityDetails: {
                    universityId: university._id.toString(),
                    universityName: university.universityName,
                    universityLogo: university.universityLogo,
                    country: university.country,
                    campus: university.campus,
                    programDetails: university.programDetails.map(program => ({
                        programTitle: program.programTitle,
                        courseType: program.courseType,
                        inTake: program.inTake,
                        courseFee: program.courseFee,
                        campus: program.campus
                    }))
                }
            }
        };

        res.status(200).json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};