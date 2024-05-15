import { Student, StudentDocument } from '../model/student.model'
import { validationResult } from "express-validator";
import * as TokenManager from "../utils/tokenManager";
import { response, } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { decrypt, encrypt } from "../helper/Encryption";

var activity = "Student";



export let getAllStudent = async (req, res, next) => {
    try {
        const data = await Student.find({ isDeleted: false });
        response(req, res, activity, 'Level-1', 'GetAll-Student', true, 200, data, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'GetAll-Student', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


export let getSingleStudent = async (req, res, next) => {
    try {
        const student = await Student.findOne({ _id: req.query._id });
        response(req, res, activity, 'Level-1', 'Get-Single-Student', true, 200, student, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Single-Student', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

export let saveStudent = async (req, res, next) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const student = await Student.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });

            if (!student) {
                req.body.password = await encrypt(req.body.password)
                req.body.confirmPassword = await encrypt(req.body.confirmPassword)
                const studentDetails: StudentDocument = req.body;

                const createData = new Student(studentDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                    loginType: 'student'
                });
                const result = {}
                result['_id'] = insertData._id
                result['email'] = insertData.email;
                let finalResult = {};
                finalResult["token"] = token;
                finalResult["loginType"] = 'student';
                finalResult["studentDetails"] = result;
                
                response(req, res, activity, 'Level-2', 'Save-Student', true, 200, finalResult, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Save-Student', true, 422, {}, 'Email already registered');
            }

        } catch (err: any) {
          console.log(err)
            response(req, res, activity, 'Level-3', 'Save-Student', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Save-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

export let updateStudent = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try{
            const studentDetails : StudentDocument = req.body;
            const updateData = await Student.findOneAndUpdate({ _id: req.body._id }, {
                $set: {  
                    name: studentDetails.name,
                    passportNo: studentDetails.passportNo,
                    expiryDate:studentDetails.expiryDate,
                    dob: studentDetails.dob,
                    citizenship:studentDetails.citizenship,
                    gender:studentDetails.gender,
                    whatsAppNumber: studentDetails.whatsAppNumber,
                    degreeName:studentDetails.degreeName,
                    academicYear: studentDetails.academicYear,
                    institution:studentDetails.institution,
                    percentage: studentDetails.percentage,
                    doHaveAnyEnglishLanguageTest:studentDetails.doHaveAnyEnglishLanguageTest,
                    englishTestType:studentDetails.englishTestType,
                    testScore: studentDetails.testScore,
                    dateOfTest: studentDetails.dateOfTest,
                    country:studentDetails.country,
                    desiredUniversity:studentDetails.desiredUniversity, 
                    desiredCourse: studentDetails.desiredCourse, 
                    workExperience: studentDetails.workExperience,
                    anyVisaRejections: studentDetails.anyVisaRejections, 
                    visaReason:studentDetails.visaReason,
                    doYouHaveTravelHistory: studentDetails.doYouHaveTravelHistory, 
                    travelReason:studentDetails.travelReason,
                    finance: studentDetails.finance,
                    twitter:studentDetails .twitter,
                    facebook: studentDetails.facebook,
                    instagram: studentDetails.instagram,
                    linkedIn: studentDetails.linkedIn
                }
                
            });
            response(req, res, activity, 'Level-2', 'Update-Student', true, 200, updateData, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Student', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Update-Student', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}


export let deleteStudent = async (req, res, next) => {
  
    try {
        let id = req.query._id;
        const student = await Student.findByIdAndDelete({ _id: id })
      
        response(req, res, activity, 'Level-2', 'Delete-Student', true, 200, student, 'Successfully Remove User');
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Student', false, 500, {}, errorMessage.internalServer, err.message);
    }
};



//////////////////////


// import ExcelJS = require('exceljs');
// import path = require('path')

// // Controller function to import data from Excel and store it in the database
// export let importDataFromExcel = async (req, res) => {
//     try {
//         // const { filename } = req.file
//         console.log("mmm", req.file)

        
//             // Check if file exists in the request
//             if (!req.file || !req.file.path) {
//                 return res.status(400).json({ success: false, message: 'No file uploaded' });
//             }
//             const filePath = path.resolve(req.file.path);
//            console.log("lll", filePath)
//             // Load the Excel file
//             const workbook = new ExcelJS.Workbook();
   
//             await workbook.xlsx.readFile(filePath);

//         // Get the first worksheet
//         const worksheet = workbook.worksheets[0];

//         // Iterate over each row in the worksheet
//         worksheet.eachRow(async (row, rowNumber) => {
//             // Assuming the first column contains the name and the second column contains the email
//             const name = row.getCell(1).value;
//             const email = row.getCell(2).value;

//             // Create a new student object
//             const student = new Student({
//                 name,
//                 email
//             });

//             // Save the student to the database
//             await student.save();
//         });

//         // Respond with success message
//         res.status(200).json({ success: true, message: 'Data imported successfully' });
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };
